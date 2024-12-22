// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type File = {
    id: string;
    name: string;
  };

  type ContractListItem = {
    id: string;
    amount: string;
    contract_name: string;
    stage_code: string;
    parse_status: string;
    created_at: string;
    contract_type: string;
    start_date: string;
    end_date: string;
    file_list: File[];
    parties: {
      party_a: string;
      party_b: string;
      party_c: string;
    };
  };
  type ContractList = {
    data?: ContractListItem[];
    total?: number;
    success?: boolean;
  };

  type ContractType = {
    id: string;
    contract_type: string;
  };

  type ContractTypeList = {
    data?: ContractType[];
  };

  type AnalysisListItem = {
    id: string;
    contract_name: string;
    file_name: string;
    contract_party: string;
    status: string;
    created_at: string;
    review_conclusion: string;
    finish_time: string;
    review_score: Array<{
      score: number;
      type: string;
    }>;
  };

  type AnalysisList = {
    data?: AnalysisListItem[];
    total?: number;
    success?: boolean;
  };

  type StrategyItem = {
    id: string;
    strategy_name: string;
    strategy_desc: string;
  };

  type StrategyList = {
    data?: StrategyItem[];
  };

  type ScenarioItem = {
    id: string;
    scenario_name: string;
  };

  type ScenarioList = {
    data?: ScenarioItem[];
  };
}
