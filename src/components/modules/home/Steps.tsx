"use client";

import {
  Search,
  ClipboardList,
  CalendarCheck,
  ShieldCheck,
  FileText,
  Video,
  CreditCard,
  HeartPulse,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Search,
    title: "Search Doctor",
    description: "Find your doctor easily with a minimum of effort.",
  },
  {
    icon: ClipboardList,
    title: "Check Doctor Profile",
    description: "Get to know your doctor better.",
  },
  {
    icon: CalendarCheck,
    title: "Schedule Appointment",
    description: "Choose the time and date that suits you.",
  },
  {
    icon: ShieldCheck,
    title: "Get Your Solution",
    description: "Our doctors are here to help you.",
  },
  {
    icon: FileText,
    title: "Electronic prescription",
    description: "Get your prescription instantly.",
  },
  {
    icon: Video,
    title: "Instant video consultation",
    description: "Consult with your doctor from anywhere.",
  },
  {
    icon: CreditCard,
    title: "Easy payment options",
    description: "Pay with ease using various methods.",
  },
  {
    icon: HeartPulse,
    title: "Health recovery",
    description: "Start your journey to better health.",
  },
];

const StepCard = ({
  icon: Icon,
  title,
  description,
  index,
  isVisible,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
  isVisible: boolean;
}) => {
  const bgColors = [
    "bg-blue-50 dark:bg-blue-950/20",
    "bg-pink-50 dark:bg-pink-950/20",
    "bg-green-50 dark:bg-green-950/20",
    "bg-yellow-50 dark:bg-yellow-950/20",
    "bg-pink-50 dark:bg-pink-950/20",
    "bg-blue-50 dark:bg-blue-950/20",
    "bg-yellow-50 dark:bg-yellow-950/20",
    "bg-green-50 dark:bg-green-950/20",
  ];

  const textColors = [
    "text-blue-500 dark:text-blue-400",
    "text-pink-500 dark:text-pink-400",
    "text-green-500 dark:text-green-400",
    "text-yellow-500 dark:text-yellow-400",
    "text-pink-500 dark:text-pink-400",
    "text-blue-500 dark:text-blue-400",
    "text-yellow-500 dark:text-yellow-400",
    "text-green-500 dark:text-green-400",
  ];

  return (
    <Card
      className={cn(
        bgColors[index % 8],
        "border-2 border-transparent hover:border-primary dark:hover:border-primary",
        "transition-all duration-500 cursor-pointer hover:shadow-xl hover:-translate-y-1 group",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-6 relative overflow-hidden">
        {/* Number Badge */}
        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/50 dark:bg-black/20 flex items-center justify-center text-sm font-bold text-muted-foreground backdrop-blur-sm">
          {index + 1}
        </div>

        <div className="flex items-start space-x-4">
          <div
            className={cn(
              "p-3 rounded-xl transition-all duration-500 shadow-sm group-hover:scale-110 group-hover:rotate-3",
              "bg-white dark:bg-card",
              textColors[index % 8]
            )}
          >
            <Icon size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </CardContent>
    </Card>
  );
};

const Steps = () => {
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
      className="py-10 md:py-20 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-muted/10 to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div
          className={cn(
            "text-center max-w-2xl mx-auto mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Easy Steps to Get Your Solution
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            We provide advanced technologies and high-quality surgery facilities
            right here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              {...step}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Connecting Lines (visible on large screens) */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/20 to-transparent pointer-events-none -z-10" />
      </div>
    </section>
  );
};

export default Steps;
