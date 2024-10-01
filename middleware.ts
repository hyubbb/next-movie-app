import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/like"];

export default function middleware(request: NextRequest) {
  const session = request.cookies.get("token")?.value || "";
  // session이 없고, protectedRoutes에 포함되어 있으면 로그인 페이지로 리다이렉트
  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
