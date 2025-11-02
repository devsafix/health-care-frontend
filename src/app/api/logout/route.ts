import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const res = NextResponse.redirect(new URL("/login", request.url));
  res.cookies.delete("accessTokenHealthCare");
  res.cookies.delete("refreshTokenHealthCare");
  return res;
}
