"use client";

import React, { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { PageTransition, AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { scanRequests as initialRequests, agronomists } from "@/lib/mock-data";
import { formatCurrency, getStatusLabel, getStatusColor, runAIAnalysis, validateResults } from "@/lib/services";
import type { ScanRequest, Detection } from "@/lib/types";
import {
  Cpu,
  Upload,
  Image as ImageIcon,
  Play,
  CheckCircle2,
  AlertTriangle,
  Shield,
  FileCheck,
  Loader2,
  Camera,
  Zap,
  Bug,
  Leaf,
  Droplets,
  Send,
} from "lucide-react";

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

export default function ProcessingPage() {
  const [requests, setRequests] = useState<ScanRequest[]>(initialRequests);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Requests that are in processing states
  const processingRequests = requests.filter((r) =>
    ["in_progress", "awaiting_analysis", "analysis_complete", "validation_required", "completed"].includes(r.status)
  );

  const selected = selectedId ? requests.find((r) => r.id === selectedId) : null;

  const handleUploadImages = useCallback(async () => {
    if (!selected) return;
    setIsUploading(true);
    setUploadProgress(0);
    for (let i = 0; i <= 100; i += 8) {
      await new Promise((r) => setTimeout(r, 150));
      setUploadProgress(i);
    }
    setUploadProgress(100);
    const updated = { ...selected, droneImages: 247, status: "awaiting_analysis" as const };
    setRequests((prev) => prev.map((r) => (r.id === selected.id ? updated : r)));
    setIsUploading(false);
  }, [selected]);

  const handleRunAnalysis = useCallback(async () => {
    if (!selected) return;
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    const updated = await runAIAnalysis(selected, (p) => setAnalysisProgress(p));
    setRequests((prev) => prev.map((r) => (r.id === selected.id ? updated : r)));
    setIsAnalyzing(false);
  }, [selected]);

  const handleValidate = useCallback(async () => {
    if (!selected) return;
    setIsValidating(true);
    const updated = await validateResults(selected, "agr1");
    setRequests((prev) => prev.map((r) => (r.id === selected.id ? updated : r)));
    setIsValidating(false);
  }, [selected]);

  return (
    <PageTransition>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Scan Processing</h1>
          <p className="mt-1 text-sm text-text-secondary">Upload images, run AI analysis, and validate results</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* List */}
        <AnimateIn className="lg:col-span-2">
          <Card padding="none">
            <div className="p-4 border-b border-border">
              <h3 className="font-bold text-text-primary text-sm">Processing Pipeline</h3>
            </div>
            <div className="divide-y divide-border-light">
              {processingRequests.map((req) => (
                <button
                  key={req.id}
                  onClick={() => setSelectedId(req.id)}
                  className={`w-full flex items-center gap-3 p-4 text-left hover:bg-surface-secondary/50 transition-colors cursor-pointer ${
                    selectedId === req.id ? "bg-primary-50/50 border-l-2 border-primary-500" : ""
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-text-primary truncate">{req.farmName}</p>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">{req.id} · {req.hectares}ha · {req.cropType}</p>
                  </div>
                  <Badge variant={getStatusColor(req.status)} size="sm" dot>
                    {getStatusLabel(req.status)}
                  </Badge>
                </button>
              ))}
              {processingRequests.length === 0 && (
                <div className="py-12 text-center text-text-muted text-sm">
                  No requests in processing pipeline
                </div>
              )}
            </div>
          </Card>
        </AnimateIn>

        {/* Detail Panel */}
        <AnimateIn delay={0.1} className="lg:col-span-3">
          {selected ? (
            <div className="space-y-6">
              {/* Header */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-extrabold text-text-primary tracking-tight">{selected.farmName}</h2>
                    <p className="text-sm text-text-secondary">{selected.farmerName} · {selected.id}</p>
                  </div>
                  <Badge variant={getStatusColor(selected.status)} size="md" dot>
                    {getStatusLabel(selected.status)}
                  </Badge>
                </div>

                {/* Status Pipeline */}
                <div className="flex items-center gap-1 overflow-x-auto pb-2">
                  {(["in_progress", "awaiting_analysis", "analysis_complete", "completed"] as const).map((step, i) => {
                    const stepLabels = { in_progress: "Imaging", awaiting_analysis: "Upload", analysis_complete: "AI Analysis", completed: "Validated" };
                    const stepOrder = ["in_progress", "awaiting_analysis", "analysis_complete", "completed"];
                    const currentIdx = stepOrder.indexOf(selected.status);
                    const thisIdx = i;
                    const isDone = thisIdx < currentIdx || selected.status === "completed";
                    const isActive = thisIdx === currentIdx;
                    return (
                      <React.Fragment key={step}>
                        {i > 0 && <div className={`flex-1 h-0.5 min-w-4 ${isDone ? "bg-primary-500" : "bg-border"}`} />}
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          isDone ? "bg-primary-50 text-primary-600" : isActive ? "bg-amber-50 text-amber-600" : "bg-surface-secondary text-text-muted"
                        }`}>
                          {isDone ? <CheckCircle2 className="h-3 w-3" /> : isActive ? <Loader2 className="h-3 w-3 animate-spin" /> : <div className="h-3 w-3 rounded-full border border-current" />}
                          {stepLabels[step]}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </Card>

              {/* Step: Upload Images */}
              {(selected.status === "in_progress" || selected.status === "awaiting_analysis") && (
                <Card>
                  <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Camera className="h-4 w-4 text-blue-500" /> Drone Images
                  </h3>
                  {selected.droneImages ? (
                    <div className="rounded-lg bg-surface-secondary p-4 text-center">
                      <ImageIcon className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                      <p className="text-lg font-extrabold text-text-primary tabular-nums">{selected.droneImages} images</p>
                      <p className="text-xs text-text-muted">uploaded successfully</p>
                    </div>
                  ) : (
                    <div>
                      <div className="rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-primary-300 hover:bg-primary-50/30 transition-colors cursor-pointer group">
                        <Upload className="h-8 w-8 text-text-muted mx-auto mb-2 group-hover:text-primary-500 transition-colors" />
                        <p className="text-sm font-semibold text-text-primary">Upload Drone Images</p>
                        <p className="text-xs text-text-muted mt-1">Simulated — click below to upload</p>
                      </div>
                      {isUploading && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-text-secondary">Uploading...</span>
                            <span className="tabular-nums text-primary-600">{uploadProgress}%</span>
                          </div>
                          <ProgressBar value={uploadProgress} variant="primary" />
                        </div>
                      )}
                      <Button className="w-full mt-4" onClick={handleUploadImages} loading={isUploading}>
                        <Upload className="h-4 w-4" /> Simulate Upload (247 images)
                      </Button>
                    </div>
                  )}
                </Card>
              )}

              {/* Step: AI Analysis */}
              {selected.status === "awaiting_analysis" && (
                <Card>
                  <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-purple-500" /> AI Analysis
                  </h3>
                  {isAnalyzing ? (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Loader2 className="h-5 w-5 text-primary-500 animate-spin" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-text-primary">Processing {selected.droneImages} images...</p>
                          <p className="text-xs text-text-muted">AI model detecting crop diseases</p>
                        </div>
                        <span className="text-sm font-bold text-primary-600 tabular-nums">{analysisProgress}%</span>
                      </div>
                      <ProgressBar value={analysisProgress} variant="primary" size="md" />
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {["Segmentation", "Disease Detection", "Severity Mapping"].map((stage, i) => (
                          <div key={stage} className={`text-center rounded-lg p-2 text-xs font-semibold ${
                            analysisProgress > (i + 1) * 30 ? "bg-primary-50 text-primary-600" : "bg-surface-secondary text-text-muted"
                          }`}>
                            {stage}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Cpu className="h-10 w-10 text-text-muted mx-auto mb-3" />
                      <p className="text-sm text-text-secondary mb-4">Ready to run AI analysis on {selected.droneImages} images</p>
                      <Button onClick={handleRunAnalysis}>
                        <Play className="h-4 w-4" /> Start AI Analysis
                      </Button>
                    </div>
                  )}
                </Card>
              )}

              {/* Detection Results */}
              {selected.detections && selected.detections.length > 0 && (
                <Card>
                  <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-500" />
                    Detection Results
                    <Badge variant="neutral" size="sm">{selected.detections.length} findings</Badge>
                  </h3>
                  <StaggerContainer className="space-y-3" staggerAmount={0.08}>
                    {selected.detections.map((det) => {
                      const sev = severityConfig[det.severity] || severityConfig.moderate;
                      const CatIcon = categoryIcons[det.category] || Leaf;
                      return (
                        <StaggerItem key={det.id}>
                          <div className="rounded-lg border border-border-light p-4 hover:shadow-sm transition-shadow">
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
                              <div className="text-right">
                                <Badge variant={det.severity === "high" || det.severity === "critical" ? "danger" : det.severity === "moderate" ? "warning" : "success"} size="sm">
                                  {det.severity}
                                </Badge>
                                <p className="text-xs font-semibold text-text-primary mt-1 tabular-nums">{det.confidence}% confidence</p>
                              </div>
                            </div>
                            <p className="text-sm text-text-secondary leading-relaxed mb-2">{det.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-text-muted">Affected area: <strong className="text-text-primary">{det.affectedArea}%</strong></span>
                            </div>
                            <div className="mt-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
                              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Recommended Treatment</p>
                              {det.treatment}
                            </div>
                          </div>
                        </StaggerItem>
                      );
                    })}
                  </StaggerContainer>

                  {/* Validation Action */}
                  {(selected.status === "analysis_complete" || selected.status === "validation_required") && (
                    <div className="mt-6 rounded-lg border-2 border-dashed border-primary-200 bg-primary-50/30 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <FileCheck className="h-5 w-5 text-primary-600" />
                        <div>
                          <p className="text-sm font-bold text-text-primary">Agronomist Validation Required</p>
                          <p className="text-xs text-text-secondary">Review AI detections and validate findings before report delivery</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <select className="flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 focus:outline-none">
                          {agronomists.map((a) => (
                            <option key={a.id} value={a.id}>{a.name} — {a.specialization}</option>
                          ))}
                        </select>
                        <Button onClick={handleValidate} loading={isValidating}>
                          <CheckCircle2 className="h-4 w-4" /> Validate & Complete
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Completed — Send to Farmer */}
                  {selected.status === "completed" && (
                    <div className="mt-6 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-center">
                      <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                      <p className="text-sm font-bold text-emerald-800">Analysis Validated & Report Ready</p>
                      <p className="text-xs text-emerald-600 mt-1">Report has been generated and is ready for delivery</p>
                      <Button variant="primary" className="mt-3">
                        <Send className="h-4 w-4" /> Send Report to Farmer
                      </Button>
                    </div>
                  )}
                </Card>
              )}
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center py-20 text-center">
              <div className="h-14 w-14 rounded-xl bg-surface-secondary flex items-center justify-center mb-4">
                <Cpu className="h-7 w-7 text-text-muted" />
              </div>
              <p className="text-sm font-semibold text-text-primary">Select a request to process</p>
              <p className="text-xs text-text-muted mt-1 max-w-xs">Choose from the pipeline on the left to upload images, run AI analysis, or validate results</p>
            </Card>
          )}
        </AnimateIn>
      </div>
    </PageTransition>
  );
}
