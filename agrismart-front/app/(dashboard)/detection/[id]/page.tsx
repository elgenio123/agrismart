"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { detectionResult } from "@/lib/mock-data";
import {
  Download,
  Users,
  MapPin,
  Calendar,
  ExternalLink,
  CheckSquare,
  AlertTriangle,
  Scan,
} from "lucide-react";

const priorityConfig = {
  urgent: { bg: "bg-red-500", text: "text-white" },
  recommended: { bg: "bg-primary-500", text: "text-white" },
  optional: { bg: "bg-gray-200", text: "text-gray-700" },
};

export default function DetectionPage() {
  const d = detectionResult;

  const severityPositions = {
    low: "16%",
    moderate: "50%",
    high: "84%",
    critical: "100%",
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-2 text-sm text-text-muted">
        <Link href="/history" className="hover:text-text-primary transition-colors">
          Analysis History
        </Link>
        {" > "}
        <span className="text-text-secondary">Detection Results</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">{d.diseaseName}</h1>
          <div className="mt-2 flex items-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-primary-500" />
              {d.crop} — {d.sector}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Scanned: {d.scannedDate}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Users className="h-4 w-4" />
            Consult Specialist
          </Button>
          <Button>
            <Download className="h-4 w-4" />
            Export Results
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* ─── Left: Image & Summary (3/5) ─── */}
        <div className="lg:col-span-3 space-y-6">
          {/* Analyzed Scan Area */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary-500 flex items-center justify-center">
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Analyzed Scan Area
              </h3>
              <button className="text-xs font-bold uppercase text-primary-600 hover:text-primary-700 transition-colors cursor-pointer tracking-wider">
                View Full Resolution
              </button>
            </div>
            {/* Image */}
            <div className="relative h-64 rounded-lg bg-gradient-to-br from-green-800 to-green-900 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/scans/leaf-disease.jpg')] bg-cover bg-center opacity-80" />
              {/* Infection marker */}
              <div className="absolute top-6 right-1/3 rounded bg-red-500/90 px-2.5 py-0.5">
                <span className="text-[10px] font-bold uppercase text-white tracking-wider">
                  Infection Core
                </span>
              </div>
            </div>
          </Card>

          {/* Clinical Summary */}
          <Card>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted mb-3">
              Clinical Summary
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              {d.clinicalSummary.split("Xanthomonas campestris").map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <em className="font-semibold text-text-primary">Xanthomonas campestris</em>
                  )}
                </React.Fragment>
              ))}
            </p>
          </Card>

          {/* Suggested Actions */}
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-text-primary mb-4">
              <div className="h-6 w-6 rounded bg-primary-500 flex items-center justify-center">
                <CheckSquare className="h-3.5 w-3.5 text-white" />
              </div>
              Suggested Actions & Treatment
            </h2>
            <div className="space-y-3">
              {d.suggestedActions.map((action) => {
                const p = priorityConfig[action.priority];
                return (
                  <Card key={action.id} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-secondary text-text-primary font-bold text-sm shrink-0">
                      {action.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-text-primary">
                          {action.title}
                        </h3>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${p.bg} ${p.text}`}
                        >
                          {action.priority}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-text-secondary">
                        {action.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Right: Confidence & Severity (2/5) ─── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Confidence Level */}
          <Card className="text-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-6">
              Confidence Level
            </h3>
            {/* Circular gauge */}
            <div className="relative mx-auto h-32 w-32 mb-4">
              <svg className="h-32 w-32 -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(d.confidence / 100) * 351.9} 351.9`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-text-primary">{d.confidence}%</span>
                <span className="text-xs font-semibold uppercase text-primary-500">Optimal</span>
              </div>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              ML Vision model indicates high certainty based on 14.2k training
              markers.
            </p>
          </Card>

          {/* Severity Level */}
          <Card>
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4">
              Severity Level
            </h3>
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-text-muted">LOW</span>
              <span className="text-text-muted">MEDIUM</span>
              <span className={d.severityLevel === "high" ? "text-danger font-bold" : "text-text-muted"}>
                HIGH
              </span>
            </div>
            {/* Severity bar */}
            <div className="relative h-3 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 mb-3">
              <div
                className="absolute top-1/2 -translate-y-1/2 h-5 w-1 bg-white border border-gray-400 rounded-full shadow"
                style={{ left: severityPositions[d.severityLevel] || "50%" }}
              />
            </div>
            <div className="flex justify-end">
              <Badge variant="danger" size="sm" className="font-bold">
                <AlertTriangle className="h-3 w-3" />
                Current Status
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
