import sendgrid from '@sendgrid/mail'
import { SENDGRID_API_KEY } from '$env/static/private'


export default async ({ to, subject, html }: { to: string, subject: string, html: string }) => {
  sendgrid.setApiKey(SENDGRID_API_KEY)
  return await sendgrid.send({ from: 'chris@sensethenlove.com', to, subject, html })
}
