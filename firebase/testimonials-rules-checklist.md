# Testimonial rules review checklist

This checklist applies to `firebase/database.rules.proposed.json`. It is a review artifact only; it has not been deployed.

| Test | Expected result |
| --- | --- |
| Public read of `/testimonials` without a query | Deny |
| Public read with `orderByChild=status` and `equalTo=approved` | Allow approved records only |
| Valid public create with `name`, `comment`, integer `rating` 1–5, `status: pending`, `timestamp`, and `createdAt` | Allow |
| Missing required field | Deny |
| Extra field | Deny |
| Rating outside 1–5 or non-integer | Deny |
| Empty or oversized name/comment | Deny |
| Status other than `pending` on public create | Deny |
| Future timestamp | Deny |
| Update an existing testimonial from the public client | Deny |
| Delete an existing testimonial from the public client | Deny |
| Approve a record | Perform through the Firebase Console or a separately authenticated moderation tool; no public moderation path is created here |

## Important limitation

Realtime Database rules validate shape and authorization but do not provide complete rate limiting, spam prevention, CAPTCHA, or abuse detection. Those controls should be added at a trusted server boundary before exposing the form to high-volume traffic.

## Deployment status

The proposed rules have **not** been deployed and no production Firebase data or existing rules were changed by this implementation.
