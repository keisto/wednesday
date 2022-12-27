import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const verifyJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  )
}

export async function middleware(req: NextRequest) {
  if (!process.env.COOKIE_NAME) {
    throw new Error('Cookie name not set')
  }

  const { pathname } = req.nextUrl
  const jwt = req.cookies.get(process.env.COOKIE_NAME)

  if (!jwt) {
    req.nextUrl.pathname = '/signin'
    return NextResponse.redirect(req.nextUrl)
  } else {
    if (pathname.startsWith('/signin') || pathname.startsWith('/register')) {
      req.nextUrl.pathname = '/dashboard'
      return NextResponse.redirect(req.nextUrl)
    }
  }

  try {
    await verifyJWT(jwt.value)
    return NextResponse.next()
  } catch (e) {
    console.error(e)
    req.nextUrl.pathname = '/signin'
    return NextResponse.redirect(req.nextUrl)
  }
}

export const config = {
  matcher: ['/dashboard', '/project/:path*', '/signin', '/register'],
}
