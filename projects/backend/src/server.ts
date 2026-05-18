import { defineHalide } from 'halide';
import type { App } from 'shared';
import { config } from './app/config';

const { createServer } = defineHalide<App>();

const server = createServer(config);

server.start();
