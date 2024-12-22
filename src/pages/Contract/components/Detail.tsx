import { Button, Steps, Typography } from 'antd';
import { useMemo } from 'react';

const { Title, Text } = Typography;

export default function Detail(props: { data: API.ContractListItem }) {
  const { data } = props;

  const step = useMemo(() => {
    return Number(data.stage_code);
  }, [data.stage_code]);

  return (
    <div>
      <div className="p-6 bg-[#f4f4f5]">
        <Title level={4}>{data.contract_name}</Title>
        <Text>创建日期：{data.created_at}</Text>
      </div>
      <div className="p-6">
        <div className="border-b border-b-[#e4e4e7] py-4">
          <Title level={5}>合同概况</Title>
          <div className="grid gap-3">
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">合同类型</div>
              <div>{data.contract_type}</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">对价</div>
              <div>{data.amount}</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">生效日期</div>
              <div>{data.start_date}</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">终止日期</div>
              <div>{data.end_date}</div>
            </div>
          </div>
        </div>
        <div className="border-b border-b-[#e4e4e7] py-4">
          <Title level={5}>合同附件</Title>
          <div className="grid gap-3">
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">{data.file_list?.[0].name}</div>
              <div>
                <Button key="view" size="small" color="primary" variant="link" onClick={() => {}}>
                  更多文件
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-b-[#e4e4e7] py-4">
          <Title level={5}>合同主体</Title>
          <div className="grid gap-3">
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">甲方</div>
              <div>{data.parties.party_a}</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">乙方</div>
              <div>{data.parties.party_b}</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">第三方</div>
              <div>{data.parties.party_c}</div>
            </div>
          </div>
        </div>
        <div className="py-4">
          <Title level={5}>合同阶段</Title>
          <Steps
            direction="vertical"
            current={step}
            items={[
              {
                title: '起草',
              },
              {
                title: '审核',
              },
              {
                title: '签订',
              },
              {
                title: '履约中',
              },
              {
                title: '已完成',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
