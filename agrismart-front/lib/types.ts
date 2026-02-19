// ─── User ────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "farmer" | "agronomist" | "manager" | "admin";
  plan: "free" | "premium" | "enterprise";
  avatarUrl?: string;
  language?: string;
}

// ─── Scan ────────────────────────────────────────────────
export type ScanStatus = "healthy" | "warning" | "critical";
export type ProcessingStatus = "processed" | "processing" | "pending" | "failed";

export interface Scan {
  id: string;
  date: string;
  time: string;
  fieldName: string;
  fieldId: string;
  crop: string;
  healthIndex: number;
  status: ScanStatus;
  imageUrl?: string;
  scanType?: "HD CAPTURE" | "NDVI INDEX" | "THERMAL";
}

// ─── Field ───────────────────────────────────────────────
export interface Field {
  id: string;
  name: string;
  location: string;
  cropType: string;
  status: ScanStatus;
  area?: number;
  zones?: Zone[];
}

export interface Zone {
  id: string;
  name: string;
  color: "green" | "orange" | "red";
  bounds?: { lat: number; lng: number }[];
}

// ─── Detection / Issue ───────────────────────────────────
export type IssueSeverity = "low" | "moderate" | "high" | "critical";
export type IssueCategory = "fungal" | "bacterial" | "nutrient" | "physical" | "pest";

export interface DetectedIssue {
  id: string;
  name: string;
  category: IssueCategory;
  severity: IssueSeverity;
  description: string;
  confidence: number;
  location?: string;
}

export interface DetectionResult {
  id: string;
  diseaseName: string;
  crop: string;
  sector: string;
  scannedDate: string;
  confidence: number;
  severityLevel: IssueSeverity;
  clinicalSummary: string;
  imageUrl: string;
  suggestedActions: SuggestedAction[];
  issues: DetectedIssue[];
}

export interface SuggestedAction {
  id: number;
  title: string;
  description: string;
  priority: "urgent" | "recommended" | "optional";
}

// ─── Analysis ────────────────────────────────────────────
export interface AnalysisResult {
  id: string;
  flightName: string;
  fieldPath: string;
  processingStatus: ProcessingStatus;
  confidence: number;
  scanDate: string;
  flightDuration: string;
  totalArea: number;
  issues: DetectedIssue[];
  coordinates?: { lat: string; lng: string; alt: string };
}

// ─── Specialist ──────────────────────────────────────────
export interface Specialist {
  id: string;
  name: string;
  title: string;
  avatarUrl?: string;
  tags: string[];
}

// ─── Chat ────────────────────────────────────────────────
export type MessageSender = "user" | "ai";

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  healthMetrics?: HealthMetrics;
  hasFollowUp?: boolean;
  followUpText?: string;
}

export interface HealthMetrics {
  sectorName: string;
  period: string;
  bars: { value: number; color: "green" | "red" }[];
  avgNdvi: number;
  ndviChange: number;
  soilMoisture: number;
  moistureStatus: "Low" | "Normal" | "High";
}

// ─── Alert ───────────────────────────────────────────────
export interface Alert {
  id: string;
  title: string;
  location: string;
  icon: string;
  actionLabel: string;
}

// ─── Weather ─────────────────────────────────────────────
export interface Weather {
  temperature: number;
  windSpeed: number;
  humidity: number;
  visibility: string;
  flightReady: boolean;
  forecast: { day: string; icon: string; tempHigh: number }[];
}

// ─── Settings ────────────────────────────────────────────
export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
}

export interface ManagedField {
  id: string;
  name: string;
  location: string;
  cropType: string;
  status: ScanStatus;
}
