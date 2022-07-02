
export interface AccessTokenPayload {
  auth_key: string;
}

export interface RefreshTokenPayload {
  adminId: number;
  tokenVersion: number;
}
