import { RuleFormItem } from '@/components/RuleFormItem';
import { strategyDetail, strategyUpdate } from '@/services/ant-design-pro/api';
import { PageContainer, ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useNavigate, useParams, useRequest } from '@umijs/max';
import { Form, Typography, message } from 'antd';
import React, { useRef } from 'react';

const { Text } = Typography;

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
    return run({
      ...values,
      id: params.id,
      smallRuleIds: values.rule_list.map((item) => item.id),
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
            return {
              name: res.data.name,
              description: res.data.description,
              rule_list: res.data.rulesDetailRecords,
            };
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
          <ProFormText name="name" label="审核策略名称" />
          <ProFormTextArea colProps={{ span: 24 }} name="description" label="审核策略描述" />

          <Form.Item name="rule_list" label="审查规则">
            <RuleFormItem />
          </Form.Item>
        </ProForm>
      </div>
    </PageContainer>
  );
};

export default TableList;
