import type {
  PrismaClient,
  User as UserPrisma,
  Post as PostPrisma,
  Image as ImagePrisma,
  Quote as QuotePrisma,
  Source as SourcePrisma,
  Author as AuthorPrisma,
  Session as SessionPrisma,
  Category as CategoryPrisma,
  SiteComment as SiteCommentPrisma,
} from '@prisma/client'


declare global { // Node global types
  var prisma: PrismaClient
}


export interface User extends UserPrisma {}
export interface Image extends ImagePrisma {}
export interface SiteComment extends SiteCommentPrisma {}
export type SourceType = 'science' | 'culture' | 'product' | undefined


// For some reason properties defined as a one to many or many to many in schema.prisma do not show up here, so we must include them below


export interface Source extends SourcePrisma {
  authors?: Author[] // schema.prisma property
  favoriteQuotes?: Quote[] // schema.prisma property
  categories?: Category[], // schema.prisma property
  images?: Image[], // schema.prisma property
}


export interface Post extends PostPrisma {
  creator: User // schema.prisma property
  images: Image[] // schema.prisma property
}


export interface Session extends SessionPrisma {
  user?: User // schema.prisma property
}


export interface Author extends AuthorPrisma {
  href?: string
  isLoading?: boolean
  lowName?: string
}


export interface Quote extends QuotePrisma {
  favoriteQuotes?: Quote[]
  categories?: Category[] // schema.prisma property
}


export interface Category extends CategoryPrisma {
  quotes?: Quote[] // schema.prisma property
  isLoading?: boolean
  href?: string
  lowName?: string
}


export type SearchQuotesByTextResponse = (Quote & {
  Source: Source;
  categories: Category[];
})[]
