import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const list = [
  {
    key: '1',
    label: '合同结构分析',
    items: [
      {
        key: '1',
        label: '识别合同中的所有条款',
        loading: true,
      },
      {
        key: '2',
        label: '分析条款性质',
        loading: true,
      },
      {
        key: '3',
        label: '查找数据库中的合同分类特征',
        loading: false,
      },
    ],
  },
  {
    key: '2',
    label: '合同结构分析',
    items: [
      {
        key: '1',
        label: '识别合同中的所有条款',
        loading: false,
      },
      {
        key: '2',
        label: '分析条款性质',
        loading: true,
      },
      {
        key: '3',
        label: '查找数据库中的合同分类特征',
        loading: false,
      },
    ],
  },
  {
    key: '3',
    label: '合同结构分析',
    items: [
      {
        key: '1',
        label: '识别合同中的所有条款',
        loading: true,
      },
      {
        key: '2',
        label: '分析条款性质',
        loading: false,
      },
      {
        key: '3',
        label: '查找数据库中的合同分类特征',
        loading: false,
      },
    ],
  },
];

export default function () {
  return (
    <div className="py-4">
      <div className="flex items-center gap-3 p-3 rounded-lg text-[#4e5969] bg-gradient-to-br from-[#f4f4f4] to-[#e8f9f2]">
        <Spin size="small" />
        <span>审核中，若关闭页面会以短信方式通知审查完成。</span>
      </div>
      <div>
        {list.map((item) => {
          return (
            <div key={item.key} className="mb-5">
              <div className="mt-2 font-bold">{item.label}</div>
              <div className="flex flex-col gap-2 mt-2">
                {item.items.map((child) => (
                  <div className="flex items-center gap-2" key={child.key}>
                    {child.loading ? (
                      <SyncOutlined spin style={{ color: '#86909c' }} />
                    ) : (
                      <CheckCircleOutlined style={{ color: '#009e59' }} />
                    )}
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
