"use server";

import { redirect } from "next/navigation";
import { deleteCookie } from "./tokenHandlers";

export const logoutUser = async () => {
  await deleteCookie("accessTokenHealthCare");
  await deleteCookie("refreshTokenHealthCare");

  redirect("/login?loggedOut=true");
};
