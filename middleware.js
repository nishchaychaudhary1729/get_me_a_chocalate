import { NextResponse } from 'next/server'
 
export function middleware(request) {
  const isAuthenticated = request.cookies.has('auth_token')
  const isAuthPage = request.nextUrl.pathname.startsWith('/signin') || 
                    request.nextUrl.pathname.startsWith('/signup')
  const isHomePage = request.nextUrl.pathname.startsWith('/home/')

  if (isHomePage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (isAuthPage && isAuthenticated) {
    const user = JSON.parse(request.cookies.get('auth_token').value)
    return NextResponse.redirect(new URL(`/home/${user.username}`, request.url))
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: ['/home/:path*', '/signin', '/signup']
}
