export default (type: 'post' | 'profile', id: string): string => {
  switch (type) {
    case 'post': return `post--${id}`
    case 'profile': return `profile--${ id }`
    default: throw new Error('Invalid type provided')
  }
}
