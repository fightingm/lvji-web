import { PageContainer } from '@ant-design/pro-components';
import { Tabs, TabsProps } from 'antd';
import React from 'react';
import AllTab from './components/AllTab';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '总结',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: '全部',
    children: <AllTab />,
  },
  {
    key: '3',
    label: '高风险',
    children: 'Content of Tab Pane 3',
  },
  {
    key: '4',
    label: '程序条款',
    children: 'Content of Tab Pane 3',
  },
];

const TableList: React.FC = () => {
  return (
    <PageContainer>
      <div className="flex">
        <div className="flex-1 border bg-white p-6"></div>
        <div className="w-[500px] px-2">
          <div className="rounded-xl border bg-[#f7f8fa] shadow p-6 pt-0">
            <Tabs defaultActiveKey="2" items={items} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default TableList;
