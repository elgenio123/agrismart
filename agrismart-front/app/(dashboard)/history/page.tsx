"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { scans, historyStats } from "@/lib/mock-data";
import {
  Search,
  Calendar,
  Filter,
  BarChart3,
  Download,
  Plus,
  ChevronRight,
  AlertTriangle,
  TrendingUp,
  FileText,
} from "lucide-react";

const statusConfig = {
  healthy: { variant: "success" as const, icon: "●" },
  warning: { variant: "warning" as const, icon: "▲" },
  critical: { variant: "danger" as const, icon: "●" },
};

const cropColors: Record<string, string> = {
  Corn: "bg-primary-500 text-white",
  Soybeans: "bg-yellow-500 text-white",
  Wheat: "bg-amber-600 text-white",
};

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const filteredScans = scans.filter(
    (s) =>
      s.fieldName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Scan History & Reports
          </h1>
          <p className="mt-1 text-text-secondary">
            Access detailed analysis for {historyStats.totalScans} recorded field scans.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button>
            <Plus className="h-4 w-4" />
            New Scan
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search by F..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-4 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-secondary hover:bg-surface-secondary transition-colors cursor-pointer">
            <Calendar className="h-4 w-4" />
            Date: Last 30 Days
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-secondary hover:bg-surface-secondary transition-colors cursor-pointer">
            <Filter className="h-4 w-4" />
            Crop Type: All
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-secondary hover:bg-surface-secondary transition-colors cursor-pointer">
            <BarChart3 className="h-4 w-4" />
            Health Index: All
          </button>
          <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors cursor-pointer">
            Clear
          </button>
        </div>
      </Card>

      {/* Table */}
      <Card padding="none" className="mb-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-secondary">
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-text-muted">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-text-muted">
                  Field Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-text-muted">
                  Crop
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-text-muted">
                  Health Index
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-text-muted">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-text-muted">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredScans.map((scan) => {
                const cfg = statusConfig[scan.status];
                return (
                  <tr
                    key={scan.id}
                    className="border-b border-border-light hover:bg-surface-secondary/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-text-primary">{scan.date}</p>
                      <p className="text-xs text-text-muted">{scan.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-text-primary">{scan.fieldName}</p>
                      <p className="text-xs text-text-muted">ID: #{scan.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          cropColors[scan.crop] || "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {scan.crop}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <ProgressBar
                          value={scan.healthIndex}
                          variant={
                            scan.healthIndex >= 80
                              ? "success"
                              : scan.healthIndex >= 60
                              ? "warning"
                              : "danger"
                          }
                          className="w-20"
                        />
                        <span className="font-bold text-text-primary">
                          {scan.healthIndex}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant={cfg.variant}>
                        {cfg.icon}{" "}
                        {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/detection/${scan.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        View Report
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-6 py-3 bg-surface-secondary/50">
          <p className="text-sm text-text-muted">
            Showing 1 to {filteredScans.length} of {historyStats.totalScans} results
          </p>
          <div className="flex items-center gap-1">
            <button
              className="rounded-lg border border-border px-3 py-1.5 text-sm text-text-secondary hover:bg-white transition-colors cursor-pointer"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                  page === currentPage
                    ? "bg-primary-500 text-white"
                    : "border border-border text-text-secondary hover:bg-white"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              className="rounded-lg border border-border px-3 py-1.5 text-sm text-text-secondary hover:bg-white transition-colors cursor-pointer"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </Card>

      {/* Stats Footer */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Total Scans
            </p>
            <p className="text-2xl font-bold text-text-primary">
              {historyStats.totalScans}
            </p>
            <p className="text-xs text-primary-600 font-medium">
              {historyStats.scansTrend}
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Active Alerts
            </p>
            <p className="text-2xl font-bold text-text-primary">
              {historyStats.activeAlerts}
            </p>
            <p className="text-xs text-text-muted">
              {historyStats.alertsNote}
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Avg Health Index
            </p>
            <p className="text-2xl font-bold text-text-primary">
              {historyStats.avgHealthIndex}%
            </p>
            <p className="text-xs text-text-muted">
              {historyStats.healthNote}
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Generated Reports
            </p>
            <p className="text-2xl font-bold text-text-primary">
              {historyStats.generatedReports.toLocaleString()}
            </p>
            <p className="text-xs text-text-muted">
              {historyStats.reportsNote}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
