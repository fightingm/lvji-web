import { ModalForm, ProFormText } from '@ant-design/pro-components';
import React from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.ContractListItem>;

export type UpdateFormProps = {
  onCancel: () => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  visible: boolean;
  values: Partial<API.ContractListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  function handleSubmit(fields: FormValueType) {
    return props.onSubmit({
      ...props.values,
      ...fields,
    });
  }
  return (
    <ModalForm
      title="合同信息修改"
      open={props.visible}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: props.onCancel,
      }}
      initialValues={props.values}
      onFinish={handleSubmit}
    >
      <ProFormText name="contract_name" label="合同标题" />
      <ProFormText name="contract_type" label="合同类型" />
      <ProFormText name="name" label="合同对价" />
      <ProFormText name="stage_code" label="合同阶段" />
      <ProFormText name="start_date" label="生效日期" />
      <ProFormText name="end_date" label="终止日期" />
    </ModalForm>
  );
};

export default UpdateForm;
