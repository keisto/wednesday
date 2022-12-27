import bcrypt from 'bcrypt'
import { jwtVerify, SignJWT } from 'jose'
import { db } from '@/lib/db'
import { User } from '@prisma/client'
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies'
import { ReadonlyRequestCookies } from 'next/dist/server/app-render'

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 10)

export const comparePasswords = (
  plainTextPassword: string,
  hashPassword: string
) => bcrypt.compare(plainTextPassword, hashPassword)

export const createJWT = (user: User) => {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 * 24 * 7

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  )

  return payload.payload as any
}

export const getUserFromCookie = async (
  cookies: RequestCookies | ReadonlyRequestCookies
) => {
  if (!process.env.COOKIE_NAME) {
    throw new Error('Cookie name not set')
  }

  const jwt = cookies.get(process.env.COOKIE_NAME)

  if (!jwt) {
    return null
  }

  const { id } = await validateJWT(jwt.value)

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  })

  return user
}
