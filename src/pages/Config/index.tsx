import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Input, List, Segmented, Typography } from 'antd';
import React, { useState } from 'react';

const { Title, Text } = Typography;

const data = [
  {
    title: '通用合同',
  },
  {
    title: '保证合同',
  },
  {
    title: '软件开发服务协议',
  },
  {
    title: '离婚协议',
  },
];
const tabs = [
  {
    label: '审查策略',
    value: 0,
  },
  {
    label: '规则配置',
    value: 1,
  },
];

const TableList: React.FC = () => {
  const [tab, setTab] = useState(0);
  return (
    <PageContainer>
      <Text type="secondary">合同配置可以配置专属的自定义审核规则</Text>
      <div className="mt-4">
        <Segmented options={tabs} onChange={setTab} />
      </div>
      {tab === 0 && (
        <>
          <div className="mt-4 flex items-center justify-between">
            <Input className="w-[300px]" placeholder="输入配置名称搜索..." />
            <Button icon={<PlusOutlined />} iconPosition="start">
              新增策略
            </Button>
          </div>
          <div className="mt-4">
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Card title={item.title}>
                    <div className="flex justify-end">
                      <Button>配置规则</Button>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </>
      )}
      {tab === 1 && (
        <>
          <div className="mt-4 flex items-center justify-between">
            <Input className="w-[300px]" placeholder="输入配置名称搜索..." />
            <Button icon={<PlusOutlined />} iconPosition="start">
              新增规则集
            </Button>
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default TableList;
