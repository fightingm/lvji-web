import { strategyList } from '@/services/ant-design-pro/api';
import { BulbOutlined, CheckCircleFilled } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useNavigate, useRequest } from '@umijs/max';
import { Button, Input, Select } from 'antd';
import React, { useState } from 'react';

function Step1(props) {
  const [position, setPosition] = useState(0);
  const [checkScale, setCheckScale] = useState(0);
  const [strategy, setStragety] = useState();
  const [annotations, setAnnotations] = useState('');

  const { data: strategyArr } = useRequest(strategyList);

  const selectOptions = strategyArr?.records?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  function confirm() {
    props.onOk({
      position,
      checkScale,
      strategy,
      annotations,
    });
  }
  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <div>
            <div className="relative text-lg font-bold pl-[14px] before:absolute before:w-[6px] before:h-[6px] before:bg-[#009e59] before:rounded-full before:top-1/2 before:left-0 before:mt-[-3px]">
              选择你的立场
            </div>
            <div className="mt-1 pl-[14px] text-[#86909c] text-sm">选定你的合同审查立场</div>
          </div>
          <div className="text-base font-bold">劳动合同</div>
        </div>
        <div className="flex items-center justify-center gap-x-8 mt-5">
          <div
            className={`flex-1 px-4 py-5 border border-[#e5e6eb] rounded-md cursor-pointer hover:border-[#009e59] ${
              position === 0 && 'border-[#009e59] bg-[#009e59]/[.06]'
            }`}
            onClick={() => setPosition(0)}
          >
            <div className="text-[#86909c] text-base">甲方</div>
            <div className="h-[96px] overflow-hidden text-2xl font-bold">
              四川省鼎艺源贸易有限公司
            </div>
          </div>
          <div
            className={`flex-1 px-4 py-5 border border-[#e5e6eb] rounded-md cursor-pointer hover:border-[#009e59] ${
              position === 1 && 'border-[#009e59] bg-[#009e59]/[.06]'
            }`}
            onClick={() => setPosition(1)}
          >
            <div className="text-[#86909c] text-base">乙方</div>
            <div className="h-[96px] overflow-hidden text-2xl font-bold">
              四川省鼎艺源贸易有限公司
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="relative text-lg font-bold pl-[14px] before:absolute before:w-[6px] before:h-[6px] before:bg-[#009e59] before:rounded-full before:top-1/2 before:left-0 before:mt-[-3px]">
              选择你的审查尺度
            </div>
            <div className="mt-1 pl-[14px] text-[#86909c] text-sm">
              选定不同审查尺度，对应不同的审查范围
            </div>
          </div>
        </div>
        <div className="p-1 flex items-center justify-center mt-5 rounded-md bg-[#f7f7f7]">
          <div
            className={`h-[54px] flex-1 flex justify-center items-center rounded-md cursor-pointer ${
              checkScale === 0 && ' bg-white'
            }`}
            onClick={() => setCheckScale(0)}
          >
            <div className="text-lg">强势</div>
          </div>
          <div
            className={`h-[54px] flex-1 flex justify-center items-center rounded-md cursor-pointer ${
              checkScale === 1 && ' bg-white'
            }`}
            onClick={() => setCheckScale(1)}
          >
            <div className="text-lg">中立</div>
          </div>
          <div
            className={`h-[54px] flex-1 flex justify-center items-center rounded-md cursor-pointer ${
              checkScale === 2 && ' bg-white'
            }`}
            onClick={() => setCheckScale(2)}
          >
            <div className="text-lg">弱势</div>
          </div>
        </div>
        <div className="text-[#86909c] text-sm mt-3">
          你所代表阵营的谈判地位较低，对合同的修改尺度处于相对劣势。系统在审查修改时对于与实现合同核心目的有关的底线问题必须修改，对于非底线问题可适度放宽审查标准。
        </div>
      </div>
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="relative text-lg font-bold pl-[14px] before:absolute before:w-[6px] before:h-[6px] before:bg-[#009e59] before:rounded-full before:top-1/2 before:left-0 before:mt-[-3px]">
              设置审阅人
            </div>
            <div className="mt-1 pl-[14px] text-[#86909c] text-sm">
              设置审阅人名称，在导出修订版本生效
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Input
            value={annotations}
            onChange={(e) => setAnnotations(e.target.value)}
            className="w-[300px]"
            size="large"
          />
        </div>
      </div>
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="relative text-lg font-bold pl-[14px] before:absolute before:w-[6px] before:h-[6px] before:bg-[#009e59] before:rounded-full before:top-1/2 before:left-0 before:mt-[-3px]">
              设置审查重点
            </div>
            <div className="mt-1 pl-[14px] text-[#86909c] text-sm">
              编辑设置合同重点，影响代表方的审查倾向
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Select
            className="w-[300px]"
            size="large"
            showSearch
            value={strategy}
            placeholder="选择一个策略"
            optionFilterProp="label"
            onChange={setStragety}
            options={selectOptions}
          />
        </div>
      </div>
      <div className="mt-12 flex justify-center">
        <Button type="primary" size="large" className="w-40" onClick={confirm}>
          下一步
        </Button>
      </div>
    </div>
  );
}

