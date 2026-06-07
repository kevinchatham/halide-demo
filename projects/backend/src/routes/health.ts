import type { HealthResponse } from 'shared';
import { HealthResponseSchema } from 'shared';
import { apiRoute } from '../app/builder';

export const healthRoute = apiRoute<void, HealthResponse>({
  access: 'public',
  path: '/api/health',
  responseSchema: HealthResponseSchema,
  handler: async () => ({ status: 'ok' }),
});
