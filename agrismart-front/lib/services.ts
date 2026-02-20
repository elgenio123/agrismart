import type { ScanRequest, RequestStatus } from "./types";

// ─── Simulated async delay ───────────────────────────────
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Request Status Transitions ──────────────────────────
const validTransitions: Record<RequestStatus, RequestStatus[]> = {
  pending_approval: ["approved", "rejected"],
  approved: ["scheduled"],
  scheduled: ["in_progress"],
  in_progress: ["awaiting_analysis"],
  awaiting_analysis: ["analysis_complete"],
  analysis_complete: ["validation_required"],
  validation_required: ["completed"],
  completed: [],
  rejected: [],
};

export function canTransition(from: RequestStatus, to: RequestStatus): boolean {
  return validTransitions[from]?.includes(to) ?? false;
}

export function getNextStatus(current: RequestStatus): RequestStatus | null {
  const next = validTransitions[current];
  return next && next.length > 0 ? next[0] : null;
}

// ─── Mock API calls ──────────────────────────────────────

export async function approveRequest(request: ScanRequest): Promise<ScanRequest> {
  await delay(800);
  return { ...request, status: "approved" };
}

export async function rejectRequest(request: ScanRequest): Promise<ScanRequest> {
  await delay(600);
  return { ...request, status: "rejected" };
}

export async function scheduleRequest(
  request: ScanRequest,
  date: string,
  operatorId: string
): Promise<ScanRequest> {
  await delay(1000);
  return { ...request, status: "scheduled", scheduledDate: date, assignedOperator: operatorId };
}

export async function uploadDroneImages(
  request: ScanRequest,
  imageCount: number,
  onProgress: (progress: number) => void
): Promise<ScanRequest> {
  // Simulate upload progress
  for (let i = 0; i <= 100; i += 10) {
    await delay(300);
    onProgress(i);
  }
  return { ...request, status: "awaiting_analysis", droneImages: imageCount };
}

export async function runAIAnalysis(
  request: ScanRequest,
  onProgress: (progress: number) => void
): Promise<ScanRequest> {
  // Simulate AI analysis progress
  for (let i = 0; i <= 100; i += 5) {
    await delay(200);
    onProgress(i);
  }
  return {
    ...request,
    status: "analysis_complete",
    analysisProgress: 100,
    detections: [
      {
        id: "det-auto-1",
        diseaseName: "Late Blight",
        category: "fungal",
        severity: "high",
        confidence: 94.2,
        affectedArea: 18,
        description: "Phytophthora infestans detected. Dark water-soaked lesions visible on leaf tissue.",
        treatment: "Apply copper-based fungicide (Mancozeb 75% WP) at 2g/L.",
      },
      {
        id: "det-auto-2",
        diseaseName: "Nitrogen Deficiency",
        category: "nutrient",
        severity: "moderate",
        confidence: 87.1,
        affectedArea: 25,
        description: "Yellowing of lower leaves indicating nitrogen deficiency.",
        treatment: "Apply urea fertilizer at 46kg N/ha.",
      },
    ],
  };
}

export async function validateResults(
  request: ScanRequest,
  agronomistId: string
): Promise<ScanRequest> {
  await delay(800);
  return {
    ...request,
    status: "completed",
    assignedAgronomist: agronomistId,
    completedDate: new Date().toISOString().split("T")[0],
    reportUrl: `/reports/${request.id}.pdf`,
  };
}

export async function transitionStatus(
  request: ScanRequest,
  newStatus: RequestStatus
): Promise<ScanRequest> {
  if (!canTransition(request.status, newStatus)) {
    throw new Error(`Cannot transition from ${request.status} to ${newStatus}`);
  }
  await delay(600);
  return { ...request, status: newStatus };
}

// ─── Format helpers ──────────────────────────────────────
export function formatCurrency(amount: number): string {
  return `XAF ${amount.toLocaleString()}`;
}

export function getStatusColor(status: RequestStatus): "success" | "warning" | "danger" | "info" | "neutral" {
  const map: Record<RequestStatus, "success" | "warning" | "danger" | "info" | "neutral"> = {
    pending_approval: "warning",
    approved: "info",
    scheduled: "info",
    in_progress: "warning",
    awaiting_analysis: "warning",
    analysis_complete: "success",
    validation_required: "warning",
    completed: "success",
    rejected: "danger",
  };
  return map[status];
}

export function getStatusLabel(status: RequestStatus): string {
  const map: Record<RequestStatus, string> = {
    pending_approval: "Pending Approval",
    approved: "Approved",
    scheduled: "Scheduled",
    in_progress: "In Progress",
    awaiting_analysis: "Awaiting Analysis",
    analysis_complete: "Analysis Complete",
    validation_required: "Needs Validation",
    completed: "Completed",
    rejected: "Rejected",
  };
  return map[status];
}
