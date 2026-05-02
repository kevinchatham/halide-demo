export const API_BASE = '/api';

export const routes = {
  docs: `/docs`,
  health: `${API_BASE}/health`,
  login: `${API_BASE}/login`,
  userById: (id: string | number) => `${API_BASE}/users/${id}`,
  users: `${API_BASE}/users`,
} as const;
