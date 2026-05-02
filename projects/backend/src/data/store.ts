import type { CreateUserRequest, UpdateUserRequest, UserResponse } from 'shared';

export const userStore: UserResponse[] = [
  { email: 'alice@example.com', id: 1, name: 'Alice' },
  { email: 'bob@example.com', id: 2, name: 'Bob' },
  { email: 'charlie@example.com', id: 3, name: 'Charlie' },
];

function* generateUserId(): Generator<number, number, unknown> {
  let nextId = 4;
  while (true) {
    yield nextId++;
  }
}

const userIdGenerator = generateUserId();

export function getUserById(id: number): UserResponse | undefined {
  return userStore.find((u) => u.id === id);
}

export function createUser(data: CreateUserRequest): UserResponse {
  const user: UserResponse = { id: userIdGenerator.next().value, ...data };
  userStore.push(user);
  return user;
}

export function updateUser(id: number, data: UpdateUserRequest): UserResponse | undefined {
  const idx = userStore.findIndex((u) => u.id === id);
  if (idx === -1) return undefined;
  userStore[idx] = { ...userStore[idx], ...data };
  return userStore[idx];
}

export function deleteUser(id: number): boolean {
  const idx = userStore.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  userStore.splice(idx, 1);
  return true;
}
