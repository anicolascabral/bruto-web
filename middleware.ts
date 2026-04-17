import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { localeFromPathname } from "@/lib/locale";

export function middleware(request: NextRequest) {
  const locale = localeFromPathname(request.nextUrl.pathname);
  const res = NextResponse.next();
  res.headers.set("x-next-locale", locale);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
