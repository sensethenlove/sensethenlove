import { SENDGRID_API_KEY } from '$env/static/private'


export default async ({ to, subject, html }: { to: string, subject: string, html: string }) => {
  return await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ SENDGRID_API_KEY }`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subject,
      content: [ { type: 'text/html', value: html } ],
      from: { email: 'us@sensethenlove.com' },
      personalizations: [ { to: [ { email: to } ] } ]
    })
  })
}
