"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import checkAuthStatus from "@/utility/auth";
import { useEffect, useState } from "react";

const PublicNavbar = () => {
  const [role, setRole] = useState("guest");

  useEffect(() => {
    async function fetchUser() {
      const { user } = await checkAuthStatus();
      setRole(user?.role || "guest");
    }
    fetchUser();
  }, []);

  // static nav items first
  const navItems = [
    { href: "#", label: "Consultation" },
    { href: "#", label: "Health Plans" },
    { href: "#", label: "Medicine" },
    { href: "#", label: "Diagnostics" },
  ];

  if (role === "ADMIN") {
    navItems.push({ href: "/dashboard/admin", label: "Admin Dashboard" });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur dark:bg-background/95">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Medora</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 font-medium">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {role !== "guest" ? (
            <Button variant="destructive">Logout</Button>
          ) : (
            <Link href="/login" className="text-lg font-medium">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                {" "}
                <Menu />{" "}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-4 flex flex-col space-y-4">
                  <div className="flex justify-center"></div>
                  {role !== "guest" ? (
                    <Button variant="destructive">Logout</Button>
                  ) : (
                    <Link href="/login" className="text-lg font-medium">
                      <Button>Login</Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
