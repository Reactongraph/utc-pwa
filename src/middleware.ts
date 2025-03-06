import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    console.log("token", token);
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname === "/login";

    if (req.nextUrl.pathname.includes("/images/")) {
      return null;
    }
    if (isAuthPage) {
      if (isAuth) {
        // return NextResponse.redirect(new URL('/', req.url));
      }
      return null;
    }

    // if (!isAuth) {
    //   let from = req.nextUrl.pathname;
    //   if (req.nextUrl.search) {
    //     from += req.nextUrl.search;
    //   }

    //   return NextResponse.redirect(
    //     new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    //   );
    // }

    const requestHeaders = new Headers(req.headers);
    // requestHeaders.set("authorization", `Bearer ${token.accessToken}`);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
