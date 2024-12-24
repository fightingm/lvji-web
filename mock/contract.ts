export default {
  'GET /api/contract': {
    data: [
      {
        id: 95,
        contract_name: '劳 动 合 同 111',
        stage_code: '1',
        parse_status: 1,
        contract_type: '1',
        amount: 1200,
        created_at: '2022-12-06T05:00:57.040Z',
        start_date: '2023-01-03',
        end_date: '2024-02-02',
      },
      {
        id: 96,
        contract_name: '劳 动 合 同 2',
        stage_code: '2',
        parse_status: 2,
        contract_type: '2',
        created_at: '2022-12-06T05:00:57.040Z',
        start_date: '2023-02-03',
        end_date: '2024-03-02',
      },
      {
        id: 97,
        contract_name: '劳 动 合 同 3',
        stage_code: '3',
        parse_status: 3,
        contract_type: '3',
        created_at: '2022-12-06T05:00:57.040Z',
        start_date: '2023-04-03',
        end_date: '2024-04-02',
      },
      {
        id: 98,
        contract_name: '劳 动 合 同 4',
        stage_code: '4',
        parse_status: 1,
        contract_type: '4',
        created_at: '2022-12-06T05:00:57.040Z',
        start_date: '2023-04-03',
        end_date: '2024-04-02',
      },
      {
        id: 99,
        contract_name: '劳 动 合 同 5',
        stage_code: '5',
        parse_status: 1,
        contract_type: '5',
        created_at: '2022-12-06T05:00:57.040Z',
        start_date: '2023-04-03',
        end_date: '2024-04-02',
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
    contract_type: '1',
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
  'GET /api/contract_type/list': {
    data: [
      {
        id: '1',
        contract_type: '赠与合同',
      },
      {
        id: '2',
        contract_type: '借款合同',
      },
      {
        id: '3',
        contract_type: '租赁合同',
      },
      {
        id: '4',
        contract_type: '融资租赁合同',
      },
      {
        id: '5',
        contract_type: '保理合同',
      },
    ],
  },
  'POST /api/contract/upload': {
    success: true,
  },
};
