import {
  addRule,
  removeRule,
  ruleList,
  ruleTypeList,
  updateRule,
} from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { Button, Input, Table, Tag, Typography, message } from 'antd';
import React, { useMemo, useState } from 'react';
import AddForm from './components/AddFrom';
import UpdateForm from './components/UpdateForm';

const { Title, Text } = Typography;

const list = [
  {
    id: '3d22c772-30e4-45b8-bc1c-88122ed952c8',
    scenario_id: '05a0752e-a8e6-4c51-b1b8-4d4e489525a1',
    rule_name: '隐瞒财产',
    rule_type_id: 2,
    rule_desc: '审查是否存在一方隐瞒财产的情况，是否有相应的惩罚措施。',
    risk_level: 'MEDIUM',
    is_deleted: false,
    created_by: 'system',
    created_at: '2024-08-27 23:43:50',
    rule_type: '审查该合同类型特有的风险 ',
  },
  {
    id: '15ce6e2f-5592-4c70-9090-2ee72ec7de33',
    scenario_id: '05a0752e-a8e6-4c51-b1b8-4d4e489525a1',
    rule_name: '违约责任',
    rule_type_id: 2,
    rule_desc: '审查违约责任条款是否明确，是否合理，是否有利于保障双方的合法权益。',
    risk_level: 'HIGH',
    is_deleted: false,
    created_by: 'system',
    created_at: '2024-08-27 23:43:50',
    rule_type: '审查该合同类型特有的风险 ',
  },
  {
    id: '0c5a924a-5d1e-4e27-b680-a2c75a86c5c5',
    scenario_id: '05a0752e-a8e6-4c51-b1b8-4d4e489525a1',
    rule_name: '协议履行保障',
    rule_type_id: 2,
    rule_desc: '审查是否有保障协议履行的措施，如财产担保等。',
    risk_level: 'MEDIUM',
    is_deleted: false,
    created_by: 'system',
    created_at: '2024-08-27 23:43:50',
    rule_type: '审查该合同类型特有的风险 ',
  },
];

const handleRemove = async (row: API.RuleTypeItem) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeRule(row.id);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const handleUpdate = async (fields: Record<string, any>) => {
  const hide = message.loading('更新中');
  const { id, ...rest } = fields;
  try {
    await updateRule(id!, rest);
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败，请重试');
    return false;
  }
};

const handleAdd = async (fields: Record<string, any>) => {
  const hide = message.loading('新增中');
  try {
    await addRule(fields);
    hide();
    message.success('新增成功');
    return true;
  } catch (error) {
    hide();
    message.error('新增失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  const params = useParams();
  const { data: rules, refresh } = useRequest(ruleList, {
    defaultParams: [params.id!],
  });

  const { data: ruleTypes = [] } = useRequest(ruleTypeList);

  const [updateModalOpen, handleUpdateModalOpen] = useState(false);
  const [addModalOpen, handleAddModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [keywords, setKeywords] = useState('');

  const filteredRuleList = useMemo(() => {
    return rules?.filter((item) => item.rule_name?.includes(keywords));
  }, [keywords, rules]);

  const columns = [
    {
      title: '名称',
      dataIndex: 'rule_name',
    },
    {
      title: '描述',
      dataIndex: 'rule_desc',
    },
    {
      title: '规则类别',
      dataIndex: 'rule_type',
    },
    {
      title: '创建来源',
      dataIndex: 'created_by',
    },
    {
      title: '风险等级',
      dataIndex: 'risk_level',
      render: (value) => {
        let color = 'green';
        if (value === 'MEDIUM') {
          color = 'volcano';
        }
        return <Tag color={color}>{value}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => [
        <Button
          key="update"
          size="small"
          color="primary"
          variant="link"
          onClick={() => showUpdate(record)}
        >
          修改
        </Button>,
        <Button
          key="view"
          size="small"
          color="primary"
          variant="link"
          onClick={() => handleDel(record)}
        >
          删除
        </Button>,
      ],
    },
  ];

  async function handleDel(row: API.RuleListItem) {
    const success = await handleRemove(row);
    if (success) {
      refresh();
    }
  }

  function showUpdate(row: API.RuleListItem) {
    handleUpdateModalOpen(true);
    setCurrentRow(row);
  }

  function updateCancel() {
    handleUpdateModalOpen(false);
    setCurrentRow(undefined);
  }

  async function updateConfirm(value: API.RuleListItem) {
    const success = await handleUpdate({
      id: value.id,
      scenario_id: params.id,
      rule_name: value.rule_name,
      rule_desc: value.rule_desc,
      risk_level: value.risk_level,
      rule_type_id: value.rule_type,
    });
    if (success) {
      handleUpdateModalOpen(false);
      setCurrentRow(undefined);
      refresh();
    }
  }

  function showAdd() {
    handleAddModalOpen(true);
  }

  function addCancel() {
    handleAddModalOpen(false);
  }

  async function addConfirm(value: API.RuleListItem) {
    const success = await handleAdd({
      scenario_id: params.id,
      rule_name: value.rule_name,
      rule_desc: value.rule_desc,
      risk_level: value.risk_level,
      rule_type_id: value.rule_type,
    });
    if (success) {
      handleAddModalOpen(false);
      refresh();
    }
  }

  return (
    <PageContainer>
      <Text type="secondary">系统创建的规则无法删除和修改.</Text>
      <div className="mt-4 flex items-center justify-between">
        <Input
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-[300px]"
          placeholder="输入规则名称搜索..."
        />
        <Button icon={<PlusOutlined />} iconPosition="start" onClick={showAdd}>
          新增规则
        </Button>
      </div>
      <div className="mt-4">
        <Table columns={columns} dataSource={filteredRuleList} pagination={false} />
      </div>
      <UpdateForm
        onSubmit={updateConfirm}
        onCancel={updateCancel}
        visible={updateModalOpen}
        types={ruleTypes}
        values={currentRow || {}}
      />
      <AddForm
        onSubmit={addConfirm}
        onCancel={addCancel}
        visible={addModalOpen}
        types={ruleTypes}
        values={{}}
      />
    </PageContainer>
  );
};

export default TableList;
