import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if it's an admin route
  if (pathname.startsWith('/admin')) {
    // For now, we'll let the client-side handle authentication
    // since we're using localStorage for admin sessions
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
