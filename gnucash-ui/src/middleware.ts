import { last } from "lodash";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //   console.log(request.nextUrl.pathname, "apple");
  //   const startsWith = request.nextUrl.pathname.startsWith("/diary/dist/");
  //   const lastToken = last(request.nextUrl.pathname.split("/"))
    
  //   const isAFile  = lastToken && lastToken.indexOf(".") > 0;
    
    
  // if (startsWith && !isAFile) {
  //   const redirectedUrl = new URL(`${request.nextUrl.pathname}/index.html`, request.url);
  //   console.log({redirectedUrl});
    
  //   return NextResponse.rewrite(redirectedUrl);
  // }

}
