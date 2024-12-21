import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormTextArea,
  useControlModel,
} from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { Button, Form, Space, Table, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';

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

function PriceInput(props) {
  const { value = [], onChange } = useControlModel(props);
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
  return (
    <div>
      {!!value.length && <Table columns={columns} dataSource={value} pagination={false} />}
      <Space className="mt-2">
        <Button
          icon={<PlusOutlined />}
          onClick={() =>
            onChange([
              ...value,
              { rule_name: Math.random(), created_by: '系统', risk_level: 'MEDIUM' },
            ])
          }
        >
          添加规则
        </Button>
        <Button icon={<SettingOutlined />}>管理规则库</Button>
      </Space>
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
          initialValues={initValue}
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
