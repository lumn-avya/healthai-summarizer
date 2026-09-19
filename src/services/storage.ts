import { 
  MedicalReport, 
  VitalEntry, 
  JournalEntry, 
  PatientProfile, 
  AnatomyOrgan, 
  SpecialistDoctor, 
  NotificationAlert, 
  UnifiedTimelineEvent 
} from '../types';

export const INITIAL_PATIENT_PROFILE: PatientProfile = {
  name: 'Aarav Sharma',
  age: 48,
  gender: 'male',
  dob: '1978-04-14',
  bloodGroup: 'B+ Positive',
  location: 'Indiranagar, Bengaluru, Karnataka',
  aboutNote: 'Software engineering director. Managing mild stage-1 hypertension and pre-diabetes through lifestyle changes and prescribed medication. Active badminton player on weekends.',
  chronicConditions: [
    'Essential Hypertension (Mild / Managed)',
    'Impaired Fasting Glucose (Pre-diabetes)',
    'Occasional Lumbar Lower Back Strain'
  ],
  allergies: [
    'Penicillin (Causes cutaneous hives)',
    'Dust Mite / Pollen (Mild seasonal rhinitis)'
  ],
  ongoingMedications: [
    {
      name: 'Telmisartan 40mg',
      dosage: '1 tablet daily',
      frequency: 'Once a day',
      timing: 'Morning',
      purpose: 'Blood pressure control & cardiovascular protection'
    },
    {
      name: 'Metformin 500mg SR',
      dosage: '1 tablet daily',
      frequency: 'Once a day',
      timing: 'With Meals',
      purpose: 'Improves insulin sensitivity & glucose regulation'
    },
    {
      name: 'Rosuvastatin 10mg',
      dosage: '1 tablet at bedtime',
      frequency: 'Once a day',
      timing: 'Night',
      purpose: 'Cholesterol & arterial lipid stabilization'
    },
    {
      name: 'Vitamin D3 60,000 IU',
      dosage: '1 capsule weekly',
      frequency: 'Once weekly',
      timing: 'Morning',
      purpose: 'Bone & muscle wellness'
    }
  ],
  emergencyContact: {
    name: 'Priya Sharma',
    relation: 'Spouse',
    phone: '+91 98450 12345'
  }
};

