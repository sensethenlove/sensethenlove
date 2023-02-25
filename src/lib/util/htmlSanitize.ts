import sanitizeHtml from 'sanitize-html'


export default (dirty: string) => {
  return sanitizeHtml(dirty, {
    allowedTags: ['div', 'br', 'a', 'span'],
    allowedAttributes: {
      div: ['id'],
      a: ['src'],
    }
  })
}
