declare global { // Node global types
  interface Window { // Browser window types
    turnstile: { // For Cloudflare Turnstile
      render: (element: string | HTMLElement, options: TurnstileOptions) => string;
      remove: (widgetId: string) => void;
    }
  }
}


interface TurnstileOptions {
  sitekey: string;
}


export type TurnstileTokenValidateResponse = {
  'error-codes': string[]
  success: boolean
  action: string
  cdata: string
}


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

export type ImageVariableFormItemResponse = {
  fileElement ?: HTMLInputElement,
  previewImage ?: HTMLImageElement,
  serverImage ?: HTMLImageElement,
  onFileSelected ?: () => void,
}
