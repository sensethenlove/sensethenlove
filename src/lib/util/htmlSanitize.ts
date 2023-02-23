import sanitizeHtml from 'sanitize-html'


export default (dirty: string) => {
  return sanitizeHtml(dirty, {
    allowedTags: ['hr', 'br', 'p', 'u', 's', 'em', 'ol', 'ul', 'li', 'span', 'strong', 'a'],
    allowedAttributes: {
      p: ['style'],
      u: ['style'],
      s: ['style'],
      em: ['style'],
      ol: ['style'],
      ul: ['style'],
      li: ['style'],
      span: ['style'],
      strong: ['style'],
      a: ['style', 'href', 'src', 'target', 'title'],
    }
  })
}
