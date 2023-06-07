/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  if(request.nextUrl.pathname.startsWith('/api/entries/')) {
    const id = request.nextUrl.pathname.replace('/api/entries/','');

    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    if(!checkMongoIDRegExp.test(id)) {

      const newUrl = request.nextUrl.clone();
      newUrl.pathname = '/api/bad-request';
      newUrl.search = `?message=${id} is not valid Mongo ID`;

      return NextResponse.rewrite(newUrl);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/entries/:id/:path',
};