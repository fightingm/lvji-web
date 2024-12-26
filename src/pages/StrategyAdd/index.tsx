import { ruleList, scenarioList } from '@/services/ant-design-pro/api';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormTextArea,
  useControlModel,
} from '@ant-design/pro-components';
import { useNavigate, useRequest } from '@umijs/max';
import { Button, Drawer, Form, Input, Menu, Space, Table, Tag, Typography } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const { Title, Text } = Typography;

function RuleDrawer(props) {
  const { selected: initSelected = [], open, onChange, onClose } = props;
  const { data: list } = useRequest(scenarioList);
  const { data: rules, run } = useRequest(ruleList, {
    manual: true,
  });
  const [selectedRows, setSelectedRows] = useState<API.RuleListItem[]>(initSelected);

  const [keywords, setKeywords] = useState('');

  const [selected, setSelected] = useState('');

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

  const filteredRuleList = useMemo(() => {
    return rules?.filter((item) => item.rule_name?.includes(keywords));
  }, [keywords, rules]);
  function handleSelect(item: MenuInfo) {
    setSelected(item.key);
    run(item.key);
  }
  function confirm() {
    onChange(selectedRows);
    onClose();
  }

  const onSelectChange = (_, newSelectedRows: API.RuleListItem[]) => {
    setSelectedRows(newSelectedRows);
  };

  const selectedRowKeys = selectedRows.map((item) => item.id);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    setSelectedRows(initSelected);
  }, [initSelected]);

  return (
    <Drawer
      height="80%"
      title="从规则库选择"
      placement="bottom"
      onClose={onClose}
      closable={false}
      open={open}
      destroyOnClose
    >
      <div className="flex flex-1 h-full overflow-hidden">
        <div className="flex flex-col w-64 border-r p-4">
          <div className="text-lg font-semibold mb-4">规则库</div>
          <div className="flex flex-col h-full overflow-auto">
            {list && (
              <Menu
                items={list.map((item) => ({ key: item.id, label: item.scenario_name }))}
                selectedKeys={[selected]}
                onClick={handleSelect}
              />
            )}
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
            rowKey="id"
            rowSelection={rowSelection}
            columns={ruleColumns}
            dataSource={filteredRuleList}
            pagination={false}
          />
        </div>
      </div>
    </Drawer>
  );
}

function PriceInput(props) {
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
      render: (_, record) => (
        <a onClick={() => onChange(value.filter((item) => item.id !== record.id))}>删除</a>
      ),
    },
  ];

  function show() {
    setOpen(true);
  }

  function close() {
    setOpen(false);
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
      <RuleDrawer open={open} onChange={onChange} onClose={close} selected={value} />
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
