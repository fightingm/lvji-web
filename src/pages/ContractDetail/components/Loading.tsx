import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export default function ({ data }) {
  return (
    <div className="py-4">
      <div className="flex items-center gap-3 p-3 rounded-lg text-[#4e5969] bg-gradient-to-br from-[#f4f4f4] to-[#e8f9f2]">
        <Spin size="small" />
        <span>审核中，若关闭页面会以短信方式通知审查完成。</span>
      </div>
      <div>
        {data.map((item, index) => {
          return (
            <div key={index} className="mb-5">
              <div className="mt-2 font-bold">{item.name}</div>
              <div className="flex flex-col gap-2 mt-2">
                {item.taskList.map((child, idx) => (
                  <div className="flex items-center gap-2" key={idx}>
                    {!child.status ? (
                      <SyncOutlined spin style={{ color: '#86909c' }} />
                    ) : (
                      <CheckCircleOutlined style={{ color: '#009e59' }} />
                    )}
                    <span>{child.message}</span>
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
