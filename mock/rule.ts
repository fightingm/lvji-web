export default {
  'GET /api/rule/list': {
    data: [
      {
        id: 'xxxx',
        rule_name: '争议解决条款',
        rule_desc:
          '确定合同中规定的争议解決方式（如仲裁、诉讼），以及争议解决的地点和适用法律是否明确。',
        created_by: '审查通用条款的常见风险',
        risk_level: '1',
        rule_type: '3333',
      },
      {
        id: '1111',
        rule_name: '争议解决条款',
        rule_desc:
          '确定合同中规定的争议解決方式（如仲裁、诉讼），以及争议解决的地点和适用法律是否明确。',
        created_by: '审查通用条款的常见风险',
        risk_level: '2',
        rule_type: '2222',
      },
      {
        id: '2222',
        rule_name: '合同标的合规',
        rule_desc:
          '确定合同中规定的争议解決方式（如仲裁、诉讼），以及争议解决的地点和适用法律是否明确。',
        created_by: '审查通用条款的常见风险',
        risk_level: '3',
        rule_type: '1111',
      },
      {
        id: '3333',
        rule_name: '保密条款',
        rule_desc:
          '确定合同中规定的争议解決方式（如仲裁、诉讼），以及争议解决的地点和适用法律是否明确。',
        created_by: '审查通用条款的常见风险',
        risk_level: '1',
        rule_type: 'xxxx',
      },
    ],
    total: 100,
    success: true,
    pageSize: 20,
    current: 1,
  },

  'DELETE /api/rule/:id': {
    success: true,
  },

  'POST /api/rule/:id': {
    success: true,
  },
  'POST /api/rule_add': {
    success: true,
  },

  'GET /api/rule_type/list': {
    data: [
      {
        id: 'xxxx',
        rule_type: '争议解决条款',
      },
      {
        id: '1111',
        rule_type: '争议解决条款',
      },
      {
        id: '2222',
        rule_type: '合同标的合规',
      },
      {
        id: '3333',
        rule_type: '保密条款',
      },
    ],
  },
};
