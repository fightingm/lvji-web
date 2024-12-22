export default {
  'GET /api/analysis': {
    data: [
      {
        id: 95,
        contract_name: '劳 动 合 同1',
        file_name: '劳 动 合 同 1.docx',
        contract_party: '四川省海河贸易有限公司',
        status: 'SUCCESS',
        created_at: '2022-12-06T05:00:57.040Z',
      },
      {
        id: 96,
        contract_name: '劳 动 合 同2',
        file_name: '劳 动 合 同 2.docx',
        contract_party: '四川省海河贸易有限公司',
        status: 'SUCCESS',
        created_at: '2022-12-06T05:00:57.040Z',
      },
      {
        id: 97,
        contract_name: '劳 动 合 同3',
        file_name: '劳 动 合 同 3.docx',
        contract_party: '四川省海河贸易有限公司',
        status: 'SUCCESS',
        created_at: '2022-12-06T05:00:57.040Z',
      },
      {
        id: 98,
        contract_name: '劳 动 合 同4',
        file_name: '劳 动 合 同 4.docx',
        contract_party: '四川省海河贸易有限公司',
        status: 'FAILED',
        created_at: '2022-12-06T05:00:57.040Z',
      },
      {
        id: 99,
        contract_name: '劳 动 合 同5',
        file_name: '劳 动 合 同 5.docx',
        contract_party: '四川省海河贸易有限公司',
        status: 'PROCESSING',
        created_at: '2022-12-06T05:00:57.040Z',
      },
    ],
    total: 100,
    success: true,
    pageSize: 20,
    current: 1,
  },
  'GET /api/analysis/:id': {
    id: '1c020981-ae04-4ac1-b306-2e90b0ae9752',
    review_conclusion: '合同内容较为全面，符合中国法律规定，但需注意部分条款的具体执行。',
    finish_time: '2024-12-19 00:03:55',
    review_score: [
      {
        score: 90,
        type: '合法性',
      },
      {
        score: 80,
        type: '合规性',
      },
      {
        score: 90,
        type: '成本效益',
      },
      {
        score: 90,
        type: '完整性',
      },
      {
        score: 90,
        type: '清晰度',
      },
      {
        score: 90,
        type: '风险',
      },
    ],
  },
  'DELETE /api/analysis/:id': {
    success: true,
  },
  'POST /api/analysis/:id': {
    success: true,
  },
};
