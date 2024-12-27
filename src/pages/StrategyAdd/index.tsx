import { RuleFormItem } from '@/components/RuleFormItem';
import { strategyAdd } from '@/services/ant-design-pro/api';
import { PageContainer, ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useNavigate, useRequest } from '@umijs/max';
import { Form, Typography, message } from 'antd';
import React, { useRef } from 'react';

const { Title, Text } = Typography;

const TableList: React.FC = () => {
  const formRef = useRef();

  const navigate = useNavigate();

  const { run, loading } = useRequest(strategyAdd, {
    manual: true,
    onSuccess() {
      message.success('新增成功');
      navigate(-1);
    },
    onError() {
      message.error('新增失败，请重试');
    },
  });

  function submit(values) {
    return run({
      ...values,
      rule_list: values.rule_list.map((item) => item.id),
    });
  }

  return (
    <PageContainer>
      <Text type="secondary">审核策略由一组审核规则构成.</Text>
      <div className="mt-4">
        <ProForm
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
