import { Resend } from 'resend'

const limits = { name: 100, email: 254, subject: 200, message: 5000 }
const fields = Object.keys(limits)

function escapeHtml(value) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
  return value.replace(/[&<>"']/g, (character) => entities[character])
}

function errorResponse(response, status, error) {
  return response.status(status).json({ error })
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return errorResponse(response, 405, 'Method not allowed')
  }

  const requiredEnvironment = ['RESEND_API_KEY', 'RESEND_CONTACT_EMAIL', 'RESEND_FROM_EMAIL']
  if (requiredEnvironment.some((key) => !process.env[key])) {
    console.error('Resend environment variables are not configured')
    return errorResponse(response, 500, 'Email service is not configured')
  }

  let body = request.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return errorResponse(response, 400, 'Invalid request body')
    }
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return errorResponse(response, 400, 'Invalid request body')
  }

  if (Object.keys(body).some((key) => !fields.includes(key))) {
    return errorResponse(response, 400, 'Unexpected fields are not allowed')
  }

  const values = Object.fromEntries(fields.map((field) => [
    field,
    typeof body[field] === 'string' ? body[field].trim() : '',
  ]))

  if (fields.some((field) => !values[field])) {
    return errorResponse(response, 400, 'All fields are required')
  }

  if (fields.some((field) => values[field].length > limits[field])) {
    return errorResponse(response, 400, 'One or more fields exceed the allowed length')
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return errorResponse(response, 400, 'Invalid email address')
  }

  if (/[\r\n]/.test(values.subject)) {
    return errorResponse(response, 400, 'Invalid subject')
  }

  const text = [
    `নাম: ${values.name}`,
    `ইমেল: ${values.email}`,
    `বিষয়: ${values.subject}`,
    '',
    'বার্তা:',
    values.message,
  ].join('\n')

  const safe = Object.fromEntries(
    fields.map((field) => [field, escapeHtml(values[field])]),
  )

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [process.env.RESEND_CONTACT_EMAIL],
      replyTo: values.email,
      subject: values.subject,
      text,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1e293b">
          <h2 style="color:#2563eb">নতুন যোগাযোগের বার্তা</h2>
          <p><strong>নাম:</strong> ${safe.name}</p>
          <p><strong>ইমেল:</strong> ${safe.email}</p>
          <p><strong>বিষয়:</strong> ${safe.subject}</p>
          <hr />
          <p><strong>বার্তা:</strong></p>
          <p style="white-space:pre-wrap">${safe.message}</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return errorResponse(response, 502, 'Unable to deliver the email')
    }

    return response.status(200).json({ success: true, id: data?.id })
  } catch (error) {
    console.error('Email service error:', error)
    return errorResponse(response, 500, 'Unable to deliver the email')
  }
}

export const config = {
  api: { bodyParser: { sizeLimit: '100kb' } },
}

export { escapeHtml }

// Rate limiting remains a separate production-hardening task.
// Firebase message archival and the existing client behavior are unchanged here.

// Vercel environment variables required:
// RESEND_API_KEY, RESEND_CONTACT_EMAIL, RESEND_FROM_EMAIL

// The sender address must be verified in Resend before deployment.

// This endpoint intentionally contains no client-side secrets.

// End of file.