export const ANATOMY_ORGANS: AnatomyOrgan[] = [
  {
    id: 'brain',
    name: 'Brain & Nervous System',
    commonSymptoms: ['Headache', 'Migraine', 'Dizziness', 'Brain Fog', 'Memory lapses', 'Insomnia'],
    specialistType: 'Neurologist',
    plainLanguageSummary: 'The control center for memory, balance, thinking, and nerve signals throughout your body.',
    suggestedQuestions: [
      'Could my frequent morning headaches be linked to blood pressure or screen fatigue?',
      'Are there non-pharmacological ways to improve sleep depth and mental focus?'
    ],
    position: [0, 1.62, 0.05],
    color: '#E10600',
    scale: [0.38, 0.42, 0.42]
  },
  {
    id: 'heart',
    name: 'Heart & Cardiovascular System',
    commonSymptoms: ['Chest tightness', 'Palpitations', 'High BP reading', 'Breathlessness on stairs', 'Fluttering heartbeat'],
    specialistType: 'Cardiologist',
    plainLanguageSummary: 'Your body’s pump that delivers oxygen and vital nutrients through blood vessels to every cell.',
    suggestedQuestions: [
      'Given my latest BP readings (128/82), is my current Telmisartan dosage working optimally?',
      'What target heart rate during badminton is safest for my cardiovascular profile?'
    ],
    position: [0.1, 0.88, 0.16],
    color: '#FF2800',
    scale: [0.34, 0.38, 0.35]
  },
  {
    id: 'lungs',
    name: 'Lungs & Respiratory System',
    commonSymptoms: ['Cough', 'Wheezing', 'Shortness of breath', 'Seasonal allergy wheeze', 'Chest congestion'],
    specialistType: 'Pulmonologist',
    plainLanguageSummary: 'Transfers fresh oxygen into your bloodstream while clearing out carbon dioxide.',
    suggestedQuestions: [
      'Does my seasonal morning cough require an inhaler or just allergy management?',
      'Is my SpO2 level consistently staying in the safe 98-99% range during workouts?'
    ],
    position: [-0.02, 0.90, 0.12],
    color: '#E09F3E',
    scale: [0.62, 0.48, 0.36]
  },
  {
    id: 'liver',
    name: 'Liver',
    commonSymptoms: ['Fatigue', 'Abdominal fullness', 'Bloating after fatty meals', 'Nausea'],
    specialistType: 'Gastroenterologist / Hepatologist',
    plainLanguageSummary: 'Your internal biochemical factory that detoxifies blood, processes medications, and balances cholesterol.',
    suggestedQuestions: [
      'Does my mild cholesterol fluctuation have any impact on liver enzymes like SGPT/SGOT?',
      'Are there specific dietary adjustments to safeguard liver metabolism with daily medication?'
    ],
    position: [-0.18, 0.48, 0.14],
    color: '#D4AF37',
    scale: [0.36, 0.32, 0.32]
  },
  {
    id: 'stomach',
    name: 'Stomach & Digestive Tract',
    commonSymptoms: ['Acid reflux', 'Heartburn', 'Bloating', 'Indigestion', 'Stomach ache'],
    specialistType: 'Gastroenterologist',
    plainLanguageSummary: 'Breaks down meals into fuel, absorbing water, vitamins, and energy.',
    suggestedQuestions: [
      'Could Metformin be contributing to my post-dinner acidity episodes?',
      'Would eating smaller meals earlier in the evening help my mild reflux?'
    ],
    position: [0.14, 0.48, 0.13],
    color: '#52B788',
    scale: [0.34, 0.30, 0.30]
  },
  {
    id: 'kidneys',
    name: 'Kidneys & Renal Filtration',
    commonSymptoms: ['Lower back flank discomfort', 'Ankle swelling', 'Foamy urine', 'Changes in urination frequency'],
    specialistType: 'Nephrologist',
    plainLanguageSummary: 'Two bean-shaped filters that cleanse waste from blood and balance body fluids and minerals.',
    suggestedQuestions: [
      'My Serum Creatinine is 1.05 mg/dL. Is this safe with my daily BP prescription?',
      'How much water should I drink daily considering my activity level and renal health?'
    ],
    position: [0, 0.32, -0.1],
    color: '#8A8A93',
    scale: [0.48, 0.28, 0.25]
  },
  {
    id: 'spine',
    name: 'Spine & Musculoskeletal Core',
    commonSymptoms: ['Lower back ache', 'Stiff neck', 'Radiating nerve tingling', 'Pain after prolonged desk sitting'],
    specialistType: 'Orthopedist / Spine Specialist',
    plainLanguageSummary: 'The central vertebral pillar and nervous highway protecting your spinal cord and bearing body weight.',
    suggestedQuestions: [
      'Does my L4-L5 disc desiccation shown on the MRI require physiotherapy or ergonomic changes?',
      'Are core-strengthening exercises safe while managing mild lower back strain?'
    ],
    position: [0, 0.65, -0.16],
    color: '#F6F5F2',
    scale: [0.18, 1.05, 0.18]
  },
  {
    id: 'knees',
    name: 'Knees & Weight-Bearing Joints',
    commonSymptoms: ['Knee joint ache', 'Popping or clicking sound', 'Stiffness after sitting', 'Pain after stairs or badminton'],
    specialistType: 'Orthopedic Surgeon / Rheumatologist',
    plainLanguageSummary: 'Crucial hinge joints supported by cartilage, ligaments, and fluid that enable walking, running, and climbing.',
    suggestedQuestions: [
      'Is my right knee stiffness after badminton an early sign of cartilage wear?',
      'Would supportive knee braces or low-impact swimming be better than court sports?'
    ],
    position: [0, -0.75, 0.08],
    color: '#D4AF37',
    scale: [0.55, 0.35, 0.35]
  }
];

