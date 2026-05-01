export type AuthUser = {
  id?: string;
  name: string;
  email: string;
};

export type AuthSession = {
  user: AuthUser;
  token: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type SignupInput = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  user?: AuthUser;
  token?: string;
  accessToken?: string;
  data?: {
    user?: AuthUser;
    token?: string;
    accessToken?: string;
  };
};