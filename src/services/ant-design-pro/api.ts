// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/user-service/getUserDetail', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams) {
  return request('/api/user-service/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

export async function regist(body: API.LoginParams) {
  return request<API.LoginResult>('/api/user-service/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 /api/rule */
export async function updateRule(id: string, options?: { [key: string]: any }) {
  return request(`/api/rule/${id}`, {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request('/api/rule_add', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

/** 获取合同列表 GET /api/contract */
export async function contract(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.ContractList>('/api/contract', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function contractDetail(id: string) {
  return request<API.ContractListItem>(`/api/contract/${id}`, {
    method: 'GET',
  });
}

export async function updateContract(id: string, options?: { [key: string]: any }) {
  return request(`/api/contract/${id}`, {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

export async function removeContract(id: string) {
  return request<Record<string, any>>(`/api/contract/${id}`, {
    method: 'DELETE',
  });
}

/** 获取审查结果列表 GET /api/analysis */
export async function analysis(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.AnalysisList>('/api/analysis', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function analysisDetail(id: string) {
  return request<API.AnalysisListItem>(`/api/analysis/${id}`, {
    method: 'GET',
  });
}

/**
 * 合同类型列表
 */
export async function contractTypeList() {
  return request<API.ContractTypeList>('/api/contract_type/list', {
    method: 'GET',
  });
}

/**
 * 获取策略列表
 */
export async function strategyList() {
  return request<API.StrategyList>('/api/strategy/list', {
    method: 'GET',
  });
}

/**
 * 获取规则列表
 */
export async function scenarioList() {
  return request<API.ScenarioList>('/api/scenario/list', {
    method: 'GET',
  });
}

/**
 * 某个规则集的全部规则
 */
export async function ruleList(id: string) {
  return request<API.RuleList>('/api/rule/list', {
    method: 'GET',
    params: {
      id,
    },
  });
}

/**
 * 删除规则
 */
export async function removeRule(id: string) {
  return request<Record<string, any>>(`/api/rule/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 规则类型列表
 */
export async function ruleTypeList() {
  return request<API.RuleTypeList>('/api/rule_type/list', {
    method: 'GET',
  });
}

/**
 * 新增策略
 */
export async function strategyAdd(options?: { [key: string]: any }) {
  return request('/api/strategy/add', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

/**
 * 修改策略
 */
export async function strategyUpdate(id: string, options?: { [key: string]: any }) {
  return request(`/api/strategy/${id}`, {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

export async function strategyDetail(id: string) {
  return request<API.StrategyItem>(`/api/strategy/${id}`, {
    method: 'GET',
  });
}

/**
 * 新增规则
 */
export async function scenarioAdd(options?: { [key: string]: any }) {
  return request('/api/scenario/add', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

/**
 * 上传文件
 */
export async function uploadContract(file: File) {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  return request('/api/contract/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
  });
}
