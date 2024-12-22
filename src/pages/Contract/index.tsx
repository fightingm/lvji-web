import {
  addRule,
  contract,
  contractDetail,
  removeContract,
  updateContract,
} from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, Modal, message } from 'antd';
import React, { useRef, useState } from 'react';
import Detail from './components/Detail';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { Radar } from '@ant-design/charts';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('更新中');
  const { id, ...rest } = fields;
  try {
    await updateContract(id!, rest);
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败，请重试');
    return false;
  }
};

const handleRemove = async (row: API.ContractListItem) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeContract(row.id);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);

  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ContractListItem>();
  const [detail, setDetail] = useState<API.ContractListItem>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  function handleDel(row: API.ContractListItem) {
    Modal.confirm({
      title: '确认删除合同?',
      content: '删除合同后将不能再恢复数据.',
      async onOk() {
        const success = await handleRemove(row);
        if (success) {
          actionRef.current?.reload();
        }
      },
    });
  }

  async function handleDetail(row: API.ContractListItem) {
    setShowDetail(true);
    try {
      const result = await contractDetail(row.id);
      setDetail(result);
    } catch (error) {
      message.error('查看失败，请重试');
      setShowDetail(false);
    }
  }

  function showUpdate(row: API.ContractListItem) {
    handleUpdateModalOpen(true);
    setCurrentRow(row);
  }

  async function updateConfirm(value) {
    const success = await handleUpdate(value);
    if (success) {
      handleUpdateModalOpen(false);
      setCurrentRow(undefined);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  }

  function updateCancel() {
    handleUpdateModalOpen(false);
    if (!showDetail) {
      setCurrentRow(undefined);
    }
  }

  const columns: ProColumns<API.ContractListItem>[] = [
    {
      title: '合同标题',
      dataIndex: 'contract_name',
      render: (dom) => {
        return <span className="font-medium">{dom}</span>;
      },
    },
    {
      title: '合同阶段',
      dataIndex: 'stage_code',
      search: false,
      valueEnum: {
        1: '起草',
        2: '审核',
        3: '签订',
        4: '履约中',
        5: '已完成',
      },
    },
    {
      title: '解析状态',
      dataIndex: 'parse_status',
      hideInForm: true,
      search: false,
      valueEnum: {
        1: {
          text: '进行中',
          status: 'Processing',
        },
        2: {
          text: '成功',
          status: 'Success',
        },
        3: {
          text: '失败',
          status: 'Error',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="view"
          size="small"
          color="primary"
          variant="link"
          onClick={() => handleDetail(record)}
        >
          查看
        </Button>,
        <Button
          key="del"
          size="small"
          color="danger"
          variant="link"
          onClick={() => handleDel(record)}
        >
          删除
        </Button>,
        <Button
          key="view"
          size="small"
          color="primary"
          variant="link"
          onClick={() => showUpdate(record)}
        >
          修改
        </Button>,
        <Button
          key="check"
          size="small"
          color="primary"
          variant="link"
          onClick={() => showUpdate(record)}
        >
          智能审查
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow sm:col-span-2">
          <div className="flex flex-col space-y-1.5 p-6 pb-3">
            <h3 className="font-semibold leading-none tracking-tight">合同管理</h3>
            <p className="text-sm text-balance max-w-lg leading-relaxed">
              上传您的合同,在这里完善合同的基本信息.合同文件有更新可以替换合同附件.
            </p>
          </div>
          <div className="flex items-center p-6 pt-0">
            <Button
              type="primary"
              onClick={() => {
                handleModalOpen(true);
              }}
            >
              上传合同
            </Button>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <p className="text-sm text-muted-foreground">本周</p>
            <h3 className="font-semibold tracking-tight text-4xl">0个</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-xs text-muted-foreground">合同即将到期</div>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <p className="text-sm text-muted-foreground">本月</p>
            <h3 className="font-semibold tracking-tight text-4xl">0个</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-xs text-muted-foreground">合同即将到期</div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <ProTable<API.ContractListItem, API.PageParams>
          headerTitle="合同列表"
          actionRef={actionRef}
          rowKey="key"
          search={{
            labelWidth: 120,
          }}
          request={contract}
          columns={columns}
        />
      </div>

      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={updateConfirm}
        onCancel={updateCancel}
        visible={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={400}
        styles={{
          body: {
            padding: '0',
          },
        }}
        open={showDetail}
        onClose={() => {
          setShowDetail(false);
          setDetail(undefined);
        }}
        closable={false}
      >
        {detail && <Detail data={detail} />}
      </Drawer>
      <Radar />
    </PageContainer>
  );
};

export default TableList;
