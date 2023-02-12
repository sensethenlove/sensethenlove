import sign from '$lib/security/sign'
import type { Actions } from './$types'
import verify from '$lib/security/verify'
import type { Source } from '$lib/util/types'
import type { PageServerLoad } from './$types'
import importKey from '$lib/security/importKey'
// import findFirstSource from '$lib/prisma/findFirstSource'
import newsletterSignUp from '$lib/actions/newsletterSignUp'
import { JWK_FOR_REFRESH_TOKEN_PUBLIC, JWK_FOR_REFRESH_TOKEN_PRIVATE } from '$env/static/private'


export const load = (async () => {
  try {
    const expiredToken = 'eyJhbGciOiJFQ0RTQSIsInR5cCI6IkpXVCIsImV4cCI6MTY3NjE4NTcxMn0=.eyJ1c2VySWQiOiJjaHJpcyIsImlwQWRkcmVzcyI6Ijo6MSJ9.6LIgV2L/IwfaAruBo5N6JIs6KlUrADN4BzucEsnt42tAjt9TrFwCglEPoCD6Q7GfbBaREbtk1Q+AJHimNHBMtA=='
    const freshToken = await sign(await importKey(JSON.parse(JWK_FOR_REFRESH_TOKEN_PRIVATE), true), { userId: 'chris', ipAddress: '::1' }, 540)
    const freshTokenResponse = await verify(await importKey(JSON.parse(JWK_FOR_REFRESH_TOKEN_PUBLIC), false), freshToken)
    const expiredTokenResponse = await verify(await importKey(JSON.parse(JWK_FOR_REFRESH_TOKEN_PUBLIC), false), expiredToken)

    return {
      freshTokenResponse,
      expiredTokenResponse,
    }
  } catch (error) {
    return { error: error?.toString() }
  }
}) satisfies PageServerLoad


export const actions = {
  newsletterSignUp
} satisfies Actions


function sourceToResponse(source: Source | null) {
  if (source) {
    let sourceCategories = new Map() // use map so duplicates are removed

    for (const quote of source.favoriteQuotes) {
      for (const category of quote.categories) {
        sourceCategories.set(category.id, category) // place each category in map
      }
    }

    source.categories = [...sourceCategories.values()].sort((a, b) => Number(a.name > b.name) - Number(a.name < b.name)) // set source categories AND sort them by name
  }

  return { source } // response
}
