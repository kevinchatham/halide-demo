import { createServer } from './app/builder';
import { config } from './app/config';

const server = createServer(config);

server.start();
