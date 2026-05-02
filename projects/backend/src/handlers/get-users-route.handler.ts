import { userStore } from '../data/store';

export async function getUsersRouteHandler() {
  return userStore;
}
