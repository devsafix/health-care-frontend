"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { UseUser } from "@/providers/UserProvider";
import { logOutUser } from "@/utility/logOut";

const PublicNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = UseUser();
  const role = user?.role || "guest";

  const navItems = [
    { href: "#", label: "Consultation" },
    { href: "#", label: "Health Plans" },
    { href: "#", label: "Medicine" },
    { href: "#", label: "Diagnostics" },
  ];

  if (role === "ADMIN") {
    navItems.push({ href: "/dashboard/admin", label: "Dashboard" });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold tracking-wide">
          Medora
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-base font-medium text-foreground hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {role !== "guest" ? (
            <Button
              variant="outline"
              onClick={() => logOutUser()}
              className="text-sm font-medium"
            >
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button className="text-sm font-medium">Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[260px] p-6">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              {/* Mobile Logo */}
              <div className="mb-6 text-xl font-bold tracking-wide">Medora</div>

              {/* Nav Links */}
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-base font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Auth Button */}
              <div className="mt-6 border-t pt-6">
                {role !== "guest" ? (
                  <Button
                    variant="outline"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    Logout
                  </Button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block"
                  >
                    <Button className="w-full">Login</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
