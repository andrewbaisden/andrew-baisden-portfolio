import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "andrewbaisden.com";
const WWW_HOST = "www.andrewbaisden.com";

const normalizePath = (pathname: string): string => {
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
};

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Avoid touching internal Next.js build/prerender routes.
  if (url.pathname.startsWith("/_")) {
    return NextResponse.next();
  }

  const normalizedPath = normalizePath(url.pathname);
  const host = request.headers.get("host") ?? "";

  // Canonicalize host and known legacy paths in a single 301.
  if (host === WWW_HOST) {
    url.protocol = "https";
    url.host = CANONICAL_HOST;
    url.port = "";

    if (normalizedPath === "/index" || normalizedPath === "/uses") {
      url.pathname = "/";
    } else {
      url.pathname = normalizedPath;
    }

    return NextResponse.redirect(url, 301);
  }

  if (normalizedPath === "/index" || normalizedPath === "/uses") {
    url.pathname = "/";
    return NextResponse.redirect(url, 301);
  }

  if (url.pathname !== normalizedPath) {
    url.pathname = normalizedPath;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|_).*)"],
};
