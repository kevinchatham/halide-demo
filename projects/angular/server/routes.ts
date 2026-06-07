import { defineHalide } from 'halide';
import {
  type App,
  type HealthResponse,
  HealthResponseSchema,
  healthRouteHandler,
  routes,
} from 'shared';

const { apiRoute, proxyRoute } = defineHalide<App>();

const healthRoute = apiRoute<unknown, HealthResponse>({
  access: 'public',
  handler: healthRouteHandler,
  method: 'get',
  path: routes.bffHealth,
  responseSchema: HealthResponseSchema,
});

export const backendProxyRoute = proxyRoute({
  access: 'public',
  methods: ['get', 'post', 'put', 'patch', 'delete'],
  openapiSpec: {
    path: 'http://localhost:3000/bff/docs/openapi.json',
  },
  path: '/api/*',
  proxyPath: '/api',
  target: 'http://localhost:3000',
  transform: ({ method, body, headers }) => ({
    body: ['get', 'head'].includes(method) ? undefined : body,
    headers: { ...headers, 'x-source': 'bff' },
  }),
});

export const apiRoutes = [healthRoute];

export const proxyRoutes = [backendProxyRoute];