const list = [
  {
    label: '标的审查',
    desc: '系统分析合同标的类型及标的详情，智能分析标的条款可能存在的风险并进行审查修改。',
    value: 'aaa',
    checked: true,
  },
  {
    label: '目的审查',
    desc: '系统基于审查立场分析其通过合同希望实现的目的以及对应需要满足的条件，进一步分析合同中对应的权利义务条款是否存在风险并进行审查修改。',
    value: 'bbb',
    checked: true,
  },
  {
    label: '主体审查',
    desc: '调取合同相对方的信息，分析相关主体的资信能力以及是否具备合同签署的资质或许可。',
    value: 'ccc',
    checked: true,
  },
  {
    label: '违约责任',
    desc: '分析我方及相对方在合同中的义务及对应的违约责任条款安排，并判断相关条款安排是否存在风险。',
    value: 'ddd',
    checked: true,
  },
  {
    label: '程序性条款审查',
    desc: '判断合同中是否包含鉴于、免责、通知与送达、争议解决、保密、效力、附件、签署等程序性条款，并分析是否存在风险。',
    value: 'eee',
    checked: true,
  },
  {
    label: '文字符号审查',
    desc: '分析合同内容中是否存在未使用法言法语、过于开放性描述、指代不明确、表述存在歧义、前后不统一、表述不规范等风险。',
    value: 'fff',
  },
];

function Step2(props) {
  const [items, setItems] = useState(list);

  function confirm() {
    props.onOk(items.filter((item) => item.checked).map((item) => item.value));
  }
  function check(value: string) {
    setItems(
      items.map((item) => ({
        ...item,
        checked: item.value === value ? !item.checked : item.checked,
      })),
    );
  }

  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <div>
            <div className="relative text-lg font-bold pl-[14px] before:absolute before:w-[6px] before:h-[6px] before:bg-[#009e59] before:rounded-full before:top-1/2 before:left-0 before:mt-[-3px]">
              选择合同审查组件
            </div>
            <div className="mt-1 pl-[14px] text-[#86909c] text-sm">
              系统将根据审查清单中的具体审查要求及参考资料审查合同。
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mt-5">
          {items.map((item) => (
            <div
              key={item.value}
              className="flex-shrink-0 flex-grow-0 basis-1/2 p-3"
              onClick={() => check(item.value)}
            >
              <div
                className={`group border border-[#e5e6eb] rounded-md px-3 py-4 cursor-pointer hover:border-[#009e59] ${
                  item.checked && 'border-[#009e59]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <BulbOutlined style={{ fontSize: '20px' }} />
                  {item.checked ? (
                    <CheckCircleFilled style={{ fontSize: '20px' }} className="text-[#009e59]" />
                  ) : (
                    <div className="w-[20px] h-[20px] rounded-full border border-[#e5e6eb] group-hover:border-[#009e59]" />
                  )}
                </div>
                <div className="text-lg font-bold mt-3">{item.label}</div>
                <div className="text-[#86909c] text-sm mt-2 h-[60px] overflow-hidden">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-y-2 items-center ">
        <Button type="primary" size="large" className="w-40" onClick={confirm}>
          确定
        </Button>
        <Button type="link" size="large" className="w-40" onClick={props.onBack}>
          返回上一步
        </Button>
      </div>
    </div>
  );
}

const TableList: React.FC = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  function next(value) {
    console.log('xxx', value);
    setStep(1);
  }
  function back() {
    setStep(0);
  }
  function finish(value) {
    console.log('xxx', value);
    // setStep(0);
    navigate('/clm/contract/detail');
  }

  return (
    <PageContainer>
      <div className="rounded-xl border shadow px-6 py-8 bg-white">
        {step === 0 && <Step1 onOk={next} />}
        {step === 1 && <Step2 onOk={finish} onBack={back} />}
      </div>
    </PageContainer>
  );
};

export default TableList;
