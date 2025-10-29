"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function PublicFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const quickLinks = [
    { href: "#", label: "Home" },
    { href: "#", label: "About Us" },
    { href: "#", label: "Services" },
    { href: "#", label: "Contact" },
  ];

  const supportLinks = [
    { href: "#", label: "FAQ" },
    { href: "#", label: "Help Center" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Privacy Policy" },
  ];

  return (
    <footer
      ref={footerRef}
      className="border-t bg-background relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background to-muted/20 dark:to-muted/10 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div
            className={cn(
              "space-y-4 transition-all duration-700",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <h3 className="font-bold text-2xl bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Medora
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your health is our priority. We are here to provide the best
              medical services with cutting-edge AI technology.
            </p>
            {/* Social Icons Placeholder */}
            <div className="flex gap-3 pt-2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <div className="w-4 h-4 rounded-full bg-primary/50" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={cn(
              "space-y-4 transition-all duration-700",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            <h3 className="font-semibold text-lg text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div
            className={cn(
              "space-y-4 transition-all duration-700",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            <h3 className="font-semibold text-lg text-foreground mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div
            className={cn(
              "space-y-4 transition-all duration-700",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: "300ms" }}
          >
            <h3 className="font-semibold text-lg text-foreground mb-4">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2 hover:text-primary transition-colors duration-300 cursor-pointer group">
                <span className="mt-1">📍</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  123 Medical Lane
                  <br />
                  Health City, HC 12345
                </span>
              </p>
              <p className="flex items-center gap-2 hover:text-primary transition-colors duration-300 cursor-pointer group">
                <span>✉️</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  contact@medora.com
                </span>
              </p>
              <p className="flex items-center gap-2 hover:text-primary transition-colors duration-300 cursor-pointer group">
                <span>📞</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  +1 (555) 123-4567
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={cn(
            "mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: "400ms" }}
        >
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            &copy; {new Date().getFullYear()} Medora. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link
              href="#"
              className="hover:text-primary transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="hover:text-primary transition-colors duration-300"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="hover:text-primary transition-colors duration-300"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
