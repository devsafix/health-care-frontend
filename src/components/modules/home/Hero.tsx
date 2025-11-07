"use client";

import { Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HeroProps } from "@/types/heroProps";

export function Hero({
  badge = {
    text: "AI-Powered Healthcare",
  },
  heading = {
    line1: "Find Your Perfect",
    line2: "Doctor with AI",
  },
  description = [
    "Our AI technology analyzes your symptoms, medical history",
    "and preferences to match you with the right doctor.",
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
    { value: "4.9", label: "Rating" },
  ],
  formCard = {
    title: "AI Doctor Finder",
    symptomLabel: "Symptoms",
    symptomPlaceholder: "e.g. headache, cough",
    submitText: "Get AI Recommendations",
    footerText: "Powered by AI-based recommendations",
  },
}: HeroProps) {
  return (
    <section className="w-full border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Content */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Badge */}
          <span className="text-xs tracking-wide font-medium px-3 py-1 border rounded-full text-foreground">
            {badge.text}
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {heading.line1} <br />
            <span className="text-primary">{heading.line2}</span>
          </h1>

          {/* Description */}
          <div className="space-y-1 text-muted-foreground">
            {description.map((line, i) => (
              <p key={i} className="text-base md:text-lg">
                {line}
              </p>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            {buttons.primary && (
              <Button onClick={buttons.primary.onClick} className="h-11 px-6">
                <Search className="h-4 w-4 mr-2" />
                {buttons.primary.text}
              </Button>
            )}

            {buttons.secondary && (
              <Button
                onClick={buttons.secondary.onClick}
                variant="outline"
                className="h-11 px-6"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {buttons.secondary.text}
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-10 pt-4">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form Card */}
        <div className="flex justify-end">
          <div className="w-full max-w-md rounded-xl border bg-card p-6">
            <h2 className="text-xl font-semibold mb-6 text-foreground">
              {formCard.title}
            </h2>

            <form className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="symptoms">{formCard.symptomLabel}</Label>
                <Input
                  id="symptoms"
                  placeholder={formCard.symptomPlaceholder}
                />
              </div>

              <Button type="submit" className="w-full h-11 font-medium">
                {formCard.submitText}
              </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-6 pt-4 border-t">
              {formCard.footerText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
