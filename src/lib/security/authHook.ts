import type { Session } from '$lib/util/types'
import authRoutes from '$lib/security/authRoutes'
import createToken from '$lib/security/createToken'
import verifyToken from '$lib/security/verifyToken'
import unAuthRoutes from '$lib/security/unAuthRoutes'
import updateSession from '$lib/prisma/updateSession'
import findFirstSession from '$lib/prisma/findFirstSession'
import { redirect, type RequestEvent } from '@sveltejs/kit'
import { VerifyTokenError, VerifyTokenExpiredError } from '$lib/util/errors'
import setAccessAndRefreshCookies from '$lib/cookies/setAccessAndRefreshCookies'
import deleteAccessAndRefreshCookies from '$lib/cookies/deleteAccessAndRefreshCookies'
import viaCookiesGetAccessAndRefreshTokens from '$lib/cookies/viaCookiesGetAccessAndRefreshTokens'
import viaCookiesOrRefreshTokenDeleteSession from '$lib/cookies/viaCookiesOrRefreshTokenDeleteSession'


export default async (event: RequestEvent): Promise<RequestEvent> => {
  const { accessToken, refreshToken } = viaCookiesGetAccessAndRefreshTokens(event.cookies)

  if (refreshToken) {
    if (!accessToken) await onAccessTokenExpired(event, refreshToken)
    else {
      try {
        const { sessionId  } = await verifyToken('access', accessToken)

        if (!sessionId) await signThemOut(event, refreshToken) // if no sessionId found in token => sign them out
        else {
          const session = await findFirstSession(sessionId) // find session based on access token

          if (!session) deleteAccessAndRefreshCookies(event.cookies) // if session not found, this is a signed out user so => delete cookies
          else event.locals.userId = session.userId // session found so add userId to locals so server code down stream may access it
        }
      } catch (error) {
        console.log(error)
        if (error instanceof VerifyTokenExpiredError) await onAccessTokenExpired(event, refreshToken) // if access token is expired
        else if (error instanceof VerifyTokenError) await signThemOut(event, refreshToken)  // if access token error is not a token expired error => sign them out
      }
    }
  }

  return validateCurrentUserMayViewCurrentRoute(event)
}


async function onAccessTokenExpired (event: RequestEvent, refreshToken: string): Promise<void> {
  try {
    const { sessionId } = await verifyToken('refresh', refreshToken) // verify the refresh token

    if (sessionId) { // if refresh token is good
      const session = await findFirstSession(sessionId) // find session in db based on refreshToken
      if (!session) deleteAccessAndRefreshCookies(event.cookies) // if we can't find a session aligned w/ this refresh token -> this is a signed out user so delete their current cookies
      else await createNewSessionTokenAndCookies(event, session) // session found => create new session, tokens, cookies
    }
  } catch (e) {
    console.log(e)
    if (e instanceof VerifyTokenError) await signThemOut(event, refreshToken) // if refreshToken has an error this is a signed out user so => sign them out
  }
}


function validateCurrentUserMayViewCurrentRoute (event: RequestEvent): RequestEvent {
  if (event.locals.userId) { // if a user is authenticated
    for (const route of unAuthRoutes) {
      if (event.request.url.includes(route[0])) throw redirect(303, route[1]) // if request url is a route that requires unautentication => redirect to set location
    }
  } else { // if a user is unauthenticated
    for (const route of authRoutes) {
      if (event.request.url.includes(route[0])) throw redirect(303, route[1]) // if request url is a route that requires autentication => redirect to set location
    }
  }

  return event
}


async function signThemOut (event: RequestEvent, refreshToken: string): Promise<void> {
  try {
    await viaCookiesOrRefreshTokenDeleteSession({ refreshToken }) // delete their session 
    deleteAccessAndRefreshCookies(event.cookies) // delete their cookies 
  } catch (error) {
    console.log(error)
  }
}


async function createNewSessionTokenAndCookies (event: RequestEvent, session: Session): Promise<void> {
  const payload = { userId: session.userId, sessionId: session.id }
  const [ accessToken, refreshToken ] = await Promise.all([ createToken('access', payload), createToken('refresh', payload) ]) // create new auth tokens for this user

  await updateSession(session.id, event.getClientAddress()) // update session with their most recent ip address
  setAccessAndRefreshCookies(event.cookies, accessToken, refreshToken) // set auth cookies w/ newly created tokens
  event.locals.userId = session.userId // add userId to locals so server code down stream may access it
}
