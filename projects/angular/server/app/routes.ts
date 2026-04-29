import { type ApiRoute, apiRoute } from 'halide';
import {
  type HealthResponse,
  HealthResponseSchema,
  healthRouteHandler,
} from '../handlers/health-route.handler';

const healthRoute = apiRoute<unknown, unknown, HealthResponse>({
  access: 'public',
  handler: healthRouteHandler,
  method: 'get',
  path: '/api/health',
  responseSchema: HealthResponseSchema,
});

// biome-ignore lint/suspicious/noExplicitAny: group
export const apiRoutes: ApiRoute<any, any>[] = [healthRoute];
