import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormTextArea,
  useControlModel,
} from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { Button, Drawer, Form, Input, Space, Table, Tag, Typography } from 'antd';
import React, { useMemo, useRef, useState } from 'react';

const { Title, Text } = Typography;

const initValue = {
  id: '35202700-88ab-423c-aa22-4594640084da',
  strategy_name: '测试一下',
  strategy_desc: '茶话会',
  created_by: 'c5c61b26bd73472583e443b3dd9ecc6c',
  created_at: '2024-12-20 00:29:27',
  updated_at: '2024-12-20 00:29:27',
  rule_list: [
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
  ],
};

const list = new Array(20).fill(1);
const ruleList = new Array(20).fill(1).map((item, index) => ({
  key: index,
  rule_name: `规则名称${index}`,
  rule_desc: `规则描述${index}`,
  created_by: '系统创建',
  risk_level: 'MEDIUM',
}));

function PriceInput(props) {
  const [keywords, setKeywords] = useState('');
  const [open, setOpen] = useState(false);
  const { value = [], onChange } = useControlModel(props);
  const navigate = useNavigate();
  const columns = [
    {
      title: '序号',
      key: 'index',
      render: (_value, _record, index) => <span>{index + 1}</span>,
    },
    {
      title: '规则名称',
      dataIndex: 'rule_name',
    },
    {
      title: '规则来源',
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
      render: () => <a>删除</a>,
    },
  ];
  const ruleColumns = [
    {
      title: '规则名称',
      dataIndex: 'rule_name',
    },
    {
      title: '规则描述',
      dataIndex: 'rule_desc',
    },
    {
      title: '规则来源',
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
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  function show() {
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const filteredRuleList = useMemo(() => {
    return ruleList.filter((item) => item.rule_name.includes(keywords));
  }, [keywords]);

  function confirm() {
    onChange(selectedRowKeys.map((item) => ruleList.find((rule) => rule.key === item)));
    close();
  }
  return (
    <div>
      {!!value.length && <Table columns={columns} dataSource={value} pagination={false} />}
      <Space className="mt-2">
        <Button icon={<PlusOutlined />} onClick={show}>
          添加规则
        </Button>
        <Button icon={<SettingOutlined />} onClick={() => navigate(-1)}>
          管理规则库
        </Button>
      </Space>
      <Drawer
        height="80%"
        title="从规则库选择"
        placement="bottom"
        onClose={close}
        closable={false}
        open={open}
      >
        <div className="flex flex-1 h-full overflow-hidden">
          <div className="flex flex-col w-64 border-r p-4">
            <div className="text-lg font-semibold mb-4">规则库</div>
            <div className="flex flex-col h-full overflow-auto">
              {list.map((item, index) => {
                return (
                  <Button key={index} type="text" className="justify-start">
                    Text Button{index}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex-1 p-4 h-full overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <Input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-[300px]"
                placeholder="请输入规则名称进行搜索"
              />
              <Button onClick={confirm}>确认({selectedRowKeys.length})</Button>
            </div>
            <Table
              rowSelection={rowSelection}
              columns={ruleColumns}
              dataSource={filteredRuleList}
              pagination={false}
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

const TableList: React.FC = () => {
  const [tab, setTab] = useState(0);
  const formRef = useRef();

  const navigate = useNavigate();
  return (
    <PageContainer>
      <Text type="secondary">审核策略由一组审核规则构成.</Text>
      <div className="mt-4">
        <ProForm
          onFinish={async (values) => {
            console.log(values);
          }}
          formRef={formRef}
          submitter={{
            searchConfig: {
              resetText: '取消',
              submitText: '修改',
            },
            resetButtonProps: {
              style: {
                marginLeft: 'auto',
              },
              onClick() {
                navigate(-1);
              },
            },
          }}
        >
          <ProFormText name="strategy_name" label="审核策略名称" />
          <ProFormTextArea colProps={{ span: 24 }} name="strategy_desc" label="审核策略描述" />

          <Form.Item name="rule_list" label="审查规则">
            <PriceInput />
          </Form.Item>
        </ProForm>
      </div>
    </PageContainer>
  );
};

export default TableList;
