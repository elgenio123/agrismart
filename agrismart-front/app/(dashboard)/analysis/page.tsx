"use client";

import React, { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { PageTransition, AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { LocationMap } from "@/components/ui/location-map";
import { scanRequests as initialRequests } from "@/lib/mock-data";
import { formatCurrency, getStatusLabel, getStatusColor } from "@/lib/services";
import type { ScanRequest, Detection } from "@/lib/types";
import {
  Microscope,
  MapPin,
  Banana,
  Calendar,
  CreditCard,
  User,
  Camera,
  Cpu,
  Play,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Loader2,
  Bug,
  Zap,
  Leaf,
  Droplets,
  Send,
  ArrowLeft,
  Maximize2,
  Navigation,
  X,
  Image as ImageIcon,
} from "lucide-react";

/* ─── Severity & Category configs ─────────────────────── */
const severityConfig: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  low: { color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2 },
  moderate: { color: "text-amber-600", bg: "bg-amber-50", icon: AlertTriangle },
  high: { color: "text-red-600", bg: "bg-red-50", icon: AlertTriangle },
  critical: { color: "text-red-700", bg: "bg-red-100", icon: AlertTriangle },
};

const categoryIcons: Record<string, React.ElementType> = {
  fungal: Bug,
  bacterial: Bug,
  viral: Zap,
  nutrient: Droplets,
  pest: Bug,
  physical: Leaf,
};

/* ─── Mock heatmap infection points ───────────────────── */
interface InfectionPoint {
  id: string;
  lat: number;
  lng: number;
  disease: string;
  severity: "low" | "moderate" | "high" | "critical";
  radius: number; // metres affected
}

function generateInfectionPoints(baseLat: number, baseLng: number): InfectionPoint[] {
  const diseases = ["Black Sigatoka", "Banana Bunchy Top Virus", "Banana Weevil Damage", "Panama Disease"];
  const severities: InfectionPoint["severity"][] = ["critical", "high", "moderate", "low"];
  return [
    { id: "ip-1", lat: baseLat + 0.003, lng: baseLng - 0.002, disease: diseases[0], severity: severities[0], radius: 120 },
    { id: "ip-2", lat: baseLat - 0.002, lng: baseLng + 0.004, disease: diseases[1], severity: severities[1], radius: 85 },
    { id: "ip-3", lat: baseLat + 0.005, lng: baseLng + 0.001, disease: diseases[2], severity: severities[2], radius: 200 },
    { id: "ip-4", lat: baseLat - 0.004, lng: baseLng - 0.003, disease: diseases[0], severity: severities[1], radius: 150 },
    { id: "ip-5", lat: baseLat + 0.001, lng: baseLng + 0.006, disease: diseases[3], severity: severities[3], radius: 60 },
    { id: "ip-6", lat: baseLat - 0.001, lng: baseLng - 0.005, disease: diseases[2], severity: severities[2], radius: 110 },
  ];
}

/* ─── Mock detections from AI ─────────────────────────── */
const analysisDetections: Detection[] = [
  {
    id: "det-a1",
    diseaseName: "Black Sigatoka",
    category: "fungal",
    severity: "high",
    confidence: 96.3,
    affectedArea: 22,
    description: "Mycosphaerella fijiensis detected across the northern section. Dark streaks and necrotic lesions visible on leaf tissue. Spreading pattern indicates 2-3 weeks since onset.",
    treatment: "Apply systemic fungicide (Propiconazole 250 EC) at 0.5L/ha. Remove severely infected leaves. Improve air circulation between plants.",
  },
  {
    id: "det-a2",
    diseaseName: "Banana Bunchy Top Virus",
    category: "viral",
    severity: "critical",
    confidence: 91.8,
    affectedArea: 8,
    description: "BBTV symptoms detected — dark green streaks on petioles and midribs, leaves becoming narrow, stiff and erect with chlorotic margins. Concentrated in northeast quadrant.",
    treatment: "Immediately uproot and destroy infected plants. Apply insecticide (Imidacloprid 200 SL) to control aphid vectors. Replant with certified virus-free suckers.",
  },
  {
    id: "det-a3",
    diseaseName: "Banana Weevil Damage",
    category: "pest",
    severity: "moderate",
    confidence: 88.4,
    affectedArea: 15,
    description: "Cosmopolites sordidus tunneling damage detected in pseudostem bases in western section. Multiple weakened plants showing signs of premature toppling.",
    treatment: "Apply Beauveria bassiana bio-pesticide at pseudostem base. Set pheromone traps at 4 per hectare. Practice clean cultivation — remove old crop residues.",
  },
];

/* ─── Heatmap severity colors ─────────────────────────── */
const heatmapColors: Record<string, string> = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  moderate: "bg-amber-400",
  low: "bg-yellow-300",
};

