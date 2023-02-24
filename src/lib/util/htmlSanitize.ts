import sanitizeHtml from 'sanitize-html'


export default (dirty: string) => {
  return sanitizeHtml(dirty, {
    allowedTags: ['div', 'br', 'a'],
    allowedAttributes: {
      a: ['style', 'href', 'src', 'target', 'title'],
    }
  })
}
