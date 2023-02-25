import { BASE_CONTENT_EDITABLE_ELEMENT } from '$lib/form/variables'


const emptyOptions = [
  '',
  '<br>',
  '<br />',
  `<br>${ BASE_CONTENT_EDITABLE_ELEMENT }`,
  `${ BASE_CONTENT_EDITABLE_ELEMENT }<br>`,
  `<br />${ BASE_CONTENT_EDITABLE_ELEMENT }`,
  `${ BASE_CONTENT_EDITABLE_ELEMENT }<br />`,
]


export default (content: string) => {
  return emptyOptions.includes(content)
}
