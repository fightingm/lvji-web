export default {
  'GET /api/strategy/list': {
    data: [
      {
        id: '35202700-88ab-423c-aa22-4594640084da',
        strategy_name: '劳 动 合 同1',
        strategy_desc: '劳 动 合 同 1.docx',
      },
      {
        id: '96',
        strategy_name: '劳 动 合 同2',
        strategy_desc: '劳 动 合 同 2.docx',
      },
      {
        id: '97',
        strategy_name: '劳 动 合 同3',
        strategy_desc: '劳 动 合 同 4.docx',
      },
      {
        id: '98',
        strategy_name: '劳 动 合 同4',
        strategy_desc: '劳 动 合 同 4.docx',
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
