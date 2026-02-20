"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageTransition, StaggerContainer, StaggerItem, AnimateIn } from "@/components/ui/motion";
import { reports, scanRequests } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/services";
import type { Report } from "@/lib/types";
import {
  FileText,
  Download,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Send,
  X,
  Eye,
  Sprout,
  BarChart3,
  Loader2,
} from "lucide-react";

const healthConfig = {
  healthy: { label: "Healthy", variant: "success" as const, icon: CheckCircle2, color: "text-emerald-500" },
  warning: { label: "Warning", variant: "warning" as const, icon: AlertTriangle, color: "text-amber-500" },
  critical: { label: "Critical", variant: "danger" as const, icon: XCircle, color: "text-red-500" },
};

type FilterTab = "all" | "healthy" | "warning" | "critical";

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterTab>("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      const matchesSearch =
        !search ||
        r.farmName.toLowerCase().includes(search.toLowerCase()) ||
        r.farmerName.toLowerCase().includes(search.toLowerCase()) ||
        r.requestId.toLowerCase().includes(search.toLowerCase()) ||
        r.region.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || r.overallHealth === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const completedRequests = scanRequests.filter((r) => r.status === "completed");

  const handleDownload = async (reportId: string) => {
    setDownloading(reportId);
    await new Promise((r) => setTimeout(r, 1200));
    setDownloading(null);
  };

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: reports.length },
    { key: "healthy", label: "Healthy", count: reports.filter((r) => r.overallHealth === "healthy").length },
    { key: "warning", label: "Warning", count: reports.filter((r) => r.overallHealth === "warning").length },
    { key: "critical", label: "Critical", count: reports.filter((r) => r.overallHealth === "critical").length },
  ];

  return (
    <PageTransition>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Reports & History</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Completed scan reports delivered to farmers
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => handleDownload("all")}>
            <Download className="h-4 w-4" /> Export All
          </Button>
        </div>
      </div>

      {/* Stats */}
      <StaggerContainer className="grid gap-4 sm:grid-cols-4 mb-6" staggerAmount={0.08}>
        {[
          { label: "Total Reports", value: reports.length, icon: FileText, bg: "bg-blue-50", fg: "text-blue-600" },
          { label: "Completed Scans", value: completedRequests.length, icon: CheckCircle2, bg: "bg-emerald-50", fg: "text-emerald-600" },
          { label: "Sent to Farmer", value: reports.filter((r) => r.sentToFarmer).length, icon: Send, bg: "bg-purple-50", fg: "text-purple-600" },
          { label: "Critical Findings", value: reports.filter((r) => r.overallHealth === "critical").length, icon: AlertTriangle, bg: "bg-red-50", fg: "text-red-600" },
        ].map((stat) => (
          <StaggerItem key={stat.label}>
            <Card hover className="flex items-center gap-4">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.fg} shadow-sm shrink-0`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium">{stat.label}</p>
                <p className="text-2xl font-extrabold text-text-primary tabular-nums">{stat.value}</p>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Search + Filter Tabs */}
      <AnimateIn>
        <Card padding="none" className="mb-6">
          <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3">
            <div className="flex-1 max-w-sm">
              <Input placeholder="Search reports..." icon="search" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    filter === tab.key ? "bg-primary-50 text-primary-600" : "text-text-muted hover:bg-surface-secondary"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light bg-surface-secondary/50">
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-4 py-3">Report</th>
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-4 py-3 hidden md:table-cell">Region</th>
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Health</th>
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Detections</th>
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-4 py-3 hidden md:table-cell">Date</th>
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {filtered.map((report) => {
                  const hc = healthConfig[report.overallHealth];
                  const HealthIcon = hc.icon;
                  return (
                    <tr key={report.id} className="hover:bg-surface-secondary/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-secondary shrink-0">
                            <FileText className="h-4 w-4 text-text-muted" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-text-primary">{report.farmName}</p>
                            <p className="text-xs text-text-muted">{report.farmerName} · {report.requestId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-sm text-text-secondary flex items-center gap-1"><MapPin className="h-3 w-3" /> {report.region}</span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <Badge variant={hc.variant} size="sm" dot>
                          {hc.label}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="text-sm font-semibold text-text-primary tabular-nums">{report.detectionsCount}</span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-sm text-text-secondary">{report.completedDate}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedReport(report)}>
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" loading={downloading === report.id} onClick={() => handleDownload(report.id)}>
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-text-muted text-sm">No reports match your search</div>
            )}
          </div>
        </Card>
      </AnimateIn>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedReport(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setSelectedReport(null)} className="absolute top-4 right-4 text-text-muted hover:text-text-primary cursor-pointer">
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-text-primary tracking-tight">{selectedReport.farmName}</h2>
                <p className="text-sm text-text-secondary">{selectedReport.farmerName} · {selectedReport.requestId}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg bg-surface-secondary p-3">
                <p className="text-xs text-text-muted font-medium">Crop</p>
                <p className="text-sm font-semibold text-text-primary flex items-center gap-1 mt-0.5"><Sprout className="h-3.5 w-3.5 text-emerald-500" /> {selectedReport.cropType}</p>
              </div>
              <div className="rounded-lg bg-surface-secondary p-3">
                <p className="text-xs text-text-muted font-medium">Region</p>
                <p className="text-sm font-semibold text-text-primary flex items-center gap-1 mt-0.5"><MapPin className="h-3.5 w-3.5 text-blue-500" /> {selectedReport.region}</p>
              </div>
              <div className="rounded-lg bg-surface-secondary p-3">
                <p className="text-xs text-text-muted font-medium">Area</p>
                <p className="text-sm font-semibold text-text-primary">{selectedReport.hectares} hectares</p>
              </div>
              <div className="rounded-lg bg-surface-secondary p-3">
                <p className="text-xs text-text-muted font-medium">Completed</p>
                <p className="text-sm font-semibold text-text-primary flex items-center gap-1 mt-0.5"><Calendar className="h-3.5 w-3.5 text-purple-500" /> {selectedReport.completedDate}</p>
              </div>
            </div>

            {/* Health & Detections */}
            <div className="rounded-lg border border-border p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-text-primary">Overall Health</span>
                <Badge variant={healthConfig[selectedReport.overallHealth].variant} size="md" dot>
                  {healthConfig[selectedReport.overallHealth].label}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-text-muted" />
                <span className="text-sm text-text-secondary">{selectedReport.detectionsCount} disease detection{selectedReport.detectionsCount !== 1 ? "s" : ""} identified</span>
              </div>
            </div>

            {/* Delivery Status */}
            <div className={`rounded-lg p-4 mb-6 ${selectedReport.sentToFarmer ? "bg-emerald-50 border border-emerald-200" : "bg-amber-50 border border-amber-200"}`}>
              <div className="flex items-center gap-2">
                {selectedReport.sentToFarmer ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-800">Report delivered to farmer</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-semibold text-amber-800">Report not yet sent to farmer</span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1" loading={downloading === selectedReport.id} onClick={() => handleDownload(selectedReport.id)}>
                <Download className="h-4 w-4" /> Download PDF
              </Button>
              {!selectedReport.sentToFarmer && (
                <Button variant="secondary" className="flex-1">
                  <Send className="h-4 w-4" /> Send to Farmer
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
