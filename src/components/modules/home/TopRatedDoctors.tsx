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

const DoctorCard = ({ doctor }: { doctor: (typeof doctors)[0] }) => {
  return (
    <Card className="overflow-hidden border border-border/60 pt-0 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-col items-center p-6 bg-muted/50">
        <div className="relative w-24 h-24">
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            className="rounded-full object-cover border-4 border-background shadow-sm"
          />
        </div>
      </CardHeader>

      <CardContent className="text-center px-6 pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          {doctor.name}
        </CardTitle>
        <p className="text-sm text-primary font-medium mt-1">
          {doctor.specialty}
        </p>

        <div className="flex items-center justify-center mt-3 space-x-1 text-sm">
          <Star className="text-yellow-400 fill-yellow-400" size={16} />
          <span className="font-semibold text-foreground">{doctor.rating}</span>
          <span className="text-muted-foreground">
            ({doctor.reviews} reviews)
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center gap-3 p-5 pt-0 border-t border-border/40">
        <Button
          variant="outline"
          className="rounded-lg text-sm px-4 py-2 hover:bg-muted transition-colors"
        >
          View Profile
        </Button>
        <Button className="rounded-lg text-sm px-4 py-2">Book Now</Button>
      </CardFooter>
    </Card>
  );
};

const TopRatedDoctors = () => {
  return (
    <section className="bg-blue-50/50 py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">
            Our Top Rated Doctor
          </h2>
          <p className="text-muted-foreground mt-4">
            Access to medical experts from various specialties, ready to provide
            you with top-notch medical services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.name} doctor={doctor} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg">View All Doctors</Button>
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;
