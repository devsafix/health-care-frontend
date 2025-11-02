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
    navItems.push({ href: "/dashboard/admin", label: "Admin Dashboard" });
  }

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-background/80 backdrop-blur-xl border-b shadow-lg dark:shadow-blue-900/20">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <span className="text-3xl tracking-wide font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 transition-transform duration-300 inline-block group-hover:scale-110">
              Medora
            </span>
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative px-4 py-2 text-foreground hover:text-primary transition-colors duration-300 font-medium group"
            >
              <span className="relative z-10">{link.label}</span>
              <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {role !== "guest" ? (
            <Button
              variant="destructive"
              className="rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
              onClick={() => {
                logOutUser();
              }}
            >
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button className="rounded-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg group">
                <span className="transition-all duration-300 group-hover:tracking-wide">
                  Login
                </span>
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-lg border-2 hover:border-primary dark:hover:border-primary hover:scale-110 transition-all duration-300"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] p-6 bg-background/95 backdrop-blur-xl border-l-2"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              {/* Mobile Logo */}
              <div className="mb-8">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  Medora
                </span>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col space-y-2">
                {navItems.map((link, index) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium px-4 py-3 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 hover:translate-x-2 border border-transparent hover:border-primary/30 opacity-0 animate-slide-in"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Auth Button */}
                <div className="border-t border-border pt-6 mt-4">
                  {role !== "guest" ? (
                    <Button
                      variant="destructive"
                      className="w-full rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Link
                      href="/login"
                      className="block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="w-full rounded-lg font-semibold hover:scale-105 transition-transform duration-300 group">
                        <span className="transition-all duration-300 group-hover:tracking-wide">
                          Login
                        </span>
                      </Button>
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
