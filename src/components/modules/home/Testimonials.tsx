"use client";

import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import samplePhoto from "../../../assets/images/hero-doctor.jpg";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Robert Fox",
    role: "Patient",
    image: samplePhoto,
    quote:
      "The care and professionalism I received were outstanding. The doctors were knowledgeable and the staff was incredibly supportive throughout my treatment.",
    rating: 5,
  },
  {
    name: "Jane Cooper",
    role: "Patient",
    image: samplePhoto,
    quote:
      "A seamless experience from booking an appointment to the consultation. The use of technology for prescriptions and follow-ups is very convenient.",
    rating: 5,
  },
  {
    name: "Wade Warren",
    role: "Patient",
    image: samplePhoto,
    quote:
      "I highly recommend their services. The specialists are top-notch, and they truly focus on preventive care which has greatly improved my health.",
    rating: 5,
  },
];

const Testimonials = () => {
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
      className="bg-blue-50/50 dark:bg-blue-950/10 py-10 md:py-20 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className={cn(
          "text-center max-w-2xl mx-auto mb-12 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Client Says
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            We are committed to providing you with the best medical and
            healthcare services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name} 
              className={cn(
                "bg-background dark:bg-card relative overflow-hidden border-2 border-transparent",
                "hover:border-primary dark:hover:border-primary hover:shadow-2xl",
                "transition-all duration-500 cursor-default group hover:-translate-y-2",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8 relative">
                {/* Quote Icon with Animation */}
                <div className="absolute top-4 left-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  <Quote
                    className="text-primary/20 dark:text-primary/30"
                    size={56}
                  />
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Quote Text */}
                  <p className="text-muted-foreground leading-relaxed text-base pt-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 dark:bg-primary/30 rounded-full blur-md group-hover:blur-lg transition-all duration-500" />
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="rounded-full h-16 w-16 object-cover border-2 border-background dark:border-card shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-2">
                        {testimonial.role}
                      </p>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "text-yellow-400 fill-yellow-400 transition-transform duration-300 hover:scale-125",
                              isVisible && "animate-star-pop"
                            )}
                            size={16}
                            style={{ 
                              animationDelay: `${(index * 150) + (i * 100)}ms`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;