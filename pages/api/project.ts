import { validateJWT } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.COOKIE_NAME) {
    throw new Error('Cookie name not set')
  }

  const cookie = req.cookies[process.env.COOKIE_NAME]

  if (!cookie) {
    res.status(401).json({ data: { message: 'Unauthorized' } })
    return
  }

  const user = await validateJWT(cookie)

  await db.project.create({
    data: {
      name: req.body.name,
      ownerId: user.id,
    },
  })

  res.json({ data: { message: 'ok' } })
}
