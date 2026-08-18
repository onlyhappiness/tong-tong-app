import { API_URL } from '@/api/config';

type SuccessEnvelope<T> = { success: true; data: T; timestamp: string };
type ErrorEnvelope = {
  success: false;
  code: number;
  data: string | string[];
  path: string;
  method: string;
  timestamp: string;
};

export class ApiError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    });
  } catch {
    throw new ApiError(0, '연결 실패, 다시 시도해주세요.');
  }

  const body = (await response.json()) as SuccessEnvelope<T> | ErrorEnvelope;

  if (!body.success) {
    const message = Array.isArray(body.data) ? body.data.join(', ') : body.data;
    throw new ApiError(body.code, message);
  }

  return body.data;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, payload?: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: payload !== undefined ? JSON.stringify(payload) : undefined,
    }),
};
