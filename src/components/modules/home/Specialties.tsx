"use client";

import { HeartPulse, Brain, Bone, Baby } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

const specialists = [
  {
    name: "Cardiology",
    icon: HeartPulse,
    bgColor: "bg-red-50 dark:bg-red-950/20",
    iconColor: "text-red-500 dark:text-red-400",
    hoverBg: "hover:bg-red-100 dark:hover:bg-red-950/40",
  },
  {
    name: "Neurology",
    icon: Brain,
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    iconColor: "text-blue-500 dark:text-blue-400",
    hoverBg: "hover:bg-blue-100 dark:hover:bg-blue-950/40",
  },
  {
    name: "Orthopedic",
    icon: Bone,
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    iconColor: "text-pink-500 dark:text-pink-400",
    hoverBg: "hover:bg-pink-100 dark:hover:bg-pink-950/40",
  },
  {
    name: "Pediatric",
    icon: Baby,
    bgColor: "bg-green-50 dark:bg-green-950/20",
    iconColor: "text-green-500 dark:text-green-400",
    hoverBg: "hover:bg-green-100 dark:hover:bg-green-950/40",
  },
];

const Specialties = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-10 md:py-20 bg-linear-to-b from-background to-muted/20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={cn(
            "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Specialist
            </h2>
            <p className="text-muted-foreground max-w-md text-base md:text-lg">
              Access to medical experts across all major specialties.
            </p>
          </div>

          <a
            href="#"
            className="text-primary font-semibold hover:underline mt-4 sm:mt-0 flex items-center gap-2 group transition-all duration-300"
          >
            <span>View All</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialists.map((specialist, index) => (
            <Card
              key={specialist.name}
              className={cn(
                "text-center transition-all duration-500 cursor-pointer border-2 border-transparent overflow-hidden group",
                "hover:shadow-xl hover:-translate-y-2 hover:border-primary dark:hover:border-primary",
                "bg-card dark:bg-card",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 relative">
                {/* Animated Background Circle */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500",
                    specialist.bgColor
                  )}
                />

                <div className="relative z-10">
                  <div
                    className={cn(
                      "w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 transition-all duration-500",
                      specialist.bgColor,
                      specialist.hoverBg,
                      "group-hover:scale-110 group-hover:rotate-6"
                    )}
                  >
                    <specialist.icon
                      className={cn(
                        specialist.iconColor,
                        "transition-all duration-500 group-hover:scale-110"
                      )}
                      size={36}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {specialist.name}
                  </h3>
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialties;