export const INITIAL_SPECIALISTS: SpecialistDoctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Vivek Raghavan',
    specialty: 'Senior Consultant Cardiologist',
    degree: 'MD, DM (Cardiology), FACC',
    hospital: 'Manipal Hospital, Old Airport Road',
    distanceKm: 2.8,
    rating: 4.9,
    experienceYears: 19,
    consultationFee: '₹1,000',
    address: '98 HAL Airport Rd, Kodihalli, Bengaluru',
    matchingOrgans: ['heart'],
    teleconsultAvailable: true,
    nextSlot: 'Tomorrow at 10:30 AM'
  },
  {
    id: 'doc-2',
    name: 'Dr. Ananya Sengupta',
    specialty: 'Consultant Orthopedic & Spine Surgeon',
    degree: 'MS (Ortho), Fellowship in Spine Surgery (UK)',
    hospital: 'Apollo Spectra Hospitals, Koramangala',
    distanceKm: 4.2,
    rating: 4.8,
    experienceYears: 15,
    consultationFee: '₹900',
    address: '143 5th Block, Koramangala, Bengaluru',
    matchingOrgans: ['spine', 'knees'],
    teleconsultAvailable: true,
    nextSlot: 'Thursday at 04:00 PM'
  },
  {
    id: 'doc-3',
    name: 'Dr. Ramesh Sundaram',
    specialty: 'Endocrinologist & Diabetes Specialist',
    degree: 'MD (Med), DM (Endocrinology)',
    hospital: 'Fortis Hospital, Cunningham Road',
    distanceKm: 6.5,
    rating: 4.9,
    experienceYears: 22,
    consultationFee: '₹1,200',
    address: '14 Cunningham Rd, Vasanth Nagar, Bengaluru',
    matchingOrgans: ['liver', 'stomach'],
    teleconsultAvailable: true,
    nextSlot: 'Friday at 11:15 AM'
  },
  {
    id: 'doc-4',
    name: 'Dr. Meera Nambiar',
    specialty: 'Consultant Pulmonologist & Sleep Medicine',
    degree: 'DNB (Respiratory Diseases), FCCP',
    hospital: 'Aster CMI Hospital, Hebbal',
    distanceKm: 8.9,
    rating: 4.7,
    experienceYears: 13,
    consultationFee: '₹850',
    address: 'No. 43/2 New Airport Rd, Sahakar Nagar, Bengaluru',
    matchingOrgans: ['lungs'],
    teleconsultAvailable: true,
    nextSlot: 'Tomorrow at 02:30 PM'
  },
  {
    id: 'doc-5',
    name: 'Dr. Arvind Kulkarni',
    specialty: 'Consultant Neurologist',
    degree: 'MD, DM (Neurology), NIMHANS',
    hospital: 'Narayana Multispeciality Hospital, HSR',
    distanceKm: 5.1,
    rating: 4.9,
    experienceYears: 18,
    consultationFee: '₹1,100',
    address: 'Sector 3, HSR Layout, Bengaluru',
    matchingOrgans: ['brain', 'spine'],
    teleconsultAvailable: false,
    nextSlot: 'Wednesday at 05:00 PM'
  }
];

