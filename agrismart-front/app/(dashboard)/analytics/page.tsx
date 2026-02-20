"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageTransition, AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { monthlyRevenue, diseaseFrequency, regionActivity, dashboardStats } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/services";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  PieChart as PieIcon,
  MapPin,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react";

const CHART_COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899"];

export default function AnalyticsPage() {
  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);
  const totalScans = monthlyRevenue.reduce((s, m) => s + m.scans, 0);
  const avgRevenuePerScan = Math.round(totalRevenue / totalScans);
  const latestMonth = monthlyRevenue[monthlyRevenue.length - 1];
  const prevMonth = monthlyRevenue[monthlyRevenue.length - 2];
  const revenueGrowth = Math.round(((latestMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100);

  return (
    <PageTransition>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Business Analytics</h1>
          <p className="mt-1 text-sm text-text-secondary">Revenue, scan volume, disease trends, and regional performance</p>
        </div>
        <Badge variant="neutral" size="md">
          <CalendarDays className="h-3.5 w-3.5" /> Sep 2025 — Feb 2026
        </Badge>
      </div>

      {/* KPI Row */}
      <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6" staggerAmount={0.08}>
        {[
          { label: "Total Revenue", value: formatCurrency(totalRevenue), sub: "6 months", icon: DollarSign, bg: "bg-emerald-50", fg: "text-emerald-600" },
          { label: "Total Scans", value: totalScans.toString(), sub: `Avg ${formatCurrency(avgRevenuePerScan)}/scan`, icon: BarChart3, bg: "bg-blue-50", fg: "text-blue-600" },
          { label: "Monthly Growth", value: `${revenueGrowth > 0 ? "+" : ""}${revenueGrowth}%`, sub: `${latestMonth.month} vs ${prevMonth.month}`, icon: revenueGrowth > 0 ? TrendingUp : ArrowDownRight, bg: revenueGrowth > 0 ? "bg-emerald-50" : "bg-red-50", fg: revenueGrowth > 0 ? "text-emerald-600" : "text-red-600" },
          { label: "Active Regions", value: regionActivity.length.toString(), sub: "With scan activity", icon: MapPin, bg: "bg-purple-50", fg: "text-purple-600" },
        ].map((kpi) => (
          <StaggerItem key={kpi.label}>
            <Card hover className="flex items-center gap-4">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${kpi.bg} ${kpi.fg} shadow-sm shrink-0`}>
                <kpi.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium">{kpi.label}</p>
                <p className="text-2xl font-extrabold text-text-primary tabular-nums">{kpi.value}</p>
                <p className="text-xs text-text-muted">{kpi.sub}</p>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Charts Row 1 — Revenue & Scan Volume */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <AnimateIn>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary text-sm flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-500" /> Monthly Revenue
              </h3>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <ArrowUpRight className="h-3 w-3" /> {dashboardStats.revenueChange}%
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 13 }}
                    formatter={(value) => [formatCurrency(Number(value ?? 0)), "Revenue"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revenueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <Card>
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-blue-500" /> Scan Volume
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 13 }}
                    formatter={(value) => [Number(value ?? 0), "Scans"]}
                  />
                  <Bar dataKey="scans" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </AnimateIn>
      </div>

      {/* Charts Row 2 — Disease Frequency & Region Activity */}
      <div className="grid gap-6 lg:grid-cols-5 mb-6">
        {/* Disease Frequency Pie */}
        <AnimateIn className="lg:col-span-2">
          <Card>
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2 mb-4">
              <PieIcon className="h-4 w-4 text-amber-500" /> Disease Distribution
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diseaseFrequency}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="count"
                    nameKey="disease"
                  >
                    {diseaseFrequency.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 13 }}
                    formatter={(value, name) => [`${value} cases`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-1.5">
              {diseaseFrequency.slice(0, 5).map((d, i) => (
                <div key={d.disease} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: CHART_COLORS[i] }} />
                    <span className="text-text-secondary">{d.disease}</span>
                  </div>
                  <span className="font-semibold text-text-primary tabular-nums">{d.percentage}%</span>
                </div>
              ))}
            </div>
          </Card>
        </AnimateIn>

        {/* Region Activity */}
        <AnimateIn delay={0.1} className="lg:col-span-3">
          <Card>
            <h3 className="font-bold text-text-primary text-sm flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-purple-500" /> Regional Performance
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-light">
                    <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider pb-3">Region</th>
                    <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wider pb-3">Scans</th>
                    <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wider pb-3">Revenue</th>
                    <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wider pb-3 hidden sm:table-cell">Avg/Scan</th>
                    <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider pb-3 pl-4 hidden md:table-cell">Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {regionActivity.map((r) => {
                    const totalRegionRevenue = regionActivity.reduce((s, rr) => s + rr.revenue, 0);
                    const share = Math.round((r.revenue / totalRegionRevenue) * 100);
                    return (
                      <tr key={r.region} className="hover:bg-surface-secondary/30 transition-colors">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-text-muted" />
                            <span className="text-sm font-semibold text-text-primary">{r.region}</span>
                          </div>
                        </td>
                        <td className="py-3 text-right text-sm font-semibold text-text-primary tabular-nums">{r.scans}</td>
                        <td className="py-3 text-right text-sm text-text-secondary tabular-nums">{formatCurrency(r.revenue)}</td>
                        <td className="py-3 text-right text-sm text-text-muted tabular-nums hidden sm:table-cell">{formatCurrency(Math.round(r.revenue / r.scans))}</td>
                        <td className="py-3 pl-4 hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 rounded-full bg-surface-secondary overflow-hidden">
                              <div className="h-full rounded-full bg-primary-500 transition-all" style={{ width: `${share}%` }} />
                            </div>
                            <span className="text-xs font-semibold text-text-muted tabular-nums w-8 text-right">{share}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </AnimateIn>
      </div>
    </PageTransition>
  );
}
