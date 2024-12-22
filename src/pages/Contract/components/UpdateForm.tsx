import { contractTypeList } from '@/services/ant-design-pro/api';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
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

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  function handleSubmit(fields: FormValueType) {
    return props.onSubmit({
      ...props.values,
      ...fields,
    });
  }
  async function typeListReq() {
    try {
      const result = await contractTypeList();
      return result.data?.map((item) => ({ label: item.contract_type, value: item.id })) ?? [];
    } catch (error) {
      return [];
    }
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
      <ProFormSelect name="contract_type" label="合同类型" request={typeListReq} />
      <ProFormText name="amount" label="合同对价" />
      <ProFormSelect name="stage_code" label="合同阶段" valueEnum={stageMap} />
      <ProFormDatePicker name="start_date" label="生效日期" />
      <ProFormDatePicker name="end_date" label="终止日期" />
    </ModalForm>
  );
};

export default UpdateForm;
