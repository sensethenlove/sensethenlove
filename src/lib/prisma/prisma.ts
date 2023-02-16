import env from '$lib/security/env'


// Prisma Recommendation: "Your application should generally only create one instance of PrismaClient": https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client
// Prisma Suggestion: https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
export default async () => {
  if (await env.get('ENVIRONMENT') === 'development') {
    if (global.prisma) return global.prisma // Typically module code runs once on the server but w/ HMR in development module code is run multiple times so in develpment add prisma to global so new PrismaClient() which creates a connection pool on each call is not called multiple times
    else {
      const client = await import('@prisma/client')
      global.prisma = new client.PrismaClient({ // https://github.com/prisma/prisma/issues/13771#issuecomment-1204295665
        datasources: {
          db: {
            url: await env.get('DEV_DATABASE_URL')
          }
        }
      })
      return global.prisma
    }
  } else {
    const client = await import('@prisma/client/edge') // https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers + https://www.prisma.io/docs/data-platform/data-proxy
    return new client.PrismaClient({ // https://github.com/prisma/prisma/issues/13771#issuecomment-1204295665
      datasources: {
        db: {
          url: await env.get('PRISMA_DATABASE_URL')
        }
      }
    })
  }
}
