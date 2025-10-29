"use client";

import { Search, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LargeSparkleIcon, SparkleIcon } from "@/assets/icons/SparkleIcon";
import { HeroProps } from "@/types/heroProps";
import { useEffect, useState } from "react";

export function Hero({
  badge = {
    text: "AI-Powered Healthcare",
  },
  heading = {
    line1: "Find Your Perfect",
    line2: "Doctor with AI",
  },
  description = [
    "Our advanced AI technology analyzes your symptoms, medical",
    "history, and preferences to match you with the best-fit doctors",
    "in seconds.",
  ],
  buttons = {
    primary: {
      text: "Find Your Doctor",
    },
    secondary: {
      text: "Book Appointment",
    },
  },
  stats = [
    { value: "50K+", label: "Patients Served" },
    { value: "1000+", label: "Expert Doctors" },
    {
      value: "4.9",
      label: "Patient Rating",
      icon: <Star className="size-6 fill-yellow-300 stroke-yellow-400" />,
    },
  ],
  formCard = {
    title: "AI Doctor Finder",
    symptomLabel: "What are your symptoms?",
    symptomPlaceholder: "e.g., headache, fever, cough",
    specialtyLabel: "Preferred specialty",
    specialtyOptions: [
      "General Physician",
      "Cardiologist",
      "Dermatologist",
      "Pediatrician",
      "Orthopedic",
    ],
    defaultSpecialty: "General Physician",
    submitText: "Get AI Recommendations",
    footerText:
      "✨ Powered by advanced AI algorithms for accurate doctor matching",
  },
}: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation immediately after mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full relative overflow-hidden">
      {/* Enhanced Background with Dark Mode Support */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-blue-50 via-blue-100/50 to-background dark:from-blue-950/30 dark:via-blue-900/20 dark:to-background" />
      
      {/* Animated Floating Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s", animationDelay: "1s" }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-20 lg:py-28">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column - Hero Content */}
            <div className={`flex flex-col justify-center space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Badge with Pulse Animation */}
              <div className="inline-flex items-center gap-3 self-start rounded-full bg-white dark:bg-card px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-100 dark:border-blue-900">
                <div className="animate-pulse">
                  <SparkleIcon />
                </div>
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 tracking-wide">
                  {badge.text}
                </span>
              </div>

              {/* Heading with Staggered Animation */}
              <div className="space-y-2">
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                  {heading.line1}
                </h1>
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 leading-tight transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                  {heading.line2}
                </h1>
              </div>

              {/* Description */}
              <div className={`space-y-1 text-muted-foreground transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {description.map((line, index) => (
                  <p key={index} className="text-base md:text-lg">{line}</p>
                ))}
              </div>

              {/* Buttons with Hover Effects */}
              <div className={`flex flex-col gap-4 sm:flex-row transition-all duration-700 delay-[400ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {buttons.primary && (
                  <Button
                    onClick={buttons.primary.onClick}
                    className="h-12 gap-2 rounded-xl bg-blue-600 dark:bg-blue-700 px-8 text-base hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                  >
                    <Search className="size-5 transition-transform duration-300 group-hover:rotate-12" />
                    {buttons.primary.text}
                  </Button>
                )}
                {buttons.secondary && (
                  <Button
                    onClick={buttons.secondary.onClick}
                    variant="outline"
                    className="h-12 gap-2 rounded-xl border-2 border-blue-600 dark:border-blue-500 px-8 text-base text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                  >
                    <Calendar className="size-5 transition-transform duration-300 group-hover:scale-110" />
                    {buttons.secondary.text}
                  </Button>
                )}
              </div>

              {/* Stats with Counter Animation */}
              <div className={`flex items-center justify-between gap-4 pt-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-2 group cursor-default">
                    <div className="flex items-center gap-2">
                      <p className="text-3xl md:text-4xl font-bold text-foreground transition-transform duration-300 group-hover:scale-110">{stat.value}</p>
                      {stat.icon && <div className="animate-bounce" style={{ animationDuration: "2s" }}>{stat.icon}</div>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Form Card */}
            <div className={`flex items-center justify-center lg:justify-end transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-card p-8 shadow-2xl dark:shadow-blue-900/20 border border-gray-100 dark:border-border hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
                {/* Card Header */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">{formCard.title}</h2>
                  <div className="animate-spin" style={{ animationDuration: "8s" }}>
                    <LargeSparkleIcon />
                  </div>
                </div>

                {/* Form */}
                <form className="space-y-6">
                  {/* Symptoms Input */}
                  <div className="space-y-2 group">
                    <Label
                      htmlFor="symptoms"
                      className="text-sm font-medium text-foreground"
                    >
                      {formCard.symptomLabel}
                    </Label>
                    <Input
                      id="symptoms"
                      name="symptoms"
                      placeholder={formCard.symptomPlaceholder}
                      className="h-12 rounded-xl border-2 border-gray-200 dark:border-border focus:border-blue-500 dark:focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-700"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-blue-600 dark:bg-blue-700 text-base font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
                  >
                    <span className="transition-all duration-300 group-hover:tracking-wide">{formCard.submitText}</span>
                  </Button>
                </form>

                {/* Footer */}
                <div className="mt-6 border-t border-gray-200 dark:border-border pt-4">
                  <p className="text-center text-sm text-muted-foreground">
                    {formCard.footerText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}