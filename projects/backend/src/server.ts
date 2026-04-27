import { createServer } from 'halide';
import { config } from './app/config';

const server = createServer(config);

server.start((port) => {
  console.log(`Server running on port ${port}`);
});
