"use client";

import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import cardioDoc from "../../../assets/images/doctor-cardiologist.jpg";
import neurolDoc from "../../../assets/images/doctor-neurologist.jpg";
import orthoDoc from "../../../assets/images/doctor-orthopedic.jpg";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const doctors = [
  {
    name: "Dr. Cameron Williamson",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 23,
    image: cardioDoc,
  },
  {
    name: "Dr. Leslie Alexander",
    specialty: "Neurologist",
    rating: 4.8,
    reviews: 45,
    image: neurolDoc,
  },
  {
    name: "Dr. Robert Fox",
    specialty: "Orthopedic",
    rating: 4.9,
    reviews: 32,
    image: orthoDoc,
  },
];

const DoctorCard = ({ 
  doctor, 
  index, 
  isVisible 
}: { 
  doctor: (typeof doctors)[0];
  index: number;
  isVisible: boolean;
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden border-2 border-border/60 pt-0 rounded-2xl shadow-md",
        "bg-white dark:bg-card hover:shadow-2xl hover:border-primary dark:hover:border-primary",
        "transition-all duration-500 group hover:-translate-y-3",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <CardHeader className="flex flex-col items-center p-6 bg-muted/50 dark:bg-muted/20 relative overflow-hidden">
        {/* Animated Background Effect */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Doctor Image */}
        <div className="relative w-28 h-28 z-10">
          <div className="absolute inset-0 bg-primary/20 dark:bg-primary/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            className="rounded-full object-cover border-4 border-background dark:border-card shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-500"
          />
          {/* Status Indicator */}
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background dark:border-card z-20 animate-pulse" />
        </div>
      </CardHeader>

      <CardContent className="text-center px-6 pb-4 pt-6 relative">
        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
          {doctor.name}
        </CardTitle>
        <p className="text-sm text-primary dark:text-primary font-semibold mb-4">
          {doctor.specialty}
        </p>

        {/* Rating Section */}
        <div className="flex items-center justify-center gap-2 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-3 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-950/30 transition-colors duration-300">
          <Star className="text-yellow-400 fill-yellow-400 group-hover:scale-125 transition-transform duration-300" size={18} />
          <span className="font-bold text-foreground text-lg">{doctor.rating}</span>
          <span className="text-muted-foreground text-sm">
            ({doctor.reviews} reviews)
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center gap-3 p-5 pt-0 border-t border-border/40">
        <Button
          variant="outline"
          className="rounded-xl text-sm px-6 py-2 font-semibold border-2 hover:bg-muted dark:hover:bg-muted/50 transition-all duration-300 hover:scale-105 hover:border-primary dark:hover:border-primary group/btn"
        >
          <span className="group-hover/btn:tracking-wide transition-all duration-300">View Profile</span>
        </Button>
        <Button className="rounded-xl text-sm px-6 py-2 font-semibold hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg group/btn">
          <span className="group-hover/btn:tracking-wide transition-all duration-300">Book Now</span>
        </Button>
      </CardFooter>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Card>
  );
};

const TopRatedDoctors = () => {
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
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(147,51,234,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_50%,rgba(147,51,234,0.05),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className={cn(
          "text-center max-w-2xl mx-auto mb-12 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Top Rated Doctor
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Access to medical experts from various specialties, ready to provide
            you with top-notch medical services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <DoctorCard 
              key={doctor.name} 
              doctor={doctor} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div className={cn(
          "text-center mt-12 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )} style={{ transitionDelay: "600ms" }}>
          <Button 
            size="lg" 
            className="rounded-xl px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <span className="group-hover:tracking-wide transition-all duration-300">View All Doctors</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;