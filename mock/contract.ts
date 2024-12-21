export default {
  'GET /api/contract': {
    data: [
      {
        id: 95,
        contract_name: '劳 动 合 同 111',
        stage_code: '1',
        parse_status: 1,
        created_at: '2022-12-06T05:00:57.040Z',
      },
      {
        id: 96,
        contract_name: '劳 动 合 同 2',
        stage_code: '2',
        parse_status: 2,
        created_at: '2022-12-06T05:00:57.040Z',
      },
      {
        id: 97,
        contract_name: '劳 动 合 同 3',
        stage_code: '3',
        parse_status: 3,
        created_at: '2022-12-06T05:00:57.040Z',
      },
      {
        id: 98,
        contract_name: '劳 动 合 同 4',
        stage_code: '4',
        parse_status: 1,
        created_at: '2022-12-06T05:00:57.040Z',
      },
      {
        id: 99,
        contract_name: '劳 动 合 同 5',
        stage_code: '5',
        parse_status: 1,
        created_at: '2022-12-06T05:00:57.040Z',
      },
    ],
    total: 100,
    success: true,
    pageSize: 20,
    current: 1,
  },
  'GET /api/contract/:id': {
    id: 96,
    contract_name: '劳 动 合 同 3232',
    stage_code: 2,
    parse_status: 2,
    created_at: '2022-12-06T05:00:57.040Z',
    contract_type: '劳动合同',
    start_date: '2023-04-03',
    end_date: '2024-04-02',
    amount: 1200,
    file_list: [
      {
        id: 'xxx',
        name: '副本劳 动 合 同 - 副本2.docx',
      },
    ],
    parties: {
      party_a: '四川省鼎艺源贸易有限公司',
      party_b: '四川省xxx有限公司',
      party_c: '四川省xxx公司',
    },
  },
  'DELETE /api/contract/:id': {
    success: true,
  },
  'POST /api/contract/:id': {
    success: true,
  },
};
