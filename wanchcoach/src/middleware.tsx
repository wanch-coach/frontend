import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)"],
};

const protectedRoutes = ["/druginfo", "/mainpage", "/mysetting", "/register"]; // 로그인이 필요한 페이지 목록
const publicRoutes = ["/login", "/signup", "/naversignup", "/kakaosignup"]; // 로그인이 되면 접근할 수 없는 페이지 목록

export function middleware(request: NextRequest) {
  const token = getTokenFromCookies(request);
  console.log("미들웨어");
  console.log(token);
  const currentPath = request.nextUrl.pathname;

  if (!token && isProtectedRoute(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token && isPublicRoute(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = "/mainpage";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

function getTokenFromCookies(request: NextRequest) {
  const cookiesHeader = request.headers.get("cookie");
  if (!cookiesHeader) return null;

  const cookiesArray: [string, string][] = cookiesHeader.split("; ").map((cookie) => {
    const [key, value] = cookie.split("=");
    return [key, value];
  });

  const cookies = new Map(cookiesArray);
  return cookies.get("accessToken");
}

function isProtectedRoute(path: string) {
  return protectedRoutes.some((route) => path.startsWith(route));
}

function isPublicRoute(path: string) {
  return publicRoutes.some((route) => path.startsWith(route));
}
