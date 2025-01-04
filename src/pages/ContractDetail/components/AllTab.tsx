import {
  CopyOutlined,
  DownOutlined,
  FileDoneOutlined,
  ProfileOutlined,
  PushpinOutlined,
} from '@ant-design/icons';
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

const mockData = {
  text,
  basis: [
    {
      tag: '签署条款',
      title: '缺少签署地点的具体约定',
      desc: '合同中未明确签署地点，建议明确到区一级，如本合同由甲乙双方签署于成都市武侯区，以避免未来可能产生的地域管辖争议。',
    },
    {
      tag: '标的质量',
      title: '标的质量标准不够具体明确',
      desc: '虽然合同中提到乙方需按时、按质、按量地完成工作任务，并需达到甲方的工作要求，但具体的‘质’和‘量’的标准并未详细列出，这可能导致在实际操作中难以衡量乙方的工作是否符合标准，从而引发争议。',
    },
  ],
};

function Item({ data }) {
  const { text, basis } = data;
  const [expand, setExpand] = useState(true);
  return (
    <>
      <Quote text={text} />
      <div className="mt-2 p-4 rounded-md bg-gradient-to-br from-[#f2fbf7] to-[#f1f4fd]">
        {text}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center gap-1 cursor-pointer hover:text-[#009e59]">
          <PushpinOutlined style={{ color: '#009e59' }} />
          <span>定位到原文</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-[#009e59]">
          <CopyOutlined style={{ color: '#009e59' }} />
          <span>复制修改建议</span>
        </div>
        <div className="ml-auto flex items-center gap-1 cursor-pointer">
          <Button icon={<FileDoneOutlined style={{ color: '#009e59' }} />}>接受修订</Button>
        </div>
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
const items = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <Item data={mockData} />,
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
