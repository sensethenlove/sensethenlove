interface TokenBasic { userId: string } // https://stackoverflow.com/a/61281828
interface TokenWithIPAddress extends TokenBasic { signInId: string, sessionId?: never }
interface TokenWithSessionId extends TokenBasic { sessionId: string, signInId?: never }
export type TokenPayload = TokenWithIPAddress | TokenWithSessionId


export type GetTokenResponseData = {
  error?: string,
  token?: string,
}


export type GetTokenResponse = Promise<GetTokenResponseData>


export type SignInEmailTokenPayload = {
  userId: string,
  signInId: string,
}


export type AccessAndRefreshTokenPayload = {
  userId: string,
  sessionId: string,
}


export type VerifySignInEmailTokenResponseData = {
  error?: string,
  userId?: string,
  ipAddress?: string,
}


export type VerifyAccessAndRefreshTokenResponseData = {
  error?: string,
  userId?: string,
  sessionId?: string,
}


export type VerifySignInEmailTokenResponse = Promise<VerifySignInEmailTokenResponseData>
export type VerifyAccessAndRefreshEmailTokenResponse = Promise<VerifyAccessAndRefreshTokenResponseData>