export const INITIAL_REPORTS: MedicalReport[] = [
  {
    id: 'rep-001',
    patientId: 'p-01',
    title: 'Comprehensive Metabolic & Lipid Profile',
    category: 'Blood Test',
    uploadDate: '2026-08-15',
    documentDate: '2026-08-14',
    facility: 'Anand Diagnostic Laboratory, Indiranagar',
    doctorName: 'Dr. Vivek Raghavan',
    fileType: 'pdf',
    pageCount: 3,
    fileName: 'Anand_Labs_Metabolic_Lipid_Aug2026.pdf',
    ocrConfidence: 98.4,
    aiSummary: 'Your fasting blood sugar (108 mg/dL) and HbA1c (5.8%) indicate mild pre-diabetes, which is holding steady. Cholesterol panel shows total cholesterol at 188 mg/dL and LDL at 112 mg/dL, showing good response to Rosuvastatin. Kidneys and liver markers are in healthy ranges.',
    flaggedCount: 2,
    rawTextPreview: `ANAND DIAGNOSTIC LABORATORY
PATIENT NAME: Aarav Sharma | AGE/SEX: 48 / M
REFERRING PHYSICIAN: Dr. Vivek Raghavan | DATE: 14-Aug-2026

BIOCHEMISTRY & METABOLIC PANEL:
Fasting Blood Sugar (Glucose): 108 mg/dL (Ref: 70 - 99 mg/dL) [ELEVATED]
HbA1c (Glycated Hemoglobin): 5.8 % (Ref: 4.0 - 5.6 %) [BORDERLINE]
Estimated Average Glucose: 120 mg/dL

LIPID PANEL:
Total Cholesterol: 188 mg/dL (Ref: < 200 mg/dL) [NORMAL]
HDL Cholesterol (Good): 46 mg/dL (Ref: > 40 mg/dL) [NORMAL]
LDL Cholesterol: 112 mg/dL (Ref: < 100 mg/dL) [MILD WATCH]
Triglycerides: 150 mg/dL (Ref: < 150 mg/dL) [NORMAL]

RENAL PROFILE:
Serum Creatinine: 1.02 mg/dL (Ref: 0.70 - 1.20 mg/dL) [NORMAL]
Estimated GFR: 88 mL/min/1.73m² (Ref: > 60 mL/min) [NORMAL]
Blood Urea Nitrogen (BUN): 16 mg/dL (Ref: 7 - 20 mg/dL) [NORMAL]`,
    extractedParameters: [
      {
        id: 'p-1',
        name: 'Fasting Blood Sugar',
        value: 108,
        unit: 'mg/dL',
        referenceRange: '70 - 99 mg/dL',
        status: 'watch',
        category: 'Metabolic',
        explanation: 'Slightly above normal fasting target. Reflects mild insulin resistance; maintain balanced low-glycemic evening meals.',
        historicalValues: [
          { date: '2026-02-10', value: 114 },
          { date: '2026-05-18', value: 111 },
          { date: '2026-08-14', value: 108 }
        ]
      },
      {
        id: 'p-2',
        name: 'HbA1c (3-Month Sugar Average)',
        value: 5.8,
        unit: '%',
        referenceRange: '4.0 - 5.6 %',
        status: 'watch',
        category: 'Metabolic',
        explanation: 'Your 90-day average blood sugar is in the pre-diabetic band. It has improved steadily from 6.2% over the last 6 months.',
        historicalValues: [
          { date: '2026-02-10', value: 6.2 },
          { date: '2026-05-18', value: 6.0 },
          { date: '2026-08-14', value: 5.8 }
        ]
      },
      {
        id: 'p-3',
        name: 'LDL Cholesterol',
        value: 112,
        unit: 'mg/dL',
        referenceRange: '< 100 mg/dL',
        status: 'watch',
        category: 'Cardiovascular',
        explanation: 'Known as the cholesterol to keep low. Down from 134 mg/dL last year, showing good adherence to Rosuvastatin.',
        historicalValues: [
          { date: '2026-02-10', value: 134 },
          { date: '2026-05-18', value: 122 },
          { date: '2026-08-14', value: 112 }
        ]
      },
      {
        id: 'p-4',
        name: 'Total Cholesterol',
        value: 188,
        unit: 'mg/dL',
        referenceRange: '< 200 mg/dL',
        status: 'normal',
        category: 'Cardiovascular',
        explanation: 'Healthy overall blood lipid concentration within the recommended zone.',
        historicalValues: [
          { date: '2026-02-10', value: 215 },
          { date: '2026-05-18', value: 198 },
          { date: '2026-08-14', value: 188 }
        ]
      },
      {
        id: 'p-5',
        name: 'Serum Creatinine',
        value: 1.02,
        unit: 'mg/dL',
        referenceRange: '0.70 - 1.20 mg/dL',
        status: 'normal',
        category: 'Renal',
        explanation: 'Reassuring sign of healthy kidney filtration. Safe while continuing your blood pressure medication.',
        historicalValues: [
          { date: '2026-02-10', value: 1.05 },
          { date: '2026-05-18', value: 1.01 },
          { date: '2026-08-14', value: 1.02 }
        ]
      }
    ]
  },
  {
    id: 'rep-002',
    patientId: 'p-01',
    title: 'Complete Blood Count (CBC) with Platelets',
    category: 'Blood Test',
    uploadDate: '2026-08-15',
    documentDate: '2026-08-14',
    facility: 'Anand Diagnostic Laboratory, Indiranagar',
    fileType: 'pdf',
    pageCount: 2,
    fileName: 'CBC_Hemogram_Aug2026.pdf',
    ocrConfidence: 99.1,
    aiSummary: 'All vital blood counts are well-balanced. Hemoglobin is solid at 14.8 g/dL, white blood cell count shows no acute infection, and platelet levels are normal.',
    flaggedCount: 0,
    rawTextPreview: `HEMATOLOGY REPORT - COMPLETE BLOOD COUNT:
Hemoglobin: 14.8 g/dL (Ref: 13.0 - 17.0 g/dL) [NORMAL]
Total WBC Count: 6,800 cells/cu.mm (Ref: 4,000 - 11,000) [NORMAL]
Platelet Count: 240,000 /cu.mm (Ref: 150,000 - 450,000) [NORMAL]
RBC Count: 5.1 mil/cu.mm (Ref: 4.5 - 5.9) [NORMAL]
PCV / Hematocrit: 44.2 % (Ref: 40 - 50 %) [NORMAL]`,
    extractedParameters: [
      {
        id: 'p-6',
        name: 'Hemoglobin',
        value: 14.8,
        unit: 'g/dL',
        referenceRange: '13.0 - 17.0 g/dL',
        status: 'normal',
        category: 'Hematology',
        explanation: 'Carries oxygen through your bloodstream. Strong and healthy level.',
        historicalValues: [
          { date: '2026-02-10', value: 14.5 },
          { date: '2026-08-14', value: 14.8 }
        ]
      },
      {
        id: 'p-7',
        name: 'Total WBC Count',
        value: 6800,
        unit: '/cu.mm',
        referenceRange: '4,000 - 11,000',
        status: 'normal',
        category: 'Hematology',
        explanation: 'Body defense cells. Normal count indicates no underlying acute bacterial or viral infection.'
      },
      {
        id: 'p-8',
        name: 'Platelets',
        value: 240000,
        unit: '/cu.mm',
        referenceRange: '150,000 - 450,000',
        status: 'normal',
        category: 'Hematology',
        explanation: 'Essential for normal blood clotting and vessel health.'
      }
    ]
  },
  {
    id: 'rep-003',
    patientId: 'p-01',
    title: 'MRI Lumbar Spine (Without Contrast)',
    category: 'Scan / X-ray / MRI',
    uploadDate: '2026-07-20',
    documentDate: '2026-07-19',
    facility: 'Aarthi Scans & Imaging, Indiranagar',
    doctorName: 'Dr. Ananya Sengupta',
    fileType: 'pdf',
    pageCount: 4,
    fileName: 'MRI_Lumbar_Spine_Jul2026.pdf',
    ocrConfidence: 96.2,
    aiSummary: 'Mild disc dehydration (desiccation) at L4-L5 with mild diffuse disc bulge. No critical spinal cord compression. The findings match muscular strain rather than severe disc herniation. Posture ergonomics and gentle core strengthening are recommended.',
    flaggedCount: 1,
    rawTextPreview: `IMAGING FINDINGS - MRI LUMBAR SPINE:
L1-L2, L2-L3, L3-L4: Normal disc height and signal intensity. Thecal sac and neural foramina patent.
L4-L5: Mild loss of disc hydration signal (disc desiccation). Mild broad-based posterior disc bulge indenting the anterior thecal sac without significant canal stenosis. Neural foramina appear patent.
L5-S1: Preserved disc height. No focal protrusion.
IMPRESSION: Mild degenerative disc changes at L4-L5 with mild diffuse bulge without neuro-compressive compromise.`,
    extractedParameters: [
      {
        id: 'p-9',
        name: 'L4-L5 Disc Finding',
        value: 'Mild Bulge / Desiccation',
        unit: 'Grade 1',
        referenceRange: 'Unremarkable',
        status: 'watch',
        category: 'General',
        explanation: 'Natural wear-and-tear cushion thinning. Common in active adults; responds well to physiotherapy.'
      }
    ]
  },
  {
    id: 'rep-004',
    patientId: 'p-01',
    title: 'Cardiology Review & Prescription Note',
    category: 'Doctor\'s Prescription',
    uploadDate: '2026-06-10',
    documentDate: '2026-06-10',
    facility: 'Manipal Hospital Outpatient Clinic',
    doctorName: 'Dr. Vivek Raghavan',
    fileType: 'photo',
    pageCount: 1,
    fileName: 'Prescription_DrRaghavan_Jun2026.jpg',
    ocrConfidence: 93.8,
    aiSummary: 'Cardiology review notes blood pressure trending comfortably at 126/82 mmHg. Maintain Telmisartan 40mg once daily in the morning. Re-check lipid and fasting glucose in 3 months.',
    flaggedCount: 0,
    rawTextPreview: `MANIPAL HOSPITAL OPD PRESCRIPTION
PATIENT: Aarav Sharma | BP: 126/82 mmHg | Pulse: 72 bpm
Adv:
1. Tab. Telmisartan 40mg - 1-0-0 (Morning after breakfast) x 3 months
2. Tab. Rosuvastatin 10mg - 0-0-1 (Night) x 3 months
3. Lifestyle: 30 mins moderate walk / sport 4x weekly. Low salt diet.
Review in 3 months with Lipid Panel and Fasting Glucose.`,
    extractedParameters: [
      {
        id: 'p-10',
        name: 'Recorded Clinic BP',
        value: '126 / 82',
        unit: 'mmHg',
        referenceRange: '< 120/80 mmHg',
        status: 'normal',
        category: 'Cardiovascular',
        explanation: 'Very close to ideal target and well-controlled with existing medication.'
      }
    ]
  }
];

