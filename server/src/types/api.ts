export interface SpecialistDoctor {
  id: string;
  name: string;
  specialty: string;
  degree: string;
  hospital: string;
  distanceKm: number;
  rating: number;
  experienceYears: number;
  consultationFee: string;
  address: string;
  matchingOrgans: string[];
  teleconsultAvailable: boolean;
  nextSlot: string;
}
