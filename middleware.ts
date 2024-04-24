import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/like"];

export default function middleware(request: NextRequest) {
  const session = request.cookies.get("token")?.value || "";

  // Redirect to login if session is not set
  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
