import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest, NextResponse } from 'next/server'
 
const I18nMiddleware = createI18nMiddleware({
  locales: ['en','az'],
  defaultLocale: 'en',
})

export function middleware(request: NextRequest) {
  const response = I18nMiddleware(request)
  
  const finalResponse = response instanceof NextResponse 
    ? response 
    : NextResponse.next()
  
  finalResponse.headers.set('x-pathname', request.nextUrl.pathname)
  
  return finalResponse
}
 
export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}