export const INITIAL_VITALS: VitalEntry[] = [
  {
    id: 'v-1',
    timestamp: '2026-09-18T08:30:00Z',
    systolicBp: 124,
    diastolicBp: 80,
    glucose: 104,
    glucoseContext: 'fasting',
    heartRate: 71,
    spO2: 99,
    weightKg: 74.8,
    source: 'manual',
    notes: 'Morning measurement before breakfast. Slept 7.5 hours.'
  },
  {
    id: 'v-2',
    timestamp: '2026-09-16T20:15:00Z',
    systolicBp: 128,
    diastolicBp: 82,
    heartRate: 74,
    spO2: 98,
    source: 'photo-device-ocr',
    notes: 'Evening reading captured using Omron monitor screen OCR.'
  },
  {
    id: 'v-3',
    timestamp: '2026-09-14T08:15:00Z',
    systolicBp: 122,
    diastolicBp: 79,
    glucose: 106,
    glucoseContext: 'fasting',
    heartRate: 69,
    spO2: 99,
    weightKg: 75.1,
    source: 'manual'
  },
  {
    id: 'v-4',
    timestamp: '2026-09-11T08:45:00Z',
    systolicBp: 130,
    diastolicBp: 84,
    glucose: 112,
    glucoseContext: 'fasting',
    heartRate: 76,
    spO2: 98,
    weightKg: 75.3,
    source: 'manual',
    notes: 'Travelled to Delhi earlier this week, mild sleep disruption.'
  },
  {
    id: 'v-5',
    timestamp: '2026-09-08T08:00:00Z',
    systolicBp: 121,
    diastolicBp: 78,
    glucose: 103,
    glucoseContext: 'fasting',
    heartRate: 68,
    spO2: 99,
    weightKg: 75.0,
    source: 'manual'
  },
  {
    id: 'v-6',
    timestamp: '2026-09-01T08:30:00Z',
    systolicBp: 125,
    diastolicBp: 81,
    glucose: 107,
    glucoseContext: 'fasting',
    heartRate: 70,
    spO2: 98,
    weightKg: 75.5,
    source: 'manual'
  }
];

