import { PrismaClient } from '@prisma/client/edge'
import { PUBLIC_ENVIRONMENT } from '$env/static/public'


// Typically module code is run once on the server but w/ HMR in development module code is run multiple times so in develpment add prisma to global so new PrismaClient() which creates a connection pool on each call is not called multiple times
// Prisma Recommendation: "Your application should generally only create one instance of PrismaClient": https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client
// Prisma Suggestion: https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
if (PUBLIC_ENVIRONMENT === 'development' && !global.prisma) global.prisma = new PrismaClient()

export default PUBLIC_ENVIRONMENT === 'development' ?
  global.prisma :
  new PrismaClient()
