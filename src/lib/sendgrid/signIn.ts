import env from '$lib/security/env'
import send from '$lib/sendgrid/send'


export default async (token: string, email: string, firstName: string | null) => {
  await send({
    to: `${ email }`,
    subject: `Sense Then Love sign in link${ firstName ? ' for ' + firstName : '' }!`,
    html: 
      `Welcome${firstName ? ' ' + firstName : '' }! <a href="${ await env.get('ENVIRONMENT') === 'production' ? 'https://sensethenlove.com' : 'http://localhost:5173' }/social/sign-in/verify?token=${ token }" target="_blank">Click this link</a> to sign into Sense Then Love!
      <p>This link is valid for <strong>9 minutes!</strong></p>
      <p>This link will only sign you in if the link is clicked from the <strong>same IP address</strong> that filled out the sign in form. <strong>We never read or store your location information!</strong></p>`,
  })
}