/* ─── View type ───────────────────────────────────────── */
type ViewState = "list" | "detail" | "analyzing" | "results";

/* ═══════════════════════════════════════════════════════ */
export default function AnalysisPage() {
  const [requests] = useState<ScanRequest[]>(initialRequests);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<ViewState>("list");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [infectionPoints, setInfectionPoints] = useState<InfectionPoint[]>([]);
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent">("idle");

  // Scans ready for analysis (those with drone data)
  const analysisReady = requests.filter((r) =>
    ["in_progress", "awaiting_analysis", "analysis_complete", "completed"].includes(r.status)
  );

  const selected = selectedId ? requests.find((r) => r.id === selectedId) : null;

  const handleSelectScan = useCallback((id: string) => {
    setSelectedId(id);
    setView("detail");
    setAnalysisProgress(0);
    setInfectionPoints([]);
  }, []);

  const handleBack = useCallback(() => {
    setView("list");
    setSelectedId(null);
    setAnalysisProgress(0);
    setInfectionPoints([]);
  }, []);

  const handleLaunchAnalysis = useCallback(async () => {
    if (!selected) return;
    setView("analyzing");
    setAnalysisProgress(0);

    // Simulate AI analysis with progress
    for (let i = 0; i <= 100; i += 2) {
      await new Promise((r) => setTimeout(r, 100));
      setAnalysisProgress(i);
    }
    setAnalysisProgress(100);

    // Generate mock infection points based on farm location
    const points = generateInfectionPoints(
      selected.location.coordinates.lat,
      selected.location.coordinates.lng
    );
    setInfectionPoints(points);

    // Small delay then show results
    await new Promise((r) => setTimeout(r, 600));
    setView("results");
  }, [selected]);

  const handleSendResults = useCallback(async () => {
    setSendState("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setSendState("sent");
  }, []);

  const handleCloseSendModal = useCallback(() => {
    setShowSendModal(false);
    setSendState("idle");
  }, []);

  /* ─── Render: Scan Cards Grid ──────────────────────── */
  function renderScanCards() {
    return (
      <>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Analysis</h1>
            <p className="mt-1 text-sm text-text-secondary">
              Select a drone scan to analyze · {analysisReady.length} scans available
            </p>
          </div>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerAmount={0.05}>
          {analysisReady.map((req) => (
            <StaggerItem key={req.id}>
              <button
                onClick={() => handleSelectScan(req.id)}
                className="w-full text-left cursor-pointer group"
              >
                <Card hover className="h-full overflow-hidden transition-all group-hover:border-primary-300">
                  {/* Card header with gradient */}
                  <div className="relative -mx-6 -mt-6 px-5 py-4 bg-gradient-to-br from-slate-900 to-slate-800 mb-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Camera className="h-4 w-4 text-primary-400" />
                        <span className="text-xs font-semibold text-slate-300">{req.id}</span>
                      </div>
                      <Badge variant={getStatusColor(req.status)} size="sm" dot>
                        {getStatusLabel(req.status)}
                      </Badge>
                    </div>
                    <h3 className="text-base font-bold text-white mt-2 truncate">{req.farmName}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{req.farmerName}</p>

                    {/* Image count overlay */}
                    {req.droneImages && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/10 backdrop-blur-sm px-2 py-1">
                        <ImageIcon className="h-3 w-3 text-primary-300" />
                        <span className="text-[10px] font-bold text-white">{req.droneImages}</span>
                      </div>
                    )}
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <MapPin className="h-3.5 w-3.5 text-text-muted shrink-0" />
                      <span className="truncate">{req.location.region}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Maximize2 className="h-3.5 w-3.5 text-text-muted shrink-0" />
                      <span>{req.hectares}ha</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Banana className="h-3.5 w-3.5 text-text-muted shrink-0" />
                      <span>{req.cropType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Calendar className="h-3.5 w-3.5 text-text-muted shrink-0" />
                      <span>{req.scheduledDate || req.requestDate}</span>
                    </div>
                  </div>

                  {/* Detections preview if already analyzed */}
                  {req.detections && req.detections.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border-light">
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-xs font-semibold text-text-primary">{req.detections.length} detection{req.detections.length > 1 ? "s" : ""}</span>
                      </div>
                    </div>
                  )}
                </Card>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {analysisReady.length === 0 && (
          <Card className="flex flex-col items-center justify-center py-20 text-center">
            <Microscope className="h-10 w-10 text-text-muted mb-4" />
            <p className="text-sm font-semibold text-text-primary">No scans available</p>
            <p className="text-xs text-text-muted mt-1">Scans will appear here once drone imaging is complete</p>
          </Card>
        )}
      </>
    );
  }

  /* ─── Render: Scan Detail ──────────────────────────── */
  function renderScanDetail() {
    if (!selected) return null;

    return (
      <>
        {/* Back button + header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="h-5 w-px bg-border" />
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">{selected.farmName}</h1>
            <p className="text-sm text-text-secondary">{selected.farmerName} · {selected.id}</p>
          </div>
          <Badge variant={getStatusColor(selected.status)} size="md" dot>
            {getStatusLabel(selected.status)}
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left: Map + location */}
          <AnimateIn className="lg:col-span-3">
            <Card padding="none" className="overflow-hidden">
              {/* Map */}
              <LocationMap
                lat={selected.location.coordinates.lat}
                lng={selected.location.coordinates.lng}
                zoom={14}
                markerLabel={selected.farmName}
                className="h-72 sm:h-80 w-full"
              />

              {/* Location details bar */}
              <div className="px-5 py-4 border-t border-border-light bg-surface-secondary/30">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{selected.location.address}</p>
                    <p className="text-xs text-text-muted mt-0.5 font-mono">
                      {selected.location.coordinates.lat.toFixed(4)}°N, {selected.location.coordinates.lng.toFixed(4)}°E
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </AnimateIn>

          {/* Right: Scan details */}
          <AnimateIn delay={0.1} className="lg:col-span-2 space-y-5">
            {/* Key metrics */}
            <Card>
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <Microscope className="h-4 w-4 text-primary-500" /> Scan Details
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border-light p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Maximize2 className="h-3 w-3 text-text-muted" />
                    <p className="text-xs text-text-muted">Area</p>
                  </div>
                  <p className="text-xl font-extrabold text-text-primary tabular-nums">{selected.hectares}<span className="text-sm font-semibold text-text-muted ml-0.5">ha</span></p>
                </div>
                <div className="rounded-xl border border-border-light p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Camera className="h-3 w-3 text-text-muted" />
                    <p className="text-xs text-text-muted">Images</p>
                  </div>
                  <p className="text-xl font-extrabold text-text-primary tabular-nums">{selected.droneImages || "—"}</p>
                </div>
                <div className="rounded-xl border border-border-light p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Banana className="h-3 w-3 text-text-muted" />
                    <p className="text-xs text-text-muted">Crop</p>
                  </div>
                  <p className="text-base font-bold text-text-primary">{selected.cropType}</p>
                </div>
                <div className="rounded-xl border border-border-light p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <CreditCard className="h-3 w-3 text-text-muted" />
                    <p className="text-xs text-text-muted">Amount</p>
                  </div>
                  <p className="text-sm font-bold text-text-primary">{formatCurrency(selected.paymentAmount)}</p>
                </div>
              </div>
            </Card>

            {/* Farmer info */}
            <Card>
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-indigo-500" /> Farmer
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white text-xs font-bold shrink-0">
                  {selected.farmerName.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{selected.farmerName}</p>
                  <p className="text-xs text-text-muted">{selected.farmerPhone}</p>
                </div>
              </div>
              {selected.notes && (
                <div className="mt-3 rounded-lg bg-amber-50 border border-amber-100 p-3">
                  <p className="text-xs font-semibold text-amber-700 mb-0.5">Notes</p>
                  <p className="text-xs text-amber-800 leading-relaxed">{selected.notes}</p>
                </div>
              )}
            </Card>

            {/* Launch Analysis CTA */}
            <Card className="bg-gradient-to-br from-primary-50 to-emerald-50 border-primary-200">
              <div className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-3">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-text-primary">Launch AI Analysis</h3>
                <p className="text-xs text-text-secondary mt-1 mb-4 max-w-xs mx-auto">
                  Run our deep learning model on {selected.droneImages || 0} drone images to detect crop diseases
                </p>
                <Button
                  size="lg"
                  onClick={handleLaunchAnalysis}
                  disabled={!selected.droneImages}
                  className="w-full"
                >
                  <Play className="h-4 w-4" /> Launch Analysis
                </Button>
              </div>
            </Card>
          </AnimateIn>
        </div>
      </>
    );
  }

  /* ─── Render: Analyzing progress ───────────────────── */
  function renderAnalyzing() {
    if (!selected) return null;

    const stages = [
      { label: "Image Pre-processing", threshold: 15 },
      { label: "Spectral Segmentation", threshold: 35 },
      { label: "Disease Detection", threshold: 60 },
      { label: "Severity Classification", threshold: 80 },
      { label: "Heatmap Generation", threshold: 95 },
    ];

    return (
      <div className="max-w-2xl mx-auto mt-8">
        <AnimateIn>
          <Card className="text-center">
            <div className="py-8">
              {/* Spinning icon */}
              <div className="relative inline-flex mb-6">
                <div className="h-20 w-20 rounded-full bg-primary-50 flex items-center justify-center">
                  <Cpu className="h-8 w-8 text-primary-500" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-primary-300 border-t-primary-500 animate-spin" />
              </div>

              <h2 className="text-xl font-extrabold text-text-primary tracking-tight">
                Analyzing {selected.farmName}
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Processing {selected.droneImages} drone images...
              </p>

              {/* Progress */}
              <div className="mt-8 max-w-md mx-auto">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-text-secondary">Progress</span>
                  <span className="text-primary-600 tabular-nums">{analysisProgress}%</span>
                </div>
                <ProgressBar value={analysisProgress} variant="primary" size="md" />
              </div>

              {/* Pipeline stages */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {stages.map((stage) => {
                  const isActive = analysisProgress >= stage.threshold - 15 && analysisProgress < stage.threshold + 5;
                  const isDone = analysisProgress >= stage.threshold + 5;
                  return (
                    <div
                      key={stage.label}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        isDone
                          ? "bg-primary-50 text-primary-600"
                          : isActive
                            ? "bg-amber-50 text-amber-600 ring-1 ring-amber-200"
                            : "bg-surface-secondary text-text-muted"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : isActive ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <div className="h-3 w-3 rounded-full border border-current" />
                      )}
                      {stage.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </AnimateIn>
      </div>
    );
  }

  /* ─── Render: Results with Heatmap ─────────────────── */
  function renderResults() {
    if (!selected) return null;

    const overallAffected = analysisDetections.reduce((sum, d) => sum + d.affectedArea, 0);
    const healthyPercent = Math.max(100 - overallAffected, 0);

    return (
      <>
        {/* Back + header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Scans
          </button>
          <div className="h-5 w-px bg-border" />
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Analysis Results</h1>
            <p className="text-sm text-text-secondary">{selected.farmName} · {selected.id}</p>
          </div>
          <Button onClick={() => setShowSendModal(true)}>
            <Send className="h-4 w-4" /> Send to Farmer
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left: Heatmap + infection coordinates */}
          <AnimateIn className="lg:col-span-3 space-y-6">
            {/* Heatmap Visualization */}
            <Card padding="none" className="overflow-hidden">
              <div className="px-5 py-4 border-b border-border-light flex items-center justify-between">
                <h3 className="font-bold text-text-primary flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-primary-500" /> Disease Heatmap
                </h3>
                <Badge variant="danger" size="sm" dot>
                  {infectionPoints.length} infection zones
                </Badge>
              </div>

              {/* Map with overlay */}
              <div className="relative">
                <LocationMap
                  lat={selected.location.coordinates.lat}
                  lng={selected.location.coordinates.lng}
                  zoom={15}
                  markerLabel={selected.farmName}
                  className="h-80 sm:h-96 w-full"
                />

                {/* Simulated heatmap overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {infectionPoints.map((point) => {
                    // Position relative to center — approximate pixel position
                    const offsetLat = (point.lat - selected.location.coordinates.lat) * 12000;
                    const offsetLng = (point.lng - selected.location.coordinates.lng) * 12000;
                    const size = point.radius / 3;
                    return (
                      <div
                        key={point.id}
                        className={`absolute rounded-full ${heatmapColors[point.severity]} opacity-40 blur-md`}
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                          top: `calc(50% + ${-offsetLat}px - ${size / 2}px)`,
                          left: `calc(50% + ${offsetLng}px - ${size / 2}px)`,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="px-5 py-3 bg-surface-secondary/50 border-t border-border-light flex items-center gap-4 flex-wrap">
                <span className="text-xs font-semibold text-text-muted">Severity:</span>
                {(["critical", "high", "moderate", "low"] as const).map((s) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <div className={`h-3 w-3 rounded-full ${heatmapColors[s]}`} />
                    <span className="text-xs text-text-secondary capitalize">{s}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Infection Coordinates Table */}
            <Card padding="none">
              <div className="px-5 py-4 border-b border-border-light">
                <h3 className="font-bold text-text-primary flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-500" /> Infected Zone Coordinates
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface-secondary/50">
                      <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-text-muted">Zone</th>
                      <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-text-muted">Disease</th>
                      <th className="px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-text-muted">Severity</th>
                      <th className="px-4 py-2.5 text-right text-xs font-bold uppercase tracking-wider text-text-muted">Latitude</th>
                      <th className="px-4 py-2.5 text-right text-xs font-bold uppercase tracking-wider text-text-muted">Longitude</th>
                      <th className="px-4 py-2.5 text-right text-xs font-bold uppercase tracking-wider text-text-muted">Radius</th>
                    </tr>
                  </thead>
                  <tbody>
                    {infectionPoints.map((point, i) => (
                      <tr key={point.id} className="border-b border-border-light last:border-0 hover:bg-surface-secondary/30 transition-colors">
                        <td className="px-4 py-3">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-600 text-xs font-bold">
                            {i + 1}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-text-primary">{point.disease}</td>
                        <td className="px-4 py-3 text-center">
                          <Badge
                            variant={point.severity === "critical" || point.severity === "high" ? "danger" : point.severity === "moderate" ? "warning" : "success"}
                            size="sm"
                          >
                            {point.severity}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-xs text-text-secondary">{point.lat.toFixed(6)}°</td>
                        <td className="px-4 py-3 text-right font-mono text-xs text-text-secondary">{point.lng.toFixed(6)}°</td>
                        <td className="px-4 py-3 text-right text-text-secondary">{point.radius}m</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </AnimateIn>

          {/* Right: Detection results + summary */}
          <AnimateIn delay={0.1} className="lg:col-span-2 space-y-5">
            {/* Health Summary */}
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" /> Health Summary
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="rounded-xl bg-white/10 p-3 text-center">
                  <p className="text-2xl font-extrabold text-white tabular-nums">{analysisDetections.length}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Diseases</p>
                </div>
                <div className="rounded-xl bg-white/10 p-3 text-center">
                  <p className="text-2xl font-extrabold text-red-400 tabular-nums">{overallAffected}%</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Affected</p>
                </div>
                <div className="rounded-xl bg-white/10 p-3 text-center">
                  <p className="text-2xl font-extrabold text-emerald-400 tabular-nums">{healthyPercent}%</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Healthy</p>
                </div>
              </div>
              {/* Health bar */}
              <div className="flex h-3 rounded-full overflow-hidden bg-white/10">
                <div className="bg-emerald-500 transition-all" style={{ width: `${healthyPercent}%` }} />
                <div className="bg-amber-400 transition-all" style={{ width: `15%` }} />
                <div className="bg-orange-500 transition-all" style={{ width: `${overallAffected - 15}%` }} />
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-slate-400">
                <span>Healthy</span>
                <span>Moderate</span>
                <span>Affected</span>
              </div>
            </Card>

            {/* Detection Cards */}
            <Card>
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Detections
                <Badge variant="neutral" size="sm">{analysisDetections.length}</Badge>
              </h3>

              <StaggerContainer className="space-y-3" staggerAmount={0.06}>
                {analysisDetections.map((det) => {
                  const sev = severityConfig[det.severity] || severityConfig.moderate;
                  const CatIcon = categoryIcons[det.category] || Leaf;
                  return (
                    <StaggerItem key={det.id}>
                      <div className="rounded-xl border border-border-light p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${sev.bg} ${sev.color} shrink-0`}>
                              <CatIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-text-primary">{det.diseaseName}</p>
                              <p className="text-xs text-text-muted capitalize">{det.category}</p>
                            </div>
                          </div>
                          <Badge
                            variant={det.severity === "high" || det.severity === "critical" ? "danger" : det.severity === "moderate" ? "warning" : "success"}
                            size="sm"
                          >
                            {det.severity}
                          </Badge>
                        </div>

                        <p className="text-xs text-text-secondary leading-relaxed mb-3">{det.description}</p>

                        <div className="flex items-center justify-between text-xs mb-3">
                          <span className="text-text-muted">Confidence: <strong className="text-text-primary tabular-nums">{det.confidence}%</strong></span>
                          <span className="text-text-muted">Area: <strong className="text-text-primary tabular-nums">{det.affectedArea}%</strong></span>
                        </div>

                        <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3 text-xs">
                          <p className="font-bold uppercase tracking-wider text-emerald-600 mb-1">Treatment</p>
                          <p className="text-emerald-800 leading-relaxed">{det.treatment}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </Card>

            {/* Send to farmer CTA */}
            <Card className="bg-gradient-to-br from-primary-50 to-emerald-50 border-primary-200">
              <div className="text-center">
                <CheckCircle2 className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                <h3 className="text-base font-bold text-text-primary">Analysis Complete</h3>
                <p className="text-xs text-text-secondary mt-1 mb-4">
                  Review the results above, then send the report to the farmer
                </p>
                <Button className="w-full" onClick={() => setShowSendModal(true)}>
                  <Send className="h-4 w-4" /> Send Results to Farmer
                </Button>
              </div>
            </Card>
          </AnimateIn>
        </div>
      </>
    );
  }

  /* ─── Send Results Modal ───────────────────────────── */
  function renderSendModal() {
    if (!showSendModal || !selected) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scale-in">
          {sendState === "sent" ? (
            <div className="flex flex-col items-center text-center py-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 mb-4">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-text-primary">Results Sent!</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                The analysis report for <span className="font-semibold text-text-primary">{selected.farmName}</span> has been sent to{" "}
                <span className="font-semibold text-text-primary">{selected.farmerName}</span>.
              </p>
              <div className="mt-3 rounded-lg bg-surface-secondary p-3 w-full text-xs text-text-muted">
                <p>Delivered via: SMS + App Notification</p>
                <p className="mt-0.5">Report includes: Heatmap, coordinates, treatment plan</p>
              </div>
              <Button className="mt-6 w-full" onClick={handleCloseSendModal}>
                Done
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-text-primary">Send Analysis Results</h3>
                <button
                  onClick={handleCloseSendModal}
                  className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface-secondary transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4 text-text-muted" />
                </button>
              </div>

              <div className="rounded-xl bg-surface-secondary p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white text-xs font-bold shrink-0">
                    {selected.farmerName.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{selected.farmerName}</p>
                    <p className="text-xs text-text-muted">{selected.farmerPhone}</p>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-text-secondary">
                  <div className="flex justify-between">
                    <span>Farm:</span>
                    <span className="font-semibold text-text-primary">{selected.farmName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Detections:</span>
                    <span className="font-semibold text-red-600">{analysisDetections.length} diseases found</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Infection zones:</span>
                    <span className="font-semibold text-text-primary">{infectionPoints.length} coordinates</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Report includes:</p>
                {["Disease heatmap of the farm", "Exact GPS coordinates of infected zones", "Disease identification & severity levels", "Recommended treatment protocols"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <Button
                className="w-full"
                onClick={handleSendResults}
                loading={sendState === "sending"}
              >
                <Send className="h-4 w-4" />
                {sendState === "sending" ? "Sending report..." : "Confirm & Send"}
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  /* ─── Main Render ──────────────────────────────────── */
  return (
    <PageTransition>
      {view === "list" && renderScanCards()}
      {view === "detail" && renderScanDetail()}
      {view === "analyzing" && renderAnalyzing()}
      {view === "results" && renderResults()}
      {renderSendModal()}
    </PageTransition>
  );
}