export const INITIAL_JOURNAL: JournalEntry[] = [
  {
    id: 'j-1',
    timestamp: '2026-09-18T19:00:00Z',
    symptomSeverity: 2,
    primarySymptom: 'Mild lower back stiffness',
    relatedOrganId: 'spine',
    contextTags: ['Long Desk Hours', 'Good Sleep'],
    medicationAdherence: 'all-taken',
    patientNote: 'Sat through 4 hours of sprint planning meetings. Did 10 mins of hamstring stretches in the evening and felt better.'
  },
  {
    id: 'j-2',
    timestamp: '2026-09-14T21:30:00Z',
    symptomSeverity: 1,
    primarySymptom: 'Right knee mild click',
    relatedOrganId: 'knees',
    contextTags: ['Exercise / Badminton', 'Diet Change'],
    medicationAdherence: 'all-taken',
    patientNote: 'Played 3 sets of badminton. Slight stiffness immediately after, but no joint swelling.'
  },
  {
    id: 'j-3',
    timestamp: '2026-09-10T22:00:00Z',
    symptomSeverity: 3,
    primarySymptom: 'Mild afternoon headache',
    relatedOrganId: 'brain',
    contextTags: ['Travel', 'Poor Sleep', 'High Stress'],
    medicationAdherence: 'all-taken',
    patientNote: 'Flight delay and airport coffee. Drank 1.5 liters of water in hotel and took a warm shower; headache subsided.'
  }
];

