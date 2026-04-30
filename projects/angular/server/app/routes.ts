import { type ApiRoute, apiRoute, type ProxyRoute, proxyRoute } from 'halide';
import {
  type HealthResponse,
  HealthResponseSchema,
  healthRouteHandler,
} from '../handlers/health-route.handler';

const healthRoute = apiRoute<unknown, unknown, HealthResponse>({
  access: 'public',
  handler: healthRouteHandler,
  method: 'get',
  path: '/bff/health',
  responseSchema: HealthResponseSchema,
});

export const backendProxyRoute = proxyRoute({
  access: 'public',
  methods: ['get', 'post', 'put', 'patch', 'delete'],
  path: '/api/*',
  proxyPath: '/',
  target: 'http://localhost:3000',
});

// biome-ignore lint/suspicious/noExplicitAny: group
export const apiRoutes: ApiRoute<any, any>[] = [healthRoute];
// biome-ignore lint/suspicious/noExplicitAny: group
export const proxyRoutes: ProxyRoute<any>[] = [backendProxyRoute];
