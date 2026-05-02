import { createServer } from 'halide';
import { config } from './server/config';

const server = createServer(config);

server.start((port) => {
  console.log(`Server running on port ${port}`);
});
