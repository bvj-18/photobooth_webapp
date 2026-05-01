import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { loginRequest, signupRequest } from './authApi';
import type { AuthSession, AuthUser, LoginInput, SignupInput } from './authTypes';

const AUTH_STORAGE_KEY = 'photobooth.auth.session';

type AuthStatus = 'loading' | 'authenticated' | 'anonymous';

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredSession(): AuthSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    const parsedSession = JSON.parse(rawSession) as Partial<AuthSession>;

    if (!parsedSession.user || !parsedSession.token) {
      return null;
    }

    return {
      user: parsedSession.user,
      token: parsedSession.token,
    };
  } catch {
    return null;
  }
}

function persistSession(session: AuthSession | null) {
  if (typeof window === 'undefined') {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    const storedSession = readStoredSession();
    setSession(storedSession);
    setStatus(storedSession ? 'authenticated' : 'anonymous');
  }, []);

  const setAuthenticatedSession = (nextSession: AuthSession) => {
    setSession(nextSession);
    setStatus('authenticated');
    persistSession(nextSession);
  };

  const clearSession = () => {
    setSession(null);
    setStatus('anonymous');
    persistSession(null);
  };

  const authValue = useMemo<AuthContextValue>(() => {
    return {
      user: session?.user ?? null,
      token: session?.token ?? null,
      status,
      isAuthenticated: status === 'authenticated',
      login: async (input) => {
        const nextSession = await loginRequest(input);
        setAuthenticatedSession(nextSession);
      },
      signup: async (input) => {
        const nextSession = await signupRequest(input);
        setAuthenticatedSession(nextSession);
      },
      logout: async () => {
        clearSession();
      },
    };
  }, [session, status]);

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}