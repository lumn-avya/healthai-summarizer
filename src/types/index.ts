export type HealthCategory = 
  | 'Blood Test'
  | 'Scan / X-ray / MRI'
  | 'Doctor\'s Prescription'
  | 'Referral Letter'
  | 'Other Report';

export type ValidationStatus = 'normal' | 'watch' | 'attention';

export interface ExtractedParameter {
  id: string;
  name: string;
  value: number | string;
  unit: string;
  referenceRange: string;
  status: ValidationStatus;
  explanation: string;
  category: 'Metabolic' | 'Cardiovascular' | 'Hematology' | 'Renal' | 'Hepatic' | 'General';
  historicalValues?: { date: string; value: number }[];
}

export interface MedicalReport {
  id: string;
  patientId: string;
  title: string;
  category: HealthCategory;
  uploadDate: string;
  documentDate: string;
  facility: string;
  doctorName?: string;
  fileType: 'pdf' | 'photo';
  pageCount: number;
  fileName: string;
  thumbnailUrl?: string;
  extractedParameters: ExtractedParameter[];
  rawTextPreview: string;
  ocrConfidence: number; // e.g. 96%
  aiSummary: string;
  flaggedCount: number;
}

export interface VitalEntry {
  id: string;
  timestamp: string;
  systolicBp?: number;
  diastolicBp?: number;
  glucose?: number;
  glucoseContext?: 'fasting' | 'post-prandial' | 'random';
  weightKg?: number;
  heartRate?: number;
  spO2?: number;
  temperatureC?: number;
  source: 'manual' | 'photo-device-ocr' | 'ble-sync';
  notes?: string;
}

export interface JournalEntry {
  id: string;
  timestamp: string;
  symptomSeverity: number; // 0 - 10
  primarySymptom: string;
  relatedOrganId?: string;
  contextTags: string[]; // e.g. 'Poor Sleep', 'High Stress', 'Travel', 'Diet Change'
  medicationAdherence: 'all-taken' | 'partially-taken' | 'skipped';
  patientNote: string;
}

export type TimelineSource = 'report' | 'vital' | 'journal';

export interface UnifiedTimelineEvent {
  id: string;
  timestamp: string;
  source: TimelineSource;
  title: string;
  subtitle: string;
  status?: ValidationStatus;
  badge: string;
  details?: Record<string, any>;
  reportId?: string;
  organHighlight?: string;
}

export interface PatientProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  dob: string;
  bloodGroup: string;
  location: string;
  aboutNote: string;
  chronicConditions: string[];
  allergies: string[];
  ongoingMedications: {
    name: string;
    dosage: string;
    frequency: string;
    timing: 'Morning' | 'Afternoon' | 'Night' | 'With Meals';
    purpose: string;
  }[];
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

export interface AnatomyOrgan {
  id: string;
  name: string;
  commonSymptoms: string[];
  specialistType: string;
  plainLanguageSummary: string;
  suggestedQuestions: string[];
  position: [number, number, number]; // 3D coordinates
  color: string;
  scale: [number, number, number];
  genderSpecific?: 'male' | 'female' | 'both';
}

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

export interface DoctorVisitPrepState {
  symptoms: string[];
  duration: string;
  changesObserved: string;
  currentMedsReview: string;
  generatedQuestions: string[];
  activeNotes: string;
}

export interface NotificationAlert {
  id: string;
  timestamp: string;
  type: 'insight' | 'reminder' | 'gentle-alert';
  title: string;
  message: string;
  read: boolean;
  priority: 'low' | 'medium';
  actionLabel?: string;
  actionTarget?: string;
}

export type IndianLanguage = 
  | 'en'
  | 'hi' // Hindi
  | 'bn' // Bengali
  | 'ta' // Tamil
  | 'te' // Telugu
  | 'mr' // Marathi
  | 'gu' // Gujarati
  | 'kn' // Kannada
  | 'ml' // Malayalam
  | 'pa' // Punjabi
  | 'or'; // Odia
