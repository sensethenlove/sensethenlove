import { DKIM_PRIVATE_KEY } from '$env/static/private'
import { PUBLIC_HOST, PUBLIC_ENVIRONMENT } from '$env/static/public'


export default async (token: string, email: string, firstName: string | null): Promise<string | undefined> => {
  const href = `${ PUBLIC_HOST }/social/sign-in/verify?token=${ token }`

  if (PUBLIC_ENVIRONMENT === 'local') return href
  else {
    const visibleHref = href
      .replace('ht', '<span>ht</span>')
      .replace(':/', '<span>:/</span>')
      .replace('.co', '<span>.co</span>')
    const fetchResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email }],
          dkim_selector: 'mailchannels',
          dkim_domain: 'sensethenlove.com',
          dkim_private_key: DKIM_PRIVATE_KEY
        }],
        from: {
          name: 'Sense Then Love',
          email: 'us@sensethenlove.com',
        },
        subject:`Sense Then Love sign in link${ firstName ? ' for ' + firstName : '' }!`,
        content: [{
          type: 'text/html',
          value: `
            <table style="padding: 18px 18px 27px 18px; color: #273142; table-layout: fixed; width: 100%; max-width: 100vw; font-size: 16px; text-align:center; background-color:#f9f5f2; font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;">
              <tr>
                <td>
                  <img style="margin-bottom: 6px; max-width: 63px;" src="https://sensethenlove.com/cdn-cgi/imagedelivery/awgX85h4ifgiJaXRhZTMNw/3c485364-b636-4de3-96c5-6e71e2e6df00/public" />
                  <div style="color: #273142; font-size:27px; margin-bottom: 9px; font-family: papyrus, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;">Welcome${ firstName ? ' ' + firstName : ''}!</div>
                  <div style="margin-bottom: 9px;"><a href="${ href }" target="_blank">🔮 Please click this link to sign in to Sense Then Love!</a></div>
                  <div style="color: #273142; margin-bottom: 9px;">🕰 This link is valid for <strong>9 minutes</strong></div>
                  <div style="color: #273142; margin-bottom: 9px;">🙏 This link must be clicked from the <strong>same computer & browser</strong> that filled out the sign in form</div>
                  <div style="color: #273142; margin-bottom: 9px;">🌈 Here is the link in plain text if you would love to <strong>copy & paste it</strong></div>
                  <div style="color: #273142; word-wrap: anywhere;">${ visibleHref }</div>
                </td>
              </tr>
            </table>
          `,
        }],
      }),
    })

    if (fetchResponse.status > 202) {
      let error = 'Error while sending sign in email'

      try {
        const response = await fetchResponse.json()
        if (response?.errors) error = response.errors.toString()
      } catch (e) { }

      throw error
    }
  }
}
