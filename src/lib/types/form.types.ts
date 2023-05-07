import type { Source } from '$lib/types/prisma.types'


export type FormFields = {
  [k: string]: FormDataEntryValue
}


export type FormOnError = ({ fields, data }: { fields: FormFields, data: any }) => void
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
  serverImages?: string[] | null,
  maxWidth?: string,
  focusOnInit?: boolean,
  autocomplete?: string,
  multiple?: boolean,
}


export type FormInputs = Array<FormInput | Array<FormInput>>

export type ImageVariableFormItem = {
  fileInput?: HTMLInputElement,
  previewImages: string[],
  serverImages?: string[],
  onChange ?: () => void,
}

export type SearchResponse = {
  quotesByText?: Source[],
  sourcesByTitle?: Source[],
  sourcesByDescription?: Source[],
}
