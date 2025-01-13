import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Steps, Typography } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';

const { Title, Text } = Typography;

const actions = [
  {
    label: '修改',
    key: '1',
  },
];

export default function Detail(props: { data: API.ContractListItem; showUpdate: () => void }) {
  const { data } = props;

  const step = useMemo(() => {
    return ['起草中', '审核中', '签订中', '履约中', '已完成'].indexOf(data.stage);
  }, [data.stage]);

  const onClick = ({ key }) => {
    if (key === '1') {
      return props.showUpdate();
    }
  };

  return (
    <div>
      <div className="flex justify-between p-6 bg-[#f4f4f5]">
        <div>
          <Title level={4}>{data.title}</Title>
          <Text>创建日期：{dayjs(data.createTimeStamp).format('YYYY-MM-DD')}</Text>
        </div>
        <div>
          <Dropdown menu={{ items: actions, onClick }} trigger={['click']}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        </div>
      </div>
      <div className="p-6">
        <div className="border-b border-b-[#e4e4e7] py-4">
          <Title level={5}>合同概况</Title>
          <div className="grid gap-3">
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">合同类型</div>
              <div>{data.type}</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">对价</div>
              <div>{data.price}</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">生效日期</div>
              <div>{dayjs(data.startTime).format('YYYY-MM-DD')}</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">终止日期</div>
              <div>{dayjs(data.endTime).format('YYYY-MM-DD')}</div>
            </div>
          </div>
        </div>
        <div className="border-b border-b-[#e4e4e7] py-4">
          <Title level={5}>合同附件</Title>
          <div className="grid gap-3">
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">{data.name}</div>
              {/* <div>
                <Button key="view" size="small" color="primary" variant="link" onClick={() => {}}>
                  更多文件
                </Button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="border-b border-b-[#e4e4e7] py-4">
          <Title level={5}>合同主体</Title>
          <div className="grid gap-3">
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">甲方</div>
              <div>{data.parta}</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">乙方</div>
              <div>{data.partb}</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="text-[#71717a]">第三方</div>
              <div>{data.reviewer}</div>
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
