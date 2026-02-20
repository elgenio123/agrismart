"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageTransition, AnimateIn } from "@/components/ui/motion";
import { analysisResult } from "@/lib/mock-data";
import {
  Download,
  Scan,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Layers,
  MapPin,
  Upload,
} from "lucide-react";

const categoryColors: Record<string, { bg: string; text: string }> = {
  fungal: { bg: "bg-amber-100", text: "text-amber-700" },
  nutrient: { bg: "bg-blue-100", text: "text-blue-700" },
  physical: { bg: "bg-gray-100", text: "text-gray-700" },
  pest: { bg: "bg-red-100", text: "text-red-700" },
  bacterial: { bg: "bg-purple-100", text: "text-purple-700" },
};

const severityDotColors: Record<string, string> = {
  low: "bg-green-400",
  moderate: "bg-amber-400",
  high: "bg-red-400",
  critical: "bg-red-600",
};

export default function FieldsPage() {
  const a = analysisResult;

  return (
    <PageTransition>
      {/* Breadcrumb */}
      <div className="mb-2 text-sm text-text-muted">
        <Link href="/history" className="hover:text-text-primary transition-colors">
          Fields
        </Link>
        {" > "}
        <span className="text-text-secondary">{a.fieldPath.split(">").pop()?.trim()}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">
              Analysis: {a.flightName}
            </h1>
            <Badge
              variant={a.processingStatus === "processed" ? "success" : "warning"}
              size="md"
              className="font-bold uppercase"
            >
              {a.processingStatus}
            </Badge>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button>
            <Scan className="h-4 w-4" />
            New Scan
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* ─── Map Area (3/5) ─── */}
        <div className="lg:col-span-3">
          <AnimateIn>
          <Card padding="none" className="overflow-hidden">
            {/* Map placeholder */}
            <div className="relative h-[500px] bg-gradient-to-br from-green-100 via-green-50 to-stone-100">
              {/* Simulated map background */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-[15%] left-[20%] w-[30%] h-[25%] border-2 border-green-500 bg-green-500/10 rounded-sm flex items-start justify-end p-1">
                  <span className="rounded bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    Zone A-1
                  </span>
                </div>
                <div className="absolute top-[45%] left-[50%] w-[20%] h-[20%] border-2 border-orange-500 bg-orange-500/10 rounded-sm flex items-start justify-end p-1">
                  <span className="rounded bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    Zone B-1
                  </span>
                </div>
                <div className="absolute top-[70%] left-[40%] w-[25%] h-[18%] border-2 border-green-500 bg-green-500/10 rounded-sm flex items-start justify-end p-1">
                  <span className="rounded bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    Zone C-2
                  </span>
                </div>
              </div>

              {/* Map grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10">
                {[...Array(20)].map((_, i) => (
                  <React.Fragment key={i}>
                    <line x1={`${i * 5}%`} y1="0" x2={`${i * 5}%`} y2="100%" stroke="gray" strokeWidth="0.5" />
                    <line x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke="gray" strokeWidth="0.5" />
                  </React.Fragment>
                ))}
              </svg>

              {/* Road labels */}
              <div className="absolute top-[30%] left-[55%] text-[10px] text-gray-500 font-medium opacity-60">Wolf Creek</div>
              <div className="absolute top-[12%] left-[35%] text-[10px] text-gray-500 font-medium opacity-60">Lucas</div>

              {/* Map controls */}
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 backdrop-blur shadow-md hover:bg-white hover:scale-105 transition-all cursor-pointer">
                  <ZoomIn className="h-4 w-4 text-text-secondary" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 backdrop-blur shadow-md hover:bg-white hover:scale-105 transition-all cursor-pointer">
                  <ZoomOut className="h-4 w-4 text-text-secondary" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 backdrop-blur shadow-md hover:bg-white hover:scale-105 transition-all cursor-pointer">
                  <Maximize className="h-4 w-4 text-text-secondary" />
                </button>
              </div>

              <div className="absolute right-4 bottom-20 flex flex-col gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 backdrop-blur shadow-md hover:bg-white hover:scale-105 transition-all cursor-pointer">
                  <Layers className="h-4 w-4 text-text-secondary" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 backdrop-blur shadow-md hover:bg-white hover:scale-105 transition-all cursor-pointer">
                  <MapPin className="h-4 w-4 text-text-secondary" />
                </button>
              </div>

              {/* Coordinates bar */}
              {a.coordinates && (
                <div className="absolute bottom-0 left-0 right-0 bg-sidebar/80 backdrop-blur-sm text-white px-4 py-2 text-xs font-mono">
                  LAT: {a.coordinates.lat} | LON: {a.coordinates.lng} | ALT: {a.coordinates.alt}
                </div>
              )}
            </div>
          </Card>
          </AnimateIn>
        </div>

        {/* ─── Analysis Panel (2/5) ─── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Confidence Score */}
          <AnimateIn delay={0.1}>
          <Card>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-600 mb-4">
              AI Analysis Results
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div>
                <p className="text-3xl font-extrabold text-text-primary tabular-nums">
                  {a.confidence}%
                </p>
                <p className="text-sm text-text-muted">Confidence Score</p>
              </div>
              <div className="ml-auto">
                {/* Circular gauge */}
                <div className="relative h-16 w-16">
                  <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${(a.confidence / 100) * 175.9} 175.9`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Scan Date</span>
                <span className="font-medium text-text-primary">{a.scanDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Flight Duration</span>
                <span className="font-medium text-text-primary">{a.flightDuration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Total Area</span>
                <span className="font-medium text-text-primary">{a.totalArea} Hectares</span>
              </div>
            </div>
          </Card>
          </AnimateIn>

          {/* Detected Issues */}
          <AnimateIn delay={0.2}>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">
                Detected Issues ({a.issues.length})
              </h3>
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors cursor-pointer">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {a.issues.map((issue) => {
                const cat = categoryColors[issue.category] || categoryColors.physical;
                return (
                  <div key={issue.id} className="border-b border-border-light pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${severityDotColors[issue.severity]}`} />
                        <h4 className="font-semibold text-sm text-text-primary">
                          {issue.name}
                        </h4>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${cat.bg} ${cat.text}`}>
                        {issue.category}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                      {issue.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-text-muted font-mono">
                        ID: #{issue.id}
                      </span>
                      <Link
                        href={`/detection/${issue.id}`}
                        className="text-xs font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-0.5 transition-colors"
                      >
                        {issue.confidence}% Confidence →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
          </AnimateIn>

          {/* Upload Drop */}
          <AnimateIn delay={0.3}>
          <Card className="text-center border-dashed hover:border-primary-300 hover:bg-primary-50/30 transition-all duration-300 cursor-pointer group">
            <div className="py-4">
              <Upload className="mx-auto h-8 w-8 text-text-muted mb-2 group-hover:text-primary-500 transition-colors" />
              <p className="font-semibold text-sm text-text-primary">
                Upload New Scan
              </p>
              <p className="text-xs text-text-muted mt-1">
                Drag & drop .TIFF or .JPG files
              </p>
            </div>
          </Card>
          </AnimateIn>
        </div>
      </div>
    </PageTransition>
  );
}
