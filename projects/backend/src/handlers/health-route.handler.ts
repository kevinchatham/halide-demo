type HealthResponse = {
  status: string;
};

export async function healthRouteHandler(): Promise<HealthResponse> {
  return { status: 'ok' };
}
