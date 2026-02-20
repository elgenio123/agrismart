"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageTransition, StaggerContainer, StaggerItem, AnimateIn } from "@/components/ui/motion";
import { dashboardStats, activityFeed, scanRequests } from "@/lib/mock-data";
import { formatCurrency, getStatusLabel, getStatusColor } from "@/lib/services";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Users,
  Timer,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Activity,
  Send,
  Calendar,
  Cpu,
  FileCheck,
  CreditCard,
} from "lucide-react";

const stats = [
  { label: "Total Requests", value: dashboardStats.totalRequests, icon: ClipboardList, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Pending Approval", value: dashboardStats.pendingApprovals, icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Scheduled Scans", value: dashboardStats.scheduledScans, icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Completed", value: dashboardStats.completedScans, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Monthly Revenue", value: formatCurrency(dashboardStats.monthlyRevenue), icon: DollarSign, color: "text-green-600", bg: "bg-green-50", change: `+${dashboardStats.revenueChange}%` },
  { label: "Active Operators", value: dashboardStats.activeOperators, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
];

const activityIcons: Record<string, React.ElementType> = {
  request: ClipboardList,
  approval: CheckCircle2,
  schedule: Calendar,
  scan: Cpu,
  analysis: Activity,
  validation: FileCheck,
  completion: Send,
  payment: CreditCard,
};

export default function DashboardPage() {
  const pendingRequests = scanRequests.filter((r) => r.status === "pending_approval");
  const upcomingScans = scanRequests.filter((r) => r.status === "scheduled" || r.status === "in_progress");

  return (
    <PageTransition>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Operations Overview</h1>
          <p className="mt-1 text-sm text-text-secondary">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/requests">
            <Button variant="outline" size="sm">
              View Requests <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <StaggerContainer className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-6" staggerAmount={0.06}>
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <Card hover className="relative overflow-hidden">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color} mb-3 shadow-sm`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-medium text-text-muted mb-1">{stat.label}</p>
              <p className="text-xl font-extrabold text-text-primary tabular-nums">{stat.value}</p>
              {"change" in stat && stat.change && (
                <span className="inline-flex items-center gap-0.5 mt-1 text-xs font-semibold text-emerald-600">
                  <TrendingUp className="h-3 w-3" /> {stat.change}
                </span>
              )}
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Pending Requests */}
        <AnimateIn className="lg:col-span-3">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-text-primary flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Pending Approvals
                <Badge variant="warning" size="sm">{pendingRequests.length}</Badge>
              </h2>
              <Link href="/requests" className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center gap-1">
                View All <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {pendingRequests.slice(0, 4).map((req) => (
                <div
                  key={req.id}
                  className="flex items-center gap-4 rounded-lg border border-border-light p-3 hover:bg-surface-secondary/50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shrink-0 shadow-sm">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-text-primary truncate">{req.farmerName}</p>
                      {req.priority !== "normal" && (
                        <Badge variant={req.priority === "urgent" ? "danger" : "warning"} size="sm" dot>
                          {req.priority}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-text-muted truncate mt-0.5">
                      {req.farmName} · {req.hectares}ha · {req.cropType} · {req.location.region}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold text-text-primary tabular-nums">{formatCurrency(req.paymentAmount)}</p>
                    <Badge variant={req.paymentStatus === "paid" ? "success" : "warning"} size="sm" className="mt-1">
                      {req.paymentStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </AnimateIn>

        {/* Upcoming Scans */}
        <AnimateIn delay={0.1} className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-text-primary flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-500" />
                Upcoming Scans
              </h2>
              <Link href="/scheduling" className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center gap-1">
                Schedule <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingScans.map((req) => (
                <div
                  key={req.id}
                  className="rounded-lg border border-border-light p-3 hover:bg-surface-secondary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-text-primary">{req.farmName}</p>
                    <Badge variant={getStatusColor(req.status)} size="sm" dot>
                      {getStatusLabel(req.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span>{req.scheduledDate}</span>
                    <span>{req.hectares}ha</span>
                    <span>{req.cropType}</span>
                  </div>
                </div>
              ))}
              {upcomingScans.length === 0 && (
                <p className="text-sm text-text-muted text-center py-4">No upcoming scans</p>
              )}
            </div>
          </Card>
        </AnimateIn>
      </div>

      {/* Pipeline Overview & Activity */}
      <div className="grid gap-6 lg:grid-cols-5 mt-6">
        {/* Pipeline */}
        <AnimateIn className="lg:col-span-2">
          <Card>
            <h2 className="font-bold text-text-primary mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary-500" />
              Pipeline Summary
            </h2>
            <div className="space-y-3">
              {[
                { label: "Pending Approval", count: scanRequests.filter((r) => r.status === "pending_approval").length, color: "bg-amber-500" },
                { label: "Approved", count: scanRequests.filter((r) => r.status === "approved").length, color: "bg-blue-500" },
                { label: "Scheduled", count: scanRequests.filter((r) => r.status === "scheduled").length, color: "bg-purple-500" },
                { label: "In Progress", count: scanRequests.filter((r) => r.status === "in_progress").length, color: "bg-orange-500" },
                { label: "Analysis Complete", count: scanRequests.filter((r) => r.status === "analysis_complete").length, color: "bg-emerald-500" },
                { label: "Completed", count: scanRequests.filter((r) => r.status === "completed").length, color: "bg-green-600" },
              ].map((stage) => (
                <div key={stage.label} className="flex items-center gap-3">
                  <div className={`h-2.5 w-2.5 rounded-full ${stage.color} shrink-0`} />
                  <span className="flex-1 text-sm text-text-secondary">{stage.label}</span>
                  <span className="text-sm font-bold text-text-primary tabular-nums">{stage.count}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border-light">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Timer className="h-3.5 w-3.5" />
                Avg. processing time: <span className="font-semibold text-text-primary">{dashboardStats.avgProcessingTime}</span>
              </div>
            </div>
          </Card>
        </AnimateIn>

        {/* Activity Feed */}
        <AnimateIn delay={0.1} className="lg:col-span-3">
          <Card>
            <h2 className="font-bold text-text-primary mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-text-muted" />
              Recent Activity
            </h2>
            <div className="space-y-0">
              {activityFeed.slice(0, 8).map((item, i) => {
                const Icon = activityIcons[item.type] || Activity;
                return (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 py-3 ${i < activityFeed.length - 1 ? "border-b border-border-light" : ""}`}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-secondary text-text-muted shrink-0 mt-0.5">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary leading-relaxed">{item.message}</p>
                      <p className="text-xs text-text-muted mt-0.5">{item.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </AnimateIn>
      </div>
    </PageTransition>
  );
}
