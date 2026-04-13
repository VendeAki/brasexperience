export interface AuthSession {
  userId: string;
  roles: string[];
}

export interface AuthStrategy {
  verifyAccessToken(token: string): Promise<AuthSession | null>;
}