export const INITIAL_ALERTS: NotificationAlert[] = [
  {
    id: 'alt-1',
    timestamp: '2026-09-19T07:00:00Z',
    type: 'insight',
    title: 'Fasting Sugar Steady Trend',
    message: 'Your average fasting sugar over the last 14 days is 106 mg/dL, down 4% from last month. Great job keeping your post-dinner habits steady!',
    read: false,
    priority: 'low',
    actionLabel: 'View Trends',
    actionTarget: 'trends'
  },
  {
    id: 'alt-2',
    timestamp: '2026-09-17T11:00:00Z',
    type: 'reminder',
    title: 'Upcoming Review With Dr. Raghavan',
    message: 'Your 3-month cardiology follow-up is scheduled in 10 days. Consider preparing your question list with the Doctor Visit Prep Kit.',
    read: false,
    priority: 'medium',
    actionLabel: 'Open Prep Kit',
    actionTarget: 'prep-kit'
  },
  {
    id: 'alt-3',
    timestamp: '2026-09-15T09:00:00Z',
    type: 'gentle-alert',
    title: 'Vitals Log Milestone',
    message: 'You have logged blood pressure consistently for 3 straight weeks. Your systolic numbers remain well within your physician’s target band (<130).',
    read: true,
    priority: 'low'
  }
];

const STORAGE_KEY_PREFIX = 'healthai_v1_';

