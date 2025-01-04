import { PageContainer } from '@ant-design/pro-components';
import { Tabs, TabsProps } from 'antd';
import mammoth from 'mammoth';
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

function transformParagraph(paragraph) {
  let styleName = '';
  if (paragraph.alignment === 'center') {
    styleName = 'text-center';
  } else if (paragraph.alignment === 'right') {
    styleName = 'text-right';
  }

  return {
    ...paragraph,
    styleName,
  };
}

function transformRun(element) {
  const { fontSize } = element;
  let styleName = '';
  if (fontSize > 16) {
    styleName = 'text-lg';
  } else {
    styleName = 'text-base';
  }

  return {
    ...element,
    styleName,
  };
}

function transformElement(element) {
  const { children, type } = element;
  if (children) {
    return { ...element, children: children.map((item) => transformElement(item)) };
  }

  if (type === 'paragraph') {
    return transformParagraph(element);
  } else if (type === 'run') {
    return transformRun(element);
  }
}

const docConfig = {
  styleMap: [
    "p[style-name='text-center'] => div.text-center:fresh",
    "p[style-name='text-right'] => div.text-right:fresh",
    // "r[style-name='text-lg'] => p.text-lg:fresh",
    // "r[style-name='text-base'] => p.text-base:fresh",
  ],
  transformDocument: transformElement,
};
const TableList: React.FC = () => {
  const [loading] = useState(false);
  const [docHtml, setDocHtml] = useState('');

  useEffect(() => {
    fetch('/1.docx')
      .then((res) => {
        return res.arrayBuffer();
      })
      .then((data) => {
        return mammoth.convertToHtml({ arrayBuffer: data }, docConfig);
      })
      .then(function (res) {
        setDocHtml(res.value);
      })
      .catch(function (error) {
        console.log('xxxx', error);
      });
  }, []);

  return (
    <PageContainer>
      <div className="flex">
        <div className="flex-1 border bg-white p-6">
          <div dangerouslySetInnerHTML={{ __html: docHtml }}></div>
        </div>
        <div className="w-[500px] px-2">
          <div className="rounded-xl border bg-[#f7f8fa] shadow p-6 pt-0">
            {loading ? <Loading /> : <Tabs defaultActiveKey="2" items={items} />}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default TableList;
