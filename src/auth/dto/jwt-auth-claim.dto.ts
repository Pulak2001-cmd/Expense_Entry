/**
 * @deprecated use AccessTokenClaim
 */
export type JWTAuthClaim = {
  uid: string;
  roles: string[];
};

export type AccessTokenClaim = JWTAuthClaim;

export type RefreshTokenClaim = {
  uid: string;
};
