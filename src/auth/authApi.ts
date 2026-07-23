import type { AuthResponse, LoginInput, SignupInput, AuthSession } from './authTypes';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim() || 'https://photobooth-webapp.onrender.com';

class AuthApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'AuthApiError';
  }
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

function getMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== 'object') {
    return fallback;
  }

  const typedPayload = payload as Record<string, unknown>;
  const message = typedPayload.message ?? typedPayload.error ?? typedPayload.detail;

  if (typeof message === 'string' && message.trim()) {
    return message;
  }

  if (typeof typedPayload.errors === 'string' && typedPayload.errors.trim()) {
    return typedPayload.errors;
  }

  return fallback;
}

function extractSession(payload: unknown): AuthSession {
  if (!payload || typeof payload !== 'object') {
    throw new AuthApiError('Unexpected auth response from server.');
  }

  const typedPayload = payload as AuthResponse;
  const nestedPayload = typedPayload.data ?? {};
  const user = typedPayload.user ?? nestedPayload.user;
  const token = typedPayload.token ?? typedPayload.accessToken ?? nestedPayload.token ?? nestedPayload.accessToken;

  if (!user || !token) {
    throw new AuthApiError('Auth response is missing user or token data.');
  }

  return {
    user,
    token,
  };
}

async function requestAuth<TInput extends LoginInput | SignupInput>(path: string, input: TInput) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    throw new AuthApiError(getMessage(payload, 'Authentication request failed.'), response.status);
  }

  return extractSession(payload);
}

export async function loginRequest(input: LoginInput) {
  return requestAuth('/auth/login', input);
}

export async function signupRequest(input: SignupInput) {
  return requestAuth('/auth/signup', input);
}

export { AuthApiError };