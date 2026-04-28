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
  app: {
    name: 'angular',
    port: 3553,
    root: 'dist/angular/browser',
  },
  observability: {
    logger: {
      debug: (...args: unknown[]) => {
        console.log(args);
      },
      error: (...args: unknown[]) => {
        console.log(args);
      },
      info: (...args: unknown[]) => {
        console.log(args);
      },
      warn: (...args: unknown[]) => {
        console.log(args);
      },
    },
  },
});

server.start((port) => {
  console.log(`Server running on port ${port}`);
});
