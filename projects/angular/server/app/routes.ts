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
  proxyPath: '/api',
  target: 'http://localhost:3000',
  transform: ({ method, body, headers }) => ({
    body: ['get', 'head'].includes(method) ? undefined : body,
    headers: { ...headers, 'x-source': 'bff' },
  }),
});

export const apiRoutes: ApiRoute[] = [healthRoute];
export const proxyRoutes: ProxyRoute[] = [backendProxyRoute];
