import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Edge Runtime에서는 쿠키 존재만 확인
  const sessionCookie = request.cookies.get('admin_session')?.value

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // 실제 서명 검증은 Server Action에서 수행됨
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
