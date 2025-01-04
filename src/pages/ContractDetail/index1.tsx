import { PageContainer } from '@ant-design/pro-components';
import Editor from '@hufe921/canvas-editor';
import docxPlugin from '@hufe921/canvas-editor-plugin-docx';
import { Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';
import AllTab from './components/AllTab';
import Loading from './components/Loading';

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
  const [loading] = useState(false);

  useEffect(() => {
    fetch('/1.docx')
      .then((res) => {
        return res.arrayBuffer();
      })
      .then((data) => {
        const instance = new Editor(document.getElementById('docx') as HTMLDivElement, {
          main: [{ value: '' }],
        });
        instance.use(docxPlugin);

        instance.command.executeImportDocx({
          arrayBuffer: data,
        });

        // instance.executeExportDocx({
        // fileName: string,
        // });
        // return renderAsync(data, document.getElementById('docx') as HTMLElement);
      })
      .catch(function (error) {
        console.log('xxxx', error);
      });
  }, []);

  return (
    <PageContainer>
      <div className="flex">
        <div className="flex-1 border bg-white">
          <div id="docx" className=" h-screen overflow-auto"></div>
        </div>
        <div className="shrink-0 w-[500px] px-2 h-screen overflow-hidden">
          <div className="rounded-xl border bg-[#f7f8fa] shadow p-6 pt-0 h-full [&_.ant-tabs]:h-full [&_>.ant-tabs-content-holder]:!flex-1 [&_.ant-tabs-content-holder]:!overflow-auto">
            {loading ? <Loading /> : <Tabs defaultActiveKey="2" items={items} />}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default TableList;
