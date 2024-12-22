export default {
  'GET /api/scenario/list': {
    data: [
      {
        id: '35202700-88ab-423c-aa22-4594640084da',
        scenario_name: '通用合同',
      },
      {
        id: '96',
        scenario_name: '保证合同',
      },
      {
        id: '97',
        scenario_name: '软件开发服务协议',
      },
      {
        id: '98',
        scenario_name: '离婚协议',
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

  'POST /api/scenario/add': {
    success: true,
  },
};
