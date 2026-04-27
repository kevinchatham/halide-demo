/**
 * Demo bearer secret for local development and testing.
 *
 * @remarks
 * In production, this value should be retrieved from a secure vault
 * (e.g., AWS Secrets Manager, HashiCorp Vault) and never stored in source control.
 */
export const DEMO_BEARER_SECRET = 'this-is-a-super-secure-secret-demo-use-only';

/**
 * Demo bearer audience identifier for local development and testing.
 */
export const DEMO_BEARER_AUDIENCE = 'halide-demo';
