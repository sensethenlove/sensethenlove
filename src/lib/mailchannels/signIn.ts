import env from '$lib/security/env'


export default async (token: string, email: string, firstName: string | null) => {
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
        dkim_private_key: (await env.get('DKIM_PRIVATE_KEY'))
      }],
      from: {
        name: 'Sense Then Love',
        email: 'us@sensethenlove.com',
      },
      subject:`Sense Then Love sign in link${ firstName ? ' for ' + firstName : '' }!`,
      content: [{
        type: 'text/html',
        value: `
          <table style="padding: 18px 0 27px 0; color: #273142; width: 100%; font-size: 16px; text-align:center; background-color:#f9f5f2; font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;">
            <tr>
              <td>
                <img style="margin-bottom: 6px; max-width: 63px;" src="https://sensethenlove.com/cdn-cgi/imagedelivery/awgX85h4ifgiJaXRhZTMNw/79da5cb2-c86d-4a96-316e-7c975bfc1500/public" />
                <div style="color: #273142; font-size:27px; margin-bottom: 9px; font-family: papyrus, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;">Welcome${ firstName ? ' ' + firstName : '' }!</div>
                <div style="margin-bottom: 9px;"><a href="https://sensethenlove.com/social/sign-in/verify?token=${ token }" target="_blank">Please click this link to sign in to Sense Then Love!</a></div>
                <div style="color: #273142; margin-bottom: 9px;">Link valid for <strong>9 minutes</strong></div>
                <div style="color: #273142;">Link must be clicked from the <strong>same computer + browser</strong> that filled out the sign in form</div>
              </td>
            </tr>
          </table>
        `,
      }],
    }),
  })

  let error, response

  if (fetchResponse.status > 202) error = 'Error while sending sign in email'
  try { response = await fetchResponse.json() } catch (e) {}

  if (response?.errors) throw response.errors.toString()
  else throw error
}
