import type {
  User,
  Scan,
  DetectionResult,
  AnalysisResult,
  Specialist,
  ChatMessage,
  Alert,
  Weather,
  ManagedField,
} from "./types";

// ─── Current User ────────────────────────────────────────
export const currentUser: User = {
  id: "usr-001",
  name: "John Miller",
  email: "john.harrison@agritech.com",
  phone: "+1 (555) 012-3456",
  role: "agronomist",
  plan: "premium",
  avatarUrl: "/avatars/user.jpg",
  language: "English (US)",
};

// ─── Scans ───────────────────────────────────────────────
export const scans: Scan[] = [
  {
    id: "SCN-48291",
    date: "Oct 24, 2023",
    time: "09:14 AM",
    fieldName: "North Valley A-12",
    fieldId: "field-001",
    crop: "Corn",
    healthIndex: 94,
    status: "healthy",
    imageUrl: "/scans/field-1.jpg",
    scanType: "HD CAPTURE",
  },
  {
    id: "SCN-48285",
    date: "Oct 22, 2023",
    time: "02:30 PM",
    fieldName: "East Plateau Plot 3",
    fieldId: "field-002",
    crop: "Soybeans",
    healthIndex: 72,
    status: "warning",
    imageUrl: "/scans/field-2.jpg",
    scanType: "NDVI INDEX",
  },
  {
    id: "SCN-48277",
    date: "Oct 20, 2023",
    time: "11:05 AM",
    fieldName: "South Creek Basin",
    fieldId: "field-003",
    crop: "Wheat",
    healthIndex: 89,
    status: "healthy",
    imageUrl: "/scans/field-3.jpg",
    scanType: "THERMAL",
  },
  {
    id: "SCN-48261",
    date: "Oct 18, 2023",
    time: "08:45 AM",
    fieldName: "West Ridge Slope",
    fieldId: "field-004",
    crop: "Corn",
    healthIndex: 42,
    status: "critical",
  },
  {
    id: "SCN-48255",
    date: "Oct 15, 2023",
    time: "10:12 AM",
    fieldName: "North Valley B-04",
    fieldId: "field-005",
    crop: "Corn",
    healthIndex: 88,
    status: "healthy",
  },
];

// ─── Detection Result ────────────────────────────────────
export const detectionResult: DetectionResult = {
  id: "det-001",
  diseaseName: "Bacterial Leaf Spot",
  crop: "Tomato Crop",
  sector: "Sector 7G",
  scannedDate: "Oct 24, 2023",
  confidence: 98.4,
  severityLevel: "high",
  clinicalSummary:
    "Visual markers indicate progressive chlorosis and necrotic lesions in Sector 7G. Patterns suggest Xanthomonas campestris pathology. Recent high humidity (84% avg) has accelerated the spread. Immediate intervention recommended to prevent systemic plot contamination.",
  imageUrl: "/scans/leaf-disease.jpg",
  suggestedActions: [
    {
      id: 1,
      title: "Immediate Isolation of Sector 7G",
      description:
        "Limit personnel movement through the infected area to prevent mechanical transmission via clothing or tools.",
      priority: "urgent",
    },
    {
      id: 2,
      title: "Copper-Based Fungicide Application",
      description:
        "Apply a preventative copper spray across adjacent healthy sectors (Sector 7F and 7H) to create a bio-barrier.",
      priority: "recommended",
    },
  ],
  issues: [],
};

// ─── Analysis Result ─────────────────────────────────────
export const analysisResult: AnalysisResult = {
  id: "analysis-001",
  flightName: "Flight_2023_10_24",
  fieldPath: "Fields > North Wheat Field - Section B",
  processingStatus: "processed",
  confidence: 94.2,
  scanDate: "Oct 24, 2023",
  flightDuration: "18 min 42s",
  totalArea: 12.4,
  coordinates: { lat: "38.1294° N", lng: "98.5412° W", alt: "45m" },
  issues: [
    {
      id: "DZ-4012",
      name: "Yellow Rust",
      category: "fungal",
      severity: "moderate",
      description:
        "Detected in Section B-4. Early signs of fungal infection. Requires localized treatment.",
      confidence: 91,
      location: "Section B-4",
    },
    {
      id: "DZ-4015",
      name: "N-Deficiency",
      category: "nutrient",
      severity: "low",
      description:
        "Lower nitrogen levels detected in Zone A-1. Growth rate slightly below average.",
      confidence: 98,
      location: "Zone A-1",
    },
    {
      id: "DZ-4018",
      name: "Irrigation Gap",
      category: "physical",
      severity: "low",
      description:
        "Dry patch detected in Zone C-2. Check sprinkler head #12.",
      confidence: 94,
      location: "Zone C-2",
    },
  ],
};

