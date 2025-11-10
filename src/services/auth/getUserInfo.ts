"use server";

import { UserInfo } from "@/types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const accessTokenHealthCare = await getCookie("accessTokenHealthCare");

    if (!accessTokenHealthCare) {
      return null;
    }

    const verifiedToken = jwt.verify(
      accessTokenHealthCare,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    if (!verifiedToken) {
      return null;
    }

    console.log(verifiedToken);

    const userInfo: UserInfo = {
      name: verifiedToken.name || "Unknown User",
      email: verifiedToken.email,
      role: verifiedToken.role,
    };

    return userInfo;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