export class HealthDataStore {
  private get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage quota exceeded or private mode:', e);
    }
  }

  getProfile(): PatientProfile {
    return this.get<PatientProfile>('profile', INITIAL_PATIENT_PROFILE);
  }

  updateProfile(profile: PatientProfile): void {
    this.set('profile', profile);
  }

  getReports(): MedicalReport[] {
    return this.get<MedicalReport[]>('reports', INITIAL_REPORTS);
  }

  addReport(report: MedicalReport): void {
    const reports = this.getReports();
    this.set('reports', [report, ...reports]);
  }

  getVitals(): VitalEntry[] {
    return this.get<VitalEntry[]>('vitals', INITIAL_VITALS);
  }

  addVital(entry: VitalEntry): void {
    const vitals = this.getVitals();
    this.set('vitals', [entry, ...vitals]);
  }

  getJournal(): JournalEntry[] {
    return this.get<JournalEntry[]>('journal', INITIAL_JOURNAL);
  }

  addJournalEntry(entry: JournalEntry): void {
    const journal = this.getJournal();
    this.set('journal', [entry, ...journal]);
  }

  getAlerts(): NotificationAlert[] {
    return this.get<NotificationAlert[]>('alerts', INITIAL_ALERTS);
  }

  markAlertRead(id: string): void {
    const alerts = this.getAlerts().map(a => a.id === id ? { ...a, read: true } : a);
    this.set('alerts', alerts);
  }

  getSpecialists(): SpecialistDoctor[] {
    return INITIAL_SPECIALISTS;
  }

  getAnatomyOrgans(): AnatomyOrgan[] {
    return ANATOMY_ORGANS;
  }

  /**
   * Layer 3.2: Unified Life Timeline generator
   * Merges reports, vitals, and journal entries chronologically with high performance
   */
  getUnifiedTimeline(): UnifiedTimelineEvent[] {
    const reports = this.getReports();
    const vitals = this.getVitals();
    const journal = this.getJournal();

    const events: UnifiedTimelineEvent[] = [];

    // Map reports
    reports.forEach(r => {
      events.push({
        id: `tl-rep-${r.id}`,
        timestamp: `${r.documentDate}T10:00:00Z`,
        source: 'report',
        title: r.title,
        subtitle: `${r.category} • ${r.facility}`,
        badge: r.category,
        status: r.flaggedCount > 0 ? 'watch' : 'normal',
        reportId: r.id,
        details: {
          flaggedCount: r.flaggedCount,
          paramCount: r.extractedParameters.length,
          summary: r.aiSummary
        }
      });
    });

    // Map vitals
    vitals.forEach(v => {
      const parts: string[] = [];
      if (v.systolicBp && v.diastolicBp) parts.push(`BP ${v.systolicBp}/${v.diastolicBp} mmHg`);
      if (v.glucose) parts.push(`Sugar ${v.glucose} mg/dL (${v.glucoseContext || 'fasting'})`);
      if (v.heartRate) parts.push(`HR ${v.heartRate} bpm`);
      if (v.weightKg) parts.push(`${v.weightKg} kg`);

      const isWatch = (v.systolicBp && v.systolicBp > 135) || (v.glucose && v.glucose > 120);

      events.push({
        id: `tl-vit-${v.id}`,
        timestamp: v.timestamp,
        source: 'vital',
        title: parts.length > 0 ? parts.join(' • ') : 'Home Vitals Logged',
        subtitle: v.source === 'photo-device-ocr' ? 'Captured via Device Screen OCR' : 'Manual Self-Entry',
        badge: 'Home Vitals',
        status: isWatch ? 'watch' : 'normal',
        details: v
      });
    });

    // Map journal
    journal.forEach(j => {
      events.push({
        id: `tl-jnl-${j.id}`,
        timestamp: j.timestamp,
        source: 'journal',
        title: j.primarySymptom,
        subtitle: `Severity ${j.symptomSeverity}/10 • Meds: ${j.medicationAdherence === 'all-taken' ? 'All Taken' : 'Missed / Partial'}`,
        badge: 'Symptom Journal',
        status: j.symptomSeverity >= 6 ? 'attention' : j.symptomSeverity >= 3 ? 'watch' : 'normal',
        organHighlight: j.relatedOrganId,
        details: j
      });
    });

    // Sort descending by timestamp
    return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }
}

export const store = new HealthDataStore();
