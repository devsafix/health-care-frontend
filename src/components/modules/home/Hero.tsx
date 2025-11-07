"use client";

import {
  Search,
  Calendar,
  Sparkles,
  ArrowRight,
  Activity,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HeroProps } from "@/types/heroProps";
import { motion } from "framer-motion";
import { useState } from "react";

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
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Submitting symptoms:", symptoms);
  };

  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 self-start"
            >
              <span className="relative flex items-center gap-2 text-xs font-semibold tracking-wide px-4 py-2 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </motion.span>
                {badge.text}
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              </span>
            </motion.div>

            {/* Heading */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight"
              >
                {heading.line1}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3"
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-blue-500 leading-[1.1] tracking-tight">
                  {heading.line2}
                </h1>
                <motion.div
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Brain className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                </motion.div>
              </motion.div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-1 text-muted-foreground max-w-lg"
            >
              {description.map((line, i) => (
                <p key={i} className="text-lg leading-relaxed">
                  {line}
                </p>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {buttons.primary && (
                <Button
                  onClick={buttons.primary.onClick}
                  size="lg"
                  className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
                >
                  <Search className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  {buttons.primary.text}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}

              {buttons.secondary && (
                <Button
                  onClick={buttons.secondary.onClick}
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base font-semibold border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                >
                  <Calendar className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  {buttons.secondary.text}
                </Button>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-12 pt-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="space-y-1 relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-primary/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-3xl lg:text-4xl font-bold text-foreground relative">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium relative">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              {/* Card Glow Effect */}
              <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-50" />

              <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-8 shadow-2xl">
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {formCard.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="symptoms"
                      className="text-sm font-semibold text-foreground flex items-center gap-2"
                    >
                      {formCard.symptomLabel}
                      <span className="text-xs text-muted-foreground font-normal">
                        (Required)
                      </span>
                    </Label>
                    <div className="relative group">
                      <Input
                        id="symptoms"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder={formCard.symptomPlaceholder}
                        className="h-12 px-4 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      />
                      <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="w-full h-12 font-semibold text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                      {formCard.submitText}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    {formCard.footerText}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 border border-primary/10 rounded-full" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border border-primary/10 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
