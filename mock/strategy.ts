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
  'GET /api/strategy/:id': {
    data: {
      id: '1c020981-ae04-4ac1-b306-2e90b0ae9752',
      strategy_desc: '合同内容较为全面，符合中国法律规定，但需注意部分条款的具体执行。',
      strategy_name: '合同内容',
      rule_list: [
        {
          id: '1111',
          rule_name: '明确合同',
          rule_desc: '明确合同履行的各关键节点时间、具体条件等，确保',
          created_by: 'system',
          risk_level: 'MEDIUM',
          rule_type: '审查通用条款的常见风险 ',
          rule_type_id: 4,
        },
        {
          id: '2222',
          rule_name: '履行期限',
          rule_desc: '明确合同履行的各关键节点时间、具体条件等，确保',
          created_by: 'system',
          risk_level: 'MEDIUM',
          rule_type: '审查通用条款的常见风险 ',
          rule_type_id: 4,
        },
        {
          id: '3333',
          rule_name: '关键节点',
          rule_desc: '明确合同履行的各关键节点时间、具体条件等，确保',
          created_by: 'system',
          risk_level: 'MEDIUM',
          rule_type: '审查通用条款的常见风险 ',
          rule_type_id: 4,
        },
      ],
    },
  },
  'DELETE /api/analysis/:id': {
    success: true,
  },
  'POST /api/strategy/:id': {
    success: true,
  },
  'POST /api/strategy/add': {
    success: true,
  },
};
