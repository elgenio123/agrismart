// ─── Roles ───────────────────────────────────────────────
export type UserRole = "admin" | "operations_manager" | "drone_operator" | "agronomist";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
}

// ─── Request Pipeline ────────────────────────────────────
export type RequestStatus =
  | "pending_approval"
  | "approved"
  | "scheduled"
  | "in_progress"
  | "awaiting_analysis"
  | "analysis_complete"
  | "validation_required"
  | "completed"
  | "rejected";

export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";

export interface ScanRequest {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmName: string;
  location: {
    region: string;
    coordinates: { lat: number; lng: number };
    address: string;
  };
  hectares: number;
  cropType: string;
  requestDate: string;
  scheduledDate?: string;
  completedDate?: string;
  status: RequestStatus;
  paymentStatus: PaymentStatus;
  paymentAmount: number;
  assignedOperator?: string;
  assignedAgronomist?: string;
  priority: "normal" | "high" | "urgent";
  notes?: string;
  droneImages?: number;
  analysisProgress?: number;
  detections?: Detection[];
  reportUrl?: string;
}

// ─── Detection / AI Results ─────────────────────────────
export type DiseaseSeverity = "low" | "moderate" | "high" | "critical";
export type DiseaseCategory = "fungal" | "bacterial" | "viral" | "nutrient" | "pest" | "physical";

export interface Detection {
  id: string;
  diseaseName: string;
  category: DiseaseCategory;
  severity: DiseaseSeverity;
  confidence: number;
  affectedArea: number;
  description: string;
  treatment: string;
}

// ─── Scheduling ──────────────────────────────────────────
export interface ScheduleEvent {
  id: string;
  requestId: string;
  farmerName: string;
  farmName: string;
  date: string;
  time: string;
  operatorId: string;
  operatorName: string;
  hectares: number;
  cropType: string;
  region: string;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
}

// ─── Drone Operators ─────────────────────────────────────
export interface DroneOperator {
  id: string;
  name: string;
  phone: string;
  region: string;
  status: "available" | "on_mission" | "off_duty";
  completedMissions: number;
  rating: number;
}

// ─── Agronomists ─────────────────────────────────────────
export interface Agronomist {
  id: string;
  name: string;
  specialization: string;
  validationsCompleted: number;
}

// ─── Analytics ───────────────────────────────────────────
export interface MonthlyRevenue {
  month: string;
  revenue: number;
  scans: number;
}

export interface DiseaseFrequency {
  disease: string;
  count: number;
  percentage: number;
}

export interface RegionActivity {
  region: string;
  scans: number;
  revenue: number;
}

// ─── Activity Feed ───────────────────────────────────────
export interface ActivityItem {
  id: string;
  type: "request" | "approval" | "schedule" | "scan" | "analysis" | "validation" | "completion" | "payment";
  message: string;
  timestamp: string;
  requestId?: string;
  user?: string;
}

// ─── Dashboard Stats ─────────────────────────────────────
export interface DashboardStats {
  totalRequests: number;
  pendingApprovals: number;
  scheduledScans: number;
  completedScans: number;
  monthlyRevenue: number;
  revenueChange: number;
  activeOperators: number;
  avgProcessingTime: string;
}

// ─── Report ──────────────────────────────────────────────
export interface Report {
  id: string;
  requestId: string;
  farmerName: string;
  farmName: string;
  cropType: string;
  region: string;
  completedDate: string;
  hectares: number;
  detectionsCount: number;
  overallHealth: "healthy" | "warning" | "critical";
  sentToFarmer: boolean;
}
