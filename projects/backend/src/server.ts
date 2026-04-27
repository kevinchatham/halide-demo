import { apiRoute, createServer } from 'halide';

const server = createServer({
  apiRoutes: [
    apiRoute({
      access: 'public',
      handler: async () => ({ status: 'ok' }),
      method: 'get',
      path: '/health',
    }),
  ],
  spa: {
    name: 'backend',
    port: 3000,
    root: 'public',
  },
});

server.start((port) => {
  console.log(`Server running on port ${port}`);
});
