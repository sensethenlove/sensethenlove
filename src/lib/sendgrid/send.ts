import env from '$lib/security/environmentVariables'


export default async ({ to, subject, html }: { to: string, subject: string, html: string }) => {
  return await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ await env.get('SENDGRID_API_KEY') }`,
    },
    body: JSON.stringify({
      subject,
      content: [ { type: 'text/html', value: html } ],
      from: { email: 'us@sensethenlove.com' },
      personalizations: [ { to: [ { email: to } ] } ]
    })
  })
}
