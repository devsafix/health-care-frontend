"use client";

import { logoutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <Button
      variant={"destructive"}
      onClick={handleLogout}
      className="text-sm font-medium cursor-pointer"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
