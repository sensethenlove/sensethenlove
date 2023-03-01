import { PUBLIC_ENVIRONMENT } from '$env/static/public'
import { QA_PLANETSCALE_URL, QA_PRISMA_URL, PROD_PLANETSCALE_URL, PROD_PRISMA_URL } from '$env/static/private'


// Prisma Recommendation: "Your application should generally only create one instance of PrismaClient": https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client
// Prisma Suggestion: https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
export default async () => {
  if (PUBLIC_ENVIRONMENT === 'local') {
    if (global.prisma) return global.prisma // Typically module code runs once on the server but w/ HMR in development module code is run multiple times so in develpment add prisma to global so new PrismaClient() which creates a connection pool on each call is not called multiple times
    else {
      const client = await import('@prisma/client')
      global.prisma = new client.PrismaClient({ // https://github.com/prisma/prisma/issues/13771#issuecomment-1204295665
        datasources: {
          db: {
            url: QA_PLANETSCALE_URL
            // url: PROD_PLANETSCALE_URL
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
          url: QA_PRISMA_URL
          // url: PROD_PRISMA_URL
        }
      }
    })
  }
}