// ─── Specialists ─────────────────────────────────────────
export const specialists: Specialist[] = [
  {
    id: "spec-001",
    name: "Dr. Aris Thorne",
    title: "Soil Scientist",
    avatarUrl: "/avatars/specialist-1.jpg",
    tags: ["Nitrogen", "PH Balancing"],
  },
  {
    id: "spec-002",
    name: "Sarah Jenks",
    title: "Crop Pathologist",
    avatarUrl: "/avatars/specialist-2.jpg",
    tags: ["Fungal Experts", "Pest Control"],
  },
];

// ─── Chat Messages ───────────────────────────────────────
export const chatMessages: ChatMessage[] = [
  {
    id: "msg-001",
    sender: "ai",
    content:
      "Hello Julian! I'm your Specialist AI. I have access to your field data, drone telemetry, and soil sensor logs. How can I assist with your field analysis today?",
    timestamp: "10:00 AM",
  },
  {
    id: "msg-002",
    sender: "user",
    content:
      "Can you analyze the health of Sector B4? The last drone scan showed some yellowing in the corn canopy.",
    timestamp: "10:02 AM",
  },
  {
    id: "msg-003",
    sender: "ai",
    content:
      "Analyzing Sector B4 (Corn)... I've cross-referenced the latest Multispectral Drone Scan from 06:00 AM today with soil moisture sensors.\n\nI've detected a **12% decrease** in NDVI values over the last 48 hours. This suggests potential nitrogen deficiency or localized moisture stress in the upper quadrant.",
    timestamp: "10:03 AM",
    healthMetrics: {
      sectorName: "SECTOR B4",
      period: "Last 7 Days",
      bars: [
        { value: 70, color: "green" },
        { value: 65, color: "green" },
        { value: 68, color: "green" },
        { value: 60, color: "green" },
        { value: 80, color: "green" },
        { value: 40, color: "red" },
        { value: 35, color: "red" },
      ],
      avgNdvi: 0.62,
      ndviChange: -0.08,
      soilMoisture: 18,
      moistureStatus: "Low",
    },
    hasFollowUp: true,
    followUpText:
      "Would you like me to schedule a localized irrigation pulse or connect you with a Soil Scientist to review the nitrogen levels?",
  },
];

// ─── Alerts ──────────────────────────────────────────────
export const alerts: Alert[] = [
  {
    id: "alert-001",
    title: "Rust Fungus Detected",
    location: "East Parcel • Sector 02",
    icon: "bug",
    actionLabel: "Apply Treatment",
  },
  {
    id: "alert-002",
    title: "Low Irrigation Level",
    location: "North Ridge • Zone A",
    icon: "droplet",
    actionLabel: "Increase Flow",
  },
  {
    id: "alert-003",
    title: "Frost Warning",
    location: "Valley Orchard • All Sectors",
    icon: "thermometer",
    actionLabel: "Activate Heaters",
  },
];

// ─── Weather ─────────────────────────────────────────────
export const weather: Weather = {
  temperature: 24,
  windSpeed: 8,
  humidity: 42,
  visibility: "Clear",
  flightReady: true,
  forecast: [
    { day: "TUE", icon: "cloud", tempHigh: 22 },
    { day: "WED", icon: "sun", tempHigh: 25 },
    { day: "THU", icon: "cloud-sun", tempHigh: 26 },
  ],
};

// ─── Dashboard Stats ─────────────────────────────────────
export const dashboardStats = {
  totalFieldsScanned: 24,
  fieldsTrend: "+2%",
  overallCropHealth: 88,
  healthLabel: "Optimal",
  healthTrend: "+5%",
  activeAlerts: 3,
  alertsLabel: "Priority",
  alertsTrend: "-1%",
};

// ─── History Stats ───────────────────────────────────────
export const historyStats = {
  totalScans: 124,
  scansTrend: "↑ 12% from last month",
  activeAlerts: 8,
  alertsNote: "Requires attention",
  avgHealthIndex: 86.4,
  healthNote: "Stable performance",
  generatedReports: 1240,
  reportsNote: "Ready to download",
};

// ─── Managed Fields ──────────────────────────────────────
export const managedFields: ManagedField[] = [
  {
    id: "mf-001",
    name: "North Sector 01",
    location: "Salinas Valley, CA",
    cropType: "Organic Lettuce",
    status: "healthy",
  },
  {
    id: "mf-002",
    name: "East Ridge B",
    location: "Salinas Valley, CA",
    cropType: "Baby Spinach",
    status: "warning",
  },
];
