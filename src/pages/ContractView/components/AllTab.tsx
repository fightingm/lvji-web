import { CopyOutlined, DownOutlined, ProfileOutlined } from '@ant-design/icons';
import { Button, Collapse, Skeleton, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useMemo, useState } from 'react';

const panelStyle: React.CSSProperties = {
  marginBottom: 24,
  //   border: 'none',
  borderWidth: '1px',
  borderRadius: '6px',
  background: '#fff',
};

function Quote({ text }) {
  const [expend, setExpend] = useState(false);
  const showText = useMemo(() => {
    return expend ? text : text.slice(0, 36) + '...';
  }, [expend, text]);
  return (
    <div className="pl-3 border-l-2 border-[#c9cdd4] text-[#86909c] text-sm">
      {expend ? <div>{showText}</div> : showText}
      <Button type="link" size="small" onClick={() => setExpend((v) => !v)}>
        展开
      </Button>
    </div>
  );
}

function Item({ data }) {
  const { text, revisedText, compareContent, basis } = data;
  const [expand, setExpand] = useState(true);

  function handleCopy() {
    copy(revisedText);
    message.success('复制成功');
  }
  return (
    <>
      <Quote text={text} />
      <div
        className="mt-2 p-4 rounded-md bg-gradient-to-br from-[#f2fbf7] to-[#f1f4fd]"
        dangerouslySetInnerHTML={{ __html: compareContent }}
      />
      <div className="mt-4 flex items-center gap-2">
        {/* <div className="flex items-center gap-1 cursor-pointer hover:text-[#009e59]">
          <PushpinOutlined style={{ color: '#009e59' }} />
          <span>定位到原文</span>
        </div> */}
        <div
          className="flex items-center gap-1 cursor-pointer hover:text-[#009e59]"
          onClick={handleCopy}
        >
          <CopyOutlined style={{ color: '#009e59' }} />
          <span>复制修改建议</span>
        </div>
        {/* <div className="ml-auto flex items-center gap-1 cursor-pointer">
          <Button icon={<FileDoneOutlined style={{ color: '#009e59' }} />}>接受修订</Button>
        </div> */}
      </div>
      <div className="mt-4">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setExpand((v) => !v)}
        >
          <span className="font-bold">审查依据</span>
          <DownOutlined rotate={expand ? 0 : -90} style={{ fontSize: 12 }} />
        </div>
        <div className="mt-2">
          <div className="flex flex-wrap gap-2">
            {basis.map((item, index) => {
              if (expand) {
                return (
                  <div key={index} className="w-full border p-4 rounded-lg">
                    <div className="inline-flex items-center gap-1 border px-2 py-1 rounded-2xl">
                      <ProfileOutlined style={{ color: '#009e59' }} />
                      <span>{item.tag}</span>
                    </div>
                    <div className="font-bold mt-2">{item.title}</div>
                    <div className="text-[#4e5969] mt-2">{item.desc}</div>
                  </div>
                );
              }
              return (
                <div key={index} className="flex items-center gap-1 border px-2 py-1 rounded-2xl">
                  <ProfileOutlined style={{ color: '#009e59' }} />
                  <span>{item.tag}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default function (props) {
  const items = useMemo(() => {
    return props.items.map((item, index) => {
      const data = {
        text: item.originalContent,
        revisedText: item.revisedContent,
        compareContent: item.compareContent,
        basis: [
          {
            tag: item.evidenceType,
            title: item.evidenceSummary,
            desc: item.evidenceContent,
          },
        ],
      };
      return {
        key: index,
        label: item.reviewSummary,
        children: <Item data={data} />,
        style: panelStyle,
      };
    });
  }, [props.items]);
  if (!items.length) {
    return <Skeleton />;
  }
  return (
    <div className="[&_.red-txt]:text-red-600">
      <Collapse
        bordered={false}
        defaultActiveKey={['0']}
        expandIconPosition="end"
        style={{ background: '#f7f8fa' }}
        items={items}
      />
    </div>
  );
}
