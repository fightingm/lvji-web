import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Input, Table, Tag, Typography } from 'antd';
import React from 'react';

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

const TableList: React.FC = () => {
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
      render: () => <a>删除</a>,
    },
  ];
  return (
    <PageContainer>
      <Text type="secondary">系统创建的规则无法删除和修改.</Text>
      <div className="mt-4 flex items-center justify-between">
        <Input className="w-[300px]" placeholder="输入规则名称搜索..." />
        <Button icon={<PlusOutlined />} iconPosition="start">
          新增规则
        </Button>
      </div>
      <div className="mt-4">
        <Table columns={columns} dataSource={list} pagination={false} />
      </div>
    </PageContainer>
  );
};

export default TableList;
