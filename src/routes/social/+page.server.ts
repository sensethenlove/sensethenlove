import search from '$lib/actions/search'
import findManyPosts from '$lib/prisma/findManyPosts'
import type { Actions, PageServerLoad } from './$types'


export const load = (async () => {
  return { posts: findManyPosts() }
}) satisfies PageServerLoad


export const actions = {
  search,
} satisfies Actions
