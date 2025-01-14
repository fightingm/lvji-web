import { retrievalAll } from '@/services/ant-design-pro/api';
import { Line, Pie } from '@ant-design/charts';
import { Column } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import React, { useMemo } from 'react';

const Welcome: React.FC = () => {
  const { data } = useRequest(retrievalAll);

  const list = [
    {
      name: '合同总数',
      value: `${data?.totalNumber ?? '--'}个`,
      desc: '合同总数量',
    },
    {
      name: '未审查合同',
      value: `${data?.uncheckedNumber ?? '--'}个`,
      desc: '还未进行审查的合同数量',
    },
    {
      name: '到期合同',
      value: `${data?.expireNumber ?? '--'}个`,
      desc: '到期合同数量',
    },
    {
      name: '合同总金额',
      value: `¥${data?.totalAmount ?? '--'}`,
      desc: '合同对价总额',
    },
  ];

  const lineConfig = useMemo(() => {
    const arr = data?.timeGroupByList.reverse().map((item) => ({
      日期: item.date,
      数量: item.count,
    }));
    return {
      data: arr,
      height: 400,
      xField: '日期',
      yField: '数量',
      point: {
        size: 5,
        shape: 'diamond',
      },
    };
  }, [data]);

  const colConfig = useMemo(() => {
    const arr = data?.timeGroupByList.reverse().map((item) => ({
      日期: item.date,
      数量: item.count,
    }));
    return {
      data: arr,
      height: 400,
      xField: '日期',
      yField: '数量',
      label: {
        text: () => {
          return '';
        },
        offset: 10,
      },
      legend: false,
    };
  }, [data]);

  const pieConfig = useMemo(() => {
    const arr = data?.typeGroupByList.map((item) => ({
      类型: item.type,
      数量: item.count,
    }));
    return {
      data: arr,
      angleField: '数量',
      colorField: '类型',
      label: {
        text: '类型',
        style: {
          fontWeight: 'bold',
        },
      },
      legend: false,
    };
  }, [data]);

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
            {/* <p className="text-sm">12月</p> */}
          </div>
          <Line {...lineConfig} />
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight">上传合同统计</h3>
              {/* <p className="text-sm text-muted-foreground">30天</p> */}
            </div>
            <div className="p-6 pt-0">
              <Column {...colConfig} />
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
