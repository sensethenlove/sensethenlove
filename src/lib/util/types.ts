import type { // Import Prisma Types + Prisma Client
  PrismaClient,
  Quote as QuotePrisma,
  Source as SourcePrisma,
  Author as AuthorPrisma,
  Session as SessionPrisma,
  SiteComment as SiteCommentPrisma,
  QuoteCategory as QuoteCategoryPrisma,
  PrimaryImage as PrimaryImagePrisma,
  User as UserPrisma,
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

export interface User extends UserPrisma {
  primaryImageBase64?: string
}
export interface SiteComment extends SiteCommentPrisma { }
export interface PrimaryImage extends PrimaryImagePrisma { }

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

export type FormOnSuccess = (fields: FormFields) => string

export type FormInput = {
  name: string,
  label?: string,
  type?: 'checkbox' | 'email' | 'textarea' | 'image' | 'text',
  value?: string | null,
  checkboxValue?: boolean,
  hidden?: boolean,
  serverBase64?: string | null
}

export type FormInputs = Array<FormInput | Array<FormInput>>


/**
 * Types for $lib/tokens
 */
export type GetTokenResponseData = {
  error?: string,
  token?: string,
}

export type GetTokenResponse = Promise<GetTokenResponseData>

export type SignInEmailTokenPayload = {
  userId: string,
  ipAddress: string,
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
