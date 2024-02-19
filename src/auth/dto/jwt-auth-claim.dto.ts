/**
 * @deprecated use AccessTokenClaim
 */
export type JWTAuthClaim = {
  uid: string;
  roles: string[];
};

export type AccessTokenClaim = {
  uid: string;
};

export type RefreshTokenClaim = {
  uid: string;
};
