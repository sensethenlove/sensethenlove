import sanitizeHtml from 'sanitize-html'
import { EDITABLE_PRISTINE_ATTRIBUTE } from '$lib/form/variables'


export default (dirty: string) => {
  return sanitizeHtml(dirty, {
    allowedTags: ['div', 'br', 'a', 'span'],
    allowedAttributes: {
      div: ['id'],
      a: ['href', 'target', EDITABLE_PRISTINE_ATTRIBUTE],
    }
  })
}
