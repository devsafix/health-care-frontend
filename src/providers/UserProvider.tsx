"use client";

import { UserInterface } from "@/types/userTypes";
import checkAuthStatus from "@/utility/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextInterface {
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
  loading: boolean;
}

const UserContext = createContext<UserContextInterface | undefined>(undefined);

export const UseUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider.");
  }
  return context;
};

export const UserProvider = ({
  initialUser,
  children,
}: {
  initialUser?: UserInterface | null;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserInterface | null>(initialUser ?? null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const revalidateUser = async () => {
      try {
        const res = await checkAuthStatus();
        setUser(res.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    revalidateUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
