import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { getCookie } from "@/services/auth/tokenHandlers";
import LogoutButton from "./LogoutButton";

const PublicNavbar = async () => {
  const navItems = [
    { href: "#", label: "Consultation" },
    { href: "#", label: "Health Plans" },
    { href: "#", label: "Medicine" },
    { href: "#", label: "Diagnostics" },
  ];
  const role = "guest";

  const accessTokenHealthCare = await getCookie("accessTokenHealthCare");

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
          {accessTokenHealthCare ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button className="text-sm font-medium cursor-pointer">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
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
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Auth Button */}
              <div className="mt-6 border-t pt-6">
                {role !== "guest" ? (
                  <Button variant="outline" className="w-full">
                    Logout
                  </Button>
                ) : (
                  <Link href="/login" className="block">
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
