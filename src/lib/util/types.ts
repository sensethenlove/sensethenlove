import type { // Import Prisma Types + Prisma Client
  PrismaClient,
  Quote as QuotePrisma,
  Source as SourcePrisma,
  Author as AuthorPrisma,
  Session as SessionPrisma,
  SiteComment as SiteCommentPrisma,
  QuoteCategory as CategoryPrisma,
  User as UserPrisma,
  Post as PostPrisma,
  Image as ImagePrisma,
} from '@prisma/client'


/**
 * Add frontend properties to Prisma Types
 * For some reason properties defined as a one to many or many to many in schema.prisma do not show up here, so we must include them here too
 */
export interface Source extends SourcePrisma {
  authors?: Author[] // schema.prisma property
  favoriteQuotes?: Quote[] // schema.prisma property
  categories?: Category[], // schema.prisma property
  images?: Image[], // schema.prisma property
}
export type SourceType = 'science' | 'culture' | 'product' | undefined

export interface Image extends ImagePrisma { }
export interface User extends UserPrisma {}
export interface SiteComment extends SiteCommentPrisma { }
export interface Post extends PostPrisma { }

export interface Session extends SessionPrisma {
  user?: User // schema.prisma property
}

export interface Author extends AuthorPrisma {
  href?: string
  isLoading?: boolean
}

export interface Quote extends QuotePrisma {
  favoriteQuotes?: Quote[]
  categories?: Category[] // schema.prisma property
}

export interface Category extends CategoryPrisma {
  quotes?: Quote[] // schema.prisma property
  isLoading?: boolean
  href?: string
}



declare global { // Node global types
  var prisma: PrismaClient // For /$lib/util/prisma.ts

  interface Window { // Browser window types
    turnstile: { // For Cloudflare Turnstile
      render: (element: string | HTMLElement, options: TurnstileOptions) => string;
      remove: (widgetId: string) => void;
    },
    closeToast: (toast: HTMLElement) => void // For /$lib/util/toast.ts
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

export type FormOnSuccess = ({ fields, data }: { fields: FormFields, data: any }) => void
export type FormToastOnSuccess = ({ fields, data }: { fields: FormFields, data: any }) => string
export type FormOnSubmitValidate = (fields: FormFields) => boolean

export type FormInput = {
  name: string,
  label?: string,
  type?: 'checkbox' | 'email' | 'textarea' | 'image' | 'text' | 'content-editable',
  value?: string | null,
  checkboxValue?: boolean,
  hidden?: boolean,
  serverImageId?: string | null,
  maxWidth?: string,
  focusOnInit?: boolean,
  autocomplete?: string,
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

export type HideModal = () => void
export type OnModalHide = () => void
export type ShowModal = () => void

export type SearchQuotesByTextResponse = (Quote & {
  Source: Source;
  categories: Category[];
})[]
