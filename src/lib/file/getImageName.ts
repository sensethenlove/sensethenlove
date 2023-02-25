export default (type: 'primary' | 'post', id: string): string => {
  switch (type) {
    case 'post': return `post--${id}`
    case 'primary': return `primary--${ id }`
    default: throw new Error('Invalid type provided')
  }
}
