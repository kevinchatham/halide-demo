import { apiRoute } from 'halide';

export const healthRoute = apiRoute({
  access: 'public',
  handler: async () => ({ status: 'ok' }),
  method: 'get',
  path: '/health',
});
