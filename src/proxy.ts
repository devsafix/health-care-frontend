import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { UserInterface } from "./types/userTypes";

/**
 * Public routes that don't require authentication
 */
const authRoutes = ["/login", "/register", "/forgot-password"];

/**
 * Role-based protected routes
 */
const roleBasedRoutes: Record<string, string[]> = {
  ADMIN: ["/dashboard/admin"],
  DOCTOR: ["/dashboard/doctor"],
  PATIENT: ["/dashboard/patient"],
};

/**
 * Middleware Proxy – Protects Routes & Redirects Users Based on Auth Status
 */
export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessTokenHealthCare")?.value;
  const refreshToken = request.cookies.get("refreshTokenHealthCare")?.value;
  const { pathname } = request.nextUrl;

  /**
   * If user is not authenticated and trying to access protected routes
   * redirect them to login with redirect callback
   */
  if (!accessToken && !refreshToken && !authRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  let user: UserInterface | null = null;

  /**
   * ✅ Decode Access Token if available
   */
  if (accessToken) {
    try {
      user = jwtDecode(accessToken);
    } catch (error) {
      console.error("Invalid access token", error);
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  console.log("Decoded User:", user);
  console.log("User Role:", user?.role);
  console.log("Pathname:", pathname);

  /**
   * ✅ Try refreshing the token if access token not found/expired
   */
  if (!user && refreshToken) {
    try {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (refreshResponse.ok) {
        // ✅ Get new token after refresh
        const newAccessToken = request.cookies.get(
          "accessTokenHealthCare"
        )?.value;

        if (newAccessToken) user = jwtDecode(newAccessToken);

        return NextResponse.next();
      } else {
        // ❌ Refresh failed → Force logout
        const res = NextResponse.redirect(
          new URL(`/login?redirect=${pathname}`, request.url)
        );
        res.cookies.delete("accessTokenHealthCare");
        res.cookies.delete("refreshTokenHealthCare");
        return res;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      const res = NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
      res.cookies.delete("accessTokenHealthCare");
      res.cookies.delete("refreshTokenHealthCare");
      return res;
    }
  }

  /**
   * ✅ If user is logged in and tries to access LOGIN/REGISTER again → redirect to home
   */
  if (user && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(`/`, request.url));
  }

  /**
   * ✅ Check Role-Based Authorization
   */
  if (user) {
    const allowedRoutes = roleBasedRoutes[user.role];

    // ✅ Allow only if route starts with allowed path for that role
    if (allowedRoutes?.some((route) => pathname.startsWith(route))) {
      return NextResponse.next();
    }

    // ❌ If trying to access a non-allowed route
    return NextResponse.redirect(new URL(`/unauthorized`, request.url));
  }

  return NextResponse.next();
}

/**
 * ✅ Routes monitored by middleware
 */
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/forgot-password"],
};
