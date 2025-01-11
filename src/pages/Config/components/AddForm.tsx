import { ModalForm, ProFormText } from '@ant-design/pro-components';
import React from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.ScenarioItem>;

export type AddFormProps = {
  onCancel: () => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  visible: boolean;
};

const AddForm: React.FC<AddFormProps> = (props) => {
  return (
    <ModalForm
      title="新增规则集"
      open={props.visible}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: props.onCancel,
      }}
      onFinish={props.onSubmit}
    >
      <ProFormText name="name" label="规则集名称" />
    </ModalForm>
  );
};

export default AddForm;
