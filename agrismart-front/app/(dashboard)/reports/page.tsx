"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { scans, historyStats } from "@/lib/mock-data";
import {
  FileText,
  Download,
  Plus,
  BarChart3,
  TrendingUp,
  Calendar,
  ChevronRight,
} from "lucide-react";

export default function ReportsPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Reports</h1>
          <p className="mt-1 text-text-secondary">
            View and download generated field analysis reports.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Download className="h-4 w-4" />
            Export All
          </Button>
          <Button>
            <Plus className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <Card className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium">Total Reports</p>
            <p className="text-2xl font-bold text-text-primary">
              {historyStats.generatedReports.toLocaleString()}
            </p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium">Avg Health Score</p>
            <p className="text-2xl font-bold text-text-primary">
              {historyStats.avgHealthIndex}%
            </p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium">Scans Analyzed</p>
            <p className="text-2xl font-bold text-text-primary">
              {historyStats.totalScans}
            </p>
          </div>
        </Card>
      </div>

      {/* Reports list */}
      <div className="space-y-3">
        {scans.map((scan) => (
          <Card key={scan.id} className="flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-secondary shrink-0">
              <FileText className="h-6 w-6 text-text-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-text-primary">
                {scan.fieldName} — {scan.crop} Analysis
              </h3>
              <p className="text-xs text-text-muted flex items-center gap-2 mt-0.5">
                <Calendar className="h-3 w-3" />
                {scan.date} at {scan.time}
                <span>•</span>
                ID: #{scan.id}
              </p>
            </div>
            <Badge
              variant={
                scan.status === "healthy"
                  ? "success"
                  : scan.status === "warning"
                  ? "warning"
                  : "danger"
              }
            >
              Health: {scan.healthIndex}
            </Badge>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Download className="h-3.5 w-3.5" />
              </Button>
              <Link href={`/detection/${scan.id}`}>
                <Button variant="outline" size="sm">
                  View <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
