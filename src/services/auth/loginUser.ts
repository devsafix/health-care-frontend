"use server";

import z from "zod";
import { parse } from "cookie";
import { cookies } from "next/headers";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/auth-utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

const loginValidationZodSchema = z.object({
  email: z.email({
    message: "Email is required",
  }),
  password: z
    .string("Password is required")
    .min(6, {
      error: "Password is required and must be at least 6 characters long",
    })
    .max(100, {
      error: "Password must be at most 100 characters long",
    }),
});

export const loginUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const redirectTo = formData.get("redirect") || null;

    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validatedFields = loginValidationZodSchema.safeParse(loginData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const setCookieHeader = res.headers.getSetCookie();

    if (setCookieHeader && setCookieHeader.length > 0) {
      setCookieHeader.forEach((cookieStr) => {
        const cookies = parse(cookieStr);

        if (cookies["accessTokenHealthCare"]) {
          accessTokenObject = cookies;
        }
        if (cookies["refreshTokenHealthCare"]) {
          refreshTokenObject = cookies;
        }
      });
    } else {
      throw new Error("No Set-Cookie header found");
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessTokenObject.accessTokenHealthCare, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    cookieStore.set("refreshToken", refreshTokenObject.refreshTokenHealthCare, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    const verifiedToken: JwtPayload | string = jwt.verify(
      accessTokenObject.accessTokenHealthCare,
      process.env.JWT_SECRET as string
    );

    console.log(verifiedToken, "verifiedToken");

    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token");
    }

    const userRole: UserRole = verifiedToken.role;

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirect(requestedPath);
      } else {
        redirect(getDefaultDashboardRoute(userRole));
      }
    }
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return { error: "Login failed" };
  }
};
