import {
  ModalForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import React from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: () => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<API.RuleListItem>;
  types: API.RuleTypeItem[];
};

const stageMap = {
  '1': '起草中',
  '2': '审核中',
  '3': '签订完成',
  '4': '履约中',
  '5': '纠纷处理中',
  '6': '已终止',
  '7': '已到期',
  '8': '已完成',
};

const riskList = [
  {
    label: '高风险',
    value: '1',
  },
  {
    label: '中风险',
    value: '2',
  },
  {
    label: '低风险',
    value: '3',
  },
];

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  function handleSubmit(fields: FormValueType) {
    return props.onSubmit({
      ...props.values,
      ...fields,
    });
  }
  const typesValue = props.types.map((item) => ({ lael: item.rule_type, value: item.id }));
  return (
    <ModalForm
      title="修改审查规则"
      open={props.visible}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: props.onCancel,
      }}
      initialValues={props.values}
      onFinish={handleSubmit}
    >
      <ProFormRadio.Group name="risk_level" label="风险等级" options={riskList} />
      <ProFormText name="rule_name" label="规则名称" />
      <ProFormTextArea name="rule_desc" label="规则内容" />
      <ProFormSelect name="rule_type" label="规则类型" options={typesValue} />
    </ModalForm>
  );
};

export default UpdateForm;
