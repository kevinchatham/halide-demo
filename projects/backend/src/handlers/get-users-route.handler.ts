type User = {
  id: number;
  name: string;
  email: string;
};

export async function getUsersRouteHandler(): Promise<User[]> {
  return [
    { email: 'alice@example.com', id: 1, name: 'Alice' },
    { email: 'bob@example.com', id: 2, name: 'Bob' },
    { email: 'charlie@example.com', id: 3, name: 'Charlie' },
  ];
}
