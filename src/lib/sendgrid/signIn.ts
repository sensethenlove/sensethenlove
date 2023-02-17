import env from '$lib/security/env'
import send from '$lib/sendgrid/send'


export default async (token: string, email: string, firstName: string | null) => {
  await send({
    to: `${ email }`,
    subject: `Sense Then Love sign in link${ firstName ? ' for ' + firstName : '' }!`,
    html: `
      <table style="color: #273142; width: 100%; font-size: 16px; text-align:center; background-color:#f9f5f2; font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;">
        <tr>
          <td>
            <img style="max-width: 63px;" src="https://sensethenlove.com/cdn-cgi/imagedelivery/awgX85h4ifgiJaXRhZTMNw/79da5cb2-c86d-4a96-316e-7c975bfc1500/public" />
          </td>
        </tr>
        <tr>
          <td>
            <div style="font-size:27px; margin-bottom: 9px; font-family: papyrus, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;">Welcome${firstName ? ' ' + firstName : ''}!</div>
            <div style="margin-bottom: 12px;"><a href="${await env.get('ENVIRONMENT') === 'production' ? 'https://sensethenlove.com' : 'http://localhost:5173'}/social/sign-in/verify?token=${token}" target="_blank">Please click this link to sign in to Sense Then Love!</a></div>
            <div style="margin-bottom: 6px;">Link valid for <strong>9 minutes</strong></div>
            <div style="margin-bottom: 6px;">Link must be clicked from the <strong>same IP address</strong> that filled out the sign in form</div>
            <div><strong>We will never read, store or sell your location information!</strong></div>
          </td>
        </tr>
      </table>
    `,
  })
}
