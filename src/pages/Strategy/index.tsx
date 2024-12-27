import { RuleFormItem } from '@/components/RuleFormItem';
import { strategyDetail, strategyUpdate } from '@/services/ant-design-pro/api';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormTextArea,
  useControlModel,
} from '@ant-design/pro-components';
import { useNavigate, useParams, useRequest } from '@umijs/max';
import { Button, Form, Space, Table, Tag, Typography, message } from 'antd';
import React, { useRef } from 'react';

const { Title, Text } = Typography;

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
  const params = useParams();
  const formRef = useRef();

  const navigate = useNavigate();

  const { run, loading } = useRequest(strategyUpdate, {
    manual: true,
    onSuccess() {
      message.success('修改成功');
      navigate(-1);
    },
    onError() {
      message.error('修改失败，请重试');
    },
  });

  function submit(values) {
    if (!params.id) {
      return;
    }
    return run(params.id, {
      ...values,
      rule_list: values.rule_list.map((item) => item.id),
    });
  }

  if (!params.id) {
    return null;
  }

  return (
    <PageContainer>
      <Text type="secondary">审核策略由一组审核规则构成.</Text>
      <div className="mt-4">
        <ProForm
          request={async () => {
            const res = await strategyDetail(params.id!);
            return res.data;
          }}
          onFinish={submit}
          formRef={formRef}
          submitter={{
            searchConfig: {
              resetText: '取消',
              submitText: '修改',
            },
            submitButtonProps: {
              loading,
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
            <RuleFormItem />
          </Form.Item>
        </ProForm>
      </div>
    </PageContainer>
  );
};

export default TableList;
