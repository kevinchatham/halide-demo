import { type ApiRoute, apiRoute, type ProxyRoute, proxyRoute, type THalideApp } from 'halide';
import { type Claims, type HealthResponse, HealthResponseSchema, healthRouteHandler } from 'shared';

type App = THalideApp<Claims>;

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

export const apiRoutes: ApiRoute<App>[] = [healthRoute];

export const proxyRoutes: ProxyRoute<App>[] = [backendProxyRoute];
