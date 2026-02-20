"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageTransition, StaggerContainer, StaggerItem, AnimateIn, fadeUp } from "@/components/ui/motion";
import {
  dashboardStats,
  weather,
  scans,
  alerts,
} from "@/lib/mock-data";
import {
  LayoutDashboard,
  MapPin,
  AlertTriangle,
  Sun,
  Cloud,
  CloudSun,
  Wind,
  Droplets,
  Eye,
  ChevronRight,
  Scan,
  Bug,
  Droplet,
  Thermometer,
  Calendar,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const weatherIcons: Record<string, React.ReactNode> = {
  sun: <Sun className="h-10 w-10 text-yellow-400 drop-shadow-sm" />,
  cloud: <Cloud className="h-5 w-5 text-gray-400" />,
  "cloud-sun": <CloudSun className="h-5 w-5 text-yellow-400" />,
};

const alertIcons: Record<string, React.ReactNode> = {
  bug: <Bug className="h-5 w-5 text-red-500" />,
  droplet: <Droplet className="h-5 w-5 text-amber-500" />,
  thermometer: <Thermometer className="h-5 w-5 text-blue-500" />,
};

const statConfigs = [
  {
    label: "Total Fields Scanned",
    value: "totalFieldsScanned" as const,
    trend: "fieldsTrend" as const,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    Icon: LayoutDashboard,
    trendColor: "text-primary-600",
  },
  {
    label: "Overall Crop Health",
    value: "overallCropHealth" as const,
    trend: "healthTrend" as const,
    suffix: "%",
    subLabel: "healthLabel" as const,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    Icon: TrendingUp,
    trendColor: "text-primary-600",
  },
  {
    label: "Active Alerts/Risks",
    value: "activeAlerts" as const,
    trend: "alertsTrend" as const,
    subLabel: "alertsLabel" as const,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    Icon: AlertTriangle,
    trendColor: "text-red-500",
  },
];

export default function DashboardPage() {
  const recentScans = scans.slice(0, 3);

  return (
    <PageTransition>
      {/* Welcome Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&q=70&auto=format&fit=crop&h=300"
          alt="Farmer working in a lush green field"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sidebar/90 via-sidebar/70 to-sidebar/40" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-8 sm:py-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Good Morning, John!
            </h1>
            <p className="mt-1.5 text-primary-200 text-sm sm:text-base max-w-md">
              Your fields are looking stable today. Here is your farm status summary.
            </p>
          </div>
          <Link href="/history" className="mt-4 sm:mt-0">
            <Button className="bg-white text-sidebar hover:bg-gray-100">
              <Scan className="h-4 w-4" />
              Start New Scan
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ─── Left Column (2/3) ─── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Row */}
          <StaggerContainer className="grid gap-4 sm:grid-cols-3" staggerAmount={0.08}>
            {statConfigs.map((stat) => (
              <StaggerItem key={stat.label}>
                <Card hover className="flex items-center gap-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor} shadow-sm`}>
                    <stat.Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-text-muted truncate">{stat.label}</p>
                      <span className={`text-xs font-bold ${stat.trendColor}`}>
                        {dashboardStats[stat.trend]}
                      </span>
                    </div>
                    <p className="text-2xl font-extrabold text-text-primary tabular-nums">
                      {dashboardStats[stat.value]}
                      {stat.suffix || ""}{" "}
                      {stat.subLabel && (
                        <span className={`text-sm font-semibold ${stat.trendColor}`}>
                          {dashboardStats[stat.subLabel]}
                        </span>
                      )}
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Recent Drone Scans */}
          <AnimateIn>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary">
                Recent Drone Scans
              </h2>
              <Link
                href="/history"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                View All Scans
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <StaggerContainer className="grid gap-4 sm:grid-cols-3" staggerAmount={0.1}>
              {recentScans.map((scan) => (
                <StaggerItem key={scan.id}>
                  <Card padding="none" hover className="overflow-hidden group">
                    {/* Image area */}
                    <div className="relative h-40 bg-gradient-to-br from-green-700 to-green-900 overflow-hidden">
                      {scan.imageUrl && (
                        <div
                          className="absolute inset-0 bg-cover bg-center opacity-70 transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url(${scan.imageUrl})` }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      {scan.scanType && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="neutral" className="bg-black/60 text-white border-0 text-[10px] font-bold backdrop-blur-sm">
                            {scan.scanType}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-text-primary">
                        {scan.fieldName}
                      </h3>
                      <p className="mt-1 text-xs text-text-muted flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {scan.date}
                      </p>
                      <Link href={`/detection/${scan.id}`}>
                        <Button variant="primary" size="sm" className="mt-3 w-full text-xs">
                          View Analysis
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimateIn>
        </div>

        {/* ─── Right Column (1/3) ─── */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <AnimateIn delay={0.1}>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text-primary">Weather Forecast</h3>
                {weather.flightReady && (
                  <Badge variant="success" size="md" className="font-bold">
                    ✈ FLIGHT READY
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 mb-4">
                {weatherIcons.sun}
                <div>
                  <p className="text-3xl font-extrabold text-text-primary tabular-nums">
                    {weather.temperature}°C
                  </p>
                </div>
                <div className="ml-auto space-y-1.5 text-right text-xs">
                  <p className="flex items-center justify-end gap-1.5 text-text-muted">
                    <Wind className="h-3 w-3" />
                    <span className="font-medium text-text-primary">{weather.windSpeed}</span> km/h
                  </p>
                  <p className="flex items-center justify-end gap-1.5 text-text-muted">
                    <Droplets className="h-3 w-3" />
                    <span className="font-medium text-text-primary">{weather.humidity}</span>%
                  </p>
                  <p className="flex items-center justify-end gap-1.5 text-text-muted">
                    <Eye className="h-3 w-3" />
                    <span className="font-medium text-text-primary">{weather.visibility}</span>
                  </p>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <div className="grid grid-cols-3 gap-2">
                  {weather.forecast.map((day) => (
                    <div key={day.day} className="flex flex-col items-center gap-1.5 text-xs rounded-lg py-2 hover:bg-surface-secondary transition-colors">
                      <span className="font-semibold text-text-muted">{day.day}</span>
                      {weatherIcons[day.icon] || <Cloud className="h-5 w-5 text-gray-400" />}
                      <span className="font-bold text-text-primary">{day.tempHigh}°</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </AnimateIn>

          {/* Active Alerts */}
          <AnimateIn delay={0.2}>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text-primary">Active Alerts</h3>
                <Badge variant="danger" size="sm" className="font-bold" dot>
                  {alerts.length} NEW
                </Badge>
              </div>
              <div className="space-y-4">
                {alerts.map((alert, i) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-surface-secondary shrink-0">
                      {alertIcons[alert.icon] || <AlertTriangle className="h-5 w-5 text-amber-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-text-primary">
                        {alert.title}
                      </p>
                      <p className="text-xs text-text-muted">{alert.location}</p>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" className="text-xs h-7">
                          {alert.actionLabel}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs h-7">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </AnimateIn>
        </div>
      </div>
    </PageTransition>
  );
}
