import type { // Import Prisma Types + Prisma Client
  PrismaClient,
  Quote as QuotePrisma,
  Source as SourcePrisma,
  Author as AuthorPrisma,
  Session as SessionPrisma,
  SiteComment as SiteCommentPrisma,
  QuoteCategory as QuoteCategoryPrisma,
  User as UserPrisma,
  Post as PostPrisma,
} from '@prisma/client'


/**
 * Add frontend properties to Prisma Types
 * For some reason properties defined as a one to many or many to many in schema.prisma do not show up here, so we must include them here too
 */
export interface Source extends SourcePrisma {
  authors: Author[] // schema.prisma property
  favoriteQuotes: Quote[] // schema.prisma property
  categories?: QuoteCategory[]
}

export interface User extends UserPrisma {}
export interface SiteComment extends SiteCommentPrisma { }
export interface Post extends PostPrisma { }

export interface Session extends SessionPrisma {
  user?: User // schema.prisma property
}

export interface Author extends AuthorPrisma {
  isLoading?: boolean
}

export interface Quote extends QuotePrisma {
  favoriteQuotes?: Quote[]
  categories: QuoteCategory[] // schema.prisma property
}

export interface QuoteCategory extends QuoteCategoryPrisma {
  quotes?: Quote[] // schema.prisma property
  isLoading?: boolean
}


declare global { // Node global types
  var prisma: PrismaClient // For /$lib/util/prisma.ts

  interface Window { // Browser window types
    turnstile: { // For Cloudflare Turnstile
      render: (element: string | HTMLElement, options: TurnstileOptions) => string;
      remove: (widgetId: string) => void;
    },
    closeToast: (id: string) => void // For /$lib/util/toast.ts
  }
}

/**
 * Types for Cloudflare Turnstile
 */
interface TurnstileOptions {
  sitekey: string;
}

export type TurnstileTokenValidateResponse = {
  'error-codes': string[]
  success: boolean
  action: string
  cdata: string
}

/**
 * Types for our Form.svelte component
 */
export type FormFields = {
  [k: string]: FormDataEntryValue
}

export type FormOnSuccess = ({ fields, data }: { fields: FormFields, data: any }) => string

export type FormInput = {
  name: string,
  label?: string,
  type?: 'checkbox' | 'email' | 'textarea' | 'image' | 'text' | 'content-editable',
  value?: string | null,
  checkboxValue?: boolean,
  hidden?: boolean,
  serverImageId?: string | null,
  maxWidth?: string,
}

export type FormInputs = Array<FormInput | Array<FormInput>>


/**
 * Types for $lib/security
 */
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
