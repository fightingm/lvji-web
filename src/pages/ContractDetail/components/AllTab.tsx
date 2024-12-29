import { Button, Collapse } from 'antd';
import { useMemo, useState } from 'react';

const text =
  '本合同中所述之保密信息指甲方和关联实体的任何非公开信息、技术和服务资料、商业秘密或专有技术，包括但不限于甲方和关联实体的软件、发明、程序、配方、技术、设计、图样、图纸、模型、诀窍、讨论内容、数据库、计算机程序、各类技术的开发、管理系统及内容、业务计划、市场状况、市场营销、成本及价格策略、销售记录、授课/培训/考核资料、人事规划、财务预算、业务信息、业务合作、商业交易、商业计划、研究资料、产品及产品计划、服务、客户(学员)资料和客户(学员)名单(包括但不展于乙方于受雇期间曾授课或逐渐熟悉的甲方和关联实体的客户和顾客(学员))等(以下简称“保密信息”)，无论保存于任何载体，上述保密信息系乙方通过书面文件、口头交流或观察图样、设备部件等其他各种方式直接或间接地从甲方或关联实体处获取的。';

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

function Item({ text }) {
  return (
    <>
      <Quote text={text} />
      <div className="mt-2 p-4 rounded-md bg-gradient-to-br from-[#f2fbf7] to-[#f1f4fd]">
        {text}
      </div>
    </>
  );
}
const items = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <Item text={text} />,
    style: panelStyle,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
    style: panelStyle,
  },
];

export default function () {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIconPosition="end"
      style={{ background: '#f7f8fa' }}
      items={items}
    />
  );
}
