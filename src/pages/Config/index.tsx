import { scenarioList, strategyAdd, strategyList } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Link, useRequest } from '@umijs/max';
import { Button, Card, Input, List, Segmented, Typography, message } from 'antd';
import React, { useState } from 'react';
import AddForm, { FormValueType } from './components/AddForm';

const { Title, Text } = Typography;

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

const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('新增中');
  try {
    await strategyAdd(fields);
    hide();
    message.success('新增成功');
    return true;
  } catch (error) {
    hide();
    message.error('新增失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  const [tab, setTab] = useState(0);
  const { data } = useRequest(strategyList);
  const { data: rules, refresh } = useRequest(scenarioList);

  const [scenarioModalOpen, setScenarioModalOpen] = useState(false);

  function addScenarioOpen() {
    setScenarioModalOpen(true);
  }

  function addScenarioCancel() {
    setScenarioModalOpen(false);
  }
  async function addScenarioConfirm(value: FormValueType) {
    const success = await handleAdd(value);
    if (success) {
      setScenarioModalOpen(false);
      refresh();
    }
  }

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
              <Link to="/clm/config/strategy-add">新增策略</Link>
            </Button>
          </div>
          <div className="mt-4">
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Card title={item.strategy_name}>
                    <div className="text-sm">{item.strategy_desc}</div>
                    <div className="mt-2 flex justify-end">
                      <Button>
                        <Link to="/clm/config/strategy-edit/222">配置策略</Link>
                      </Button>
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
            <Button icon={<PlusOutlined />} iconPosition="start" onClick={addScenarioOpen}>
              新增规则集
            </Button>
          </div>
          <div className="mt-4">
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={rules}
              renderItem={(item) => (
                <List.Item>
                  <Card title={item.scenario_name}>
                    <div className="flex justify-end">
                      <Button>
                        <Link to="/clm/config/rule-edit/222">配置规则</Link>
                      </Button>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </>
      )}
      <AddForm
        onSubmit={addScenarioConfirm}
        onCancel={addScenarioCancel}
        visible={scenarioModalOpen}
      />
    </PageContainer>
  );
};

export default TableList;
