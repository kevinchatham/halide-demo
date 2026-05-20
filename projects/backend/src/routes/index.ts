import { createUserRoute } from './create-user';
import { deleteUserRoute } from './delete-user';
import { getUserByIdRoute } from './get-user-by-id';
import { getUsersRoute } from './get-users';
import { healthRoute } from './health';
import { loginRoute } from './login';
import { updateUserRoute } from './update-user';

export const apiRoutes = [
  healthRoute,
  loginRoute,
  getUsersRoute,
  getUserByIdRoute,
  createUserRoute,
  updateUserRoute,
  deleteUserRoute,
];
