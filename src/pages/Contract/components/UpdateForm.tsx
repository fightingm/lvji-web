import { contractTypeList } from '@/services/ant-design-pro/api';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import dayjs from 'dayjs';
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
  起草中: '起草中',
  审核中: '审核中',
  签订中: '签订中',
  履约中: '履约中',
  已完成: '已完成',
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  function handleSubmit(fields: FormValueType) {
    return props.onSubmit({
      ...props.values,
      ...fields,
      startTime: dayjs(fields.startTime).valueOf(),
      endTime: dayjs(fields.endTime).valueOf(),
    });
  }
  async function typeListReq() {
    try {
      const result = await contractTypeList();
      return result.data?.map((item) => ({ label: item, value: item })) ?? [];
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
      <ProFormText name="title" label="合同标题" />
      <ProFormSelect name="type" label="合同类型" request={typeListReq} />
      <ProFormDigit name="price" label="合同对价" />
      <ProFormSelect name="stage" label="合同阶段" valueEnum={stageMap} />
      <ProFormDatePicker name="startTime" label="生效日期" />
      <ProFormDatePicker name="endTime" label="终止日期" />
    </ModalForm>
  );
};

export default UpdateForm;
