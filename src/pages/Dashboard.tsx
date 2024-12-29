import { Column, Line, Pie } from '@ant-design/charts';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { theme } from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
  );
};

const list = [
  {
    name: '合同总数',
    value: '1个',
    desc: '合同总数量',
  },
  {
    name: '未审查合同',
    value: '1个',
    desc: '还未进行审查的合同数量',
  },
  {
    name: '到期合同',
    value: '1个',
    desc: '到期合同数量',
  },
  {
    name: '合同总金额',
    value: '¥1000',
    desc: '合同对价总额',
  },
];

const data = [
  { year: '2024-01', value: 2 },
  { year: '2024-02', value: 3 },
  { year: '2024-03', value: 4 },
  { year: '2024-04', value: 3.5 },
  { year: '2024-05', value: 5 },
  { year: '2024-06', value: 4.9 },
  { year: '2024-07', value: 6 },
  { year: '2024-08', value: 7 },
  { year: '2024-09', value: 9 },
  { year: '2024-10', value: 13 },
];

const config = {
  data,
  height: 400,
  xField: 'year',
  yField: 'value',
  point: {
    size: 5,
    shape: 'diamond',
  },
};

const pieConfig = {
  data: [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: '其他', value: 5 },
  ],
  angleField: 'value',
  colorField: 'type',
  label: {
    text: 'value',
    style: {
      fontWeight: 'bold',
    },
  },
  legend: {
    color: {
      title: false,
      position: 'right',
      rowPadding: 5,
    },
  },
};

const columnConfig = {
  data: {
    type: 'fetch',
    value: 'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/column-column.json',
  },
  xField: 'letter',
  yField: 'frequency',
  label: {
    text: (d) => `${(d.frequency * 100).toFixed(1)}%`,
    textBaseline: 'bottom',
  },
  axis: {
    y: {
      labelFormatter: '.0%',
    },
  },
  style: {
    // 圆角样式
    radiusTopLeft: 10,
    radiusTopRight: 10,
  },
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <div className="grid gap-4 p-4 sm:px-6 sm:py-0">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {list.map((item, index) => (
            <div key={index} className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="tracking-tight text-sm font-medium">{item.name}</div>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">合同审查统计</h3>
            <p className="text-sm">12月</p>
          </div>
          <Line {...config} />
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight">上传合同统计</h3>
              <p className="text-sm text-muted-foreground">30天</p>
            </div>
            <div className="p-6 pt-0">
              <Column {...columnConfig} />
            </div>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight">合同类型统计</h3>
            </div>
            <div className="p-6 pt-0">
              <Pie {...pieConfig} />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;
