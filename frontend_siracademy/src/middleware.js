import { NextResponse } from "next/server";

const roleToDashboard = (role) => {
  if (role === "admin") return "/dashboards/admin-dashboard";
  if (role === "instructor") return "/dashboards/instructor-dashboard";
  return "/dashboards/student-dashboard";
};

const isRoleMismatch = (pathname, role) => {
  if (pathname.startsWith("/dashboards/admin-")) return role !== "admin";
  if (pathname.startsWith("/dashboards/instructor-")) return role !== "instructor";
  if (pathname.startsWith("/dashboards/student-")) return role !== "student";
  return false;
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;
  const role = request.cookies.get("auth_role")?.value || "student";

  if (pathname.startsWith("/home-")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/dashboards")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isRoleMismatch(pathname, role)) {
      return NextResponse.redirect(new URL(roleToDashboard(role), request.url));
    }
  }

  if (pathname.startsWith("/lessons")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname.startsWith("/ecommerce")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/login")) {
    if (token) {
      return NextResponse.redirect(new URL(roleToDashboard(role), request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home-:path*", "/dashboards/:path*", "/lessons/:path*", "/ecommerce/:path*", "/login"],
};
