import { PUBLIC_ENVIRONMENT } from '$env/static/public'


export default (type: 'post' | 'profile', id: string): string => {
  switch (type) {
    case 'post': return `${ PUBLIC_ENVIRONMENT }--post--${ id }`
    case 'profile': return `${ PUBLIC_ENVIRONMENT }--profile--${ id }`
    default: throw new Error('Invalid type provided')
  }
}
