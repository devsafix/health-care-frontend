export interface UserInterface {
  id: string;
  email: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
  exp: number;
  iat: number;
}

export interface DoctorInterface {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: string;
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  averageRating: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  doctorSpecialties: DoctorSpecialty[];
  reviews: any[];
}

export interface DoctorSpecialty {
  specialtiesId: string;
  doctorId: string;
  specialties: Specialties;
}

export interface Specialties {
  id: string;
  title: string;
  icon: string;
}
