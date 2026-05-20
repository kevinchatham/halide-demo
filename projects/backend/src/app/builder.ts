import { defineHalide } from 'halide';
import type { App } from 'shared';

export const { apiRoute, createServer } = defineHalide<App>();
