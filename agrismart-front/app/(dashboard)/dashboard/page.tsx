"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

const weatherIcons: Record<string, React.ReactNode> = {
  sun: <Sun className="h-10 w-10 text-yellow-400" />,
  cloud: <Cloud className="h-5 w-5 text-gray-400" />,
  "cloud-sun": <CloudSun className="h-5 w-5 text-yellow-400" />,
};

const alertIcons: Record<string, React.ReactNode> = {
  bug: <Bug className="h-5 w-5 text-red-500" />,
  droplet: <Droplet className="h-5 w-5 text-amber-500" />,
  thermometer: <Thermometer className="h-5 w-5 text-blue-500" />,
};

export default function DashboardPage() {
  const recentScans = scans.slice(0, 3);

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Good Morning, John!
          </h1>
          <p className="mt-1 text-text-secondary">
            Your fields are looking stable today. Here is your farm status summary.
          </p>
        </div>
        <Link href="/history">
          <Button>
            <Scan className="h-4 w-4" />
            Start New Scan
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ─── Left Column (2/3) ─── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Row */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Total Fields */}
            <Card className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-muted">Total Fields Scanned</p>
                  <span className="text-xs font-semibold text-primary-600">
                    {dashboardStats.fieldsTrend}
                  </span>
                </div>
                <p className="text-2xl font-bold text-text-primary">
                  {dashboardStats.totalFieldsScanned}
                </p>
              </div>
            </Card>

            {/* Crop Health */}
            <Card className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-muted">Overall Crop Health</p>
                  <span className="text-xs font-semibold text-primary-600">
                    {dashboardStats.healthTrend}
                  </span>
                </div>
                <p className="text-2xl font-bold text-text-primary">
                  {dashboardStats.overallCropHealth}%{" "}
                  <span className="text-sm font-medium text-primary-500">
                    {dashboardStats.healthLabel}
                  </span>
                </p>
              </div>
            </Card>

            {/* Active Alerts */}
            <Card className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-muted">Active Alerts/Risks</p>
                  <span className="text-xs font-semibold text-red-500">
                    {dashboardStats.alertsTrend}
                  </span>
                </div>
                <p className="text-2xl font-bold text-text-primary">
                  {dashboardStats.activeAlerts}{" "}
                  <span className="text-sm font-medium text-red-500">
                    {dashboardStats.alertsLabel}
                  </span>
                </p>
              </div>
            </Card>
          </div>

          {/* Recent Drone Scans */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text-primary">
                Recent Drone Scans
              </h2>
              <Link
                href="/history"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                View All Scans
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {recentScans.map((scan) => (
                <Card key={scan.id} padding="none" className="overflow-hidden">
                  {/* Image area */}
                  <div className="relative h-40 bg-gradient-to-br from-green-700 to-green-900">
                    {scan.imageUrl && (
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-70"
                        style={{ backgroundImage: `url(${scan.imageUrl})` }}
                      />
                    )}
                    {scan.scanType && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="neutral" className="bg-black/50 text-white border-0 text-[10px] font-bold">
                          {scan.scanType}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm text-text-primary">
                      {scan.fieldName}
                    </h3>
                    <p className="mt-1 text-xs text-text-muted flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {scan.date}
                    </p>
                    <Link href={`/detection/${scan.id}`}>
                      <Button variant="primary" size="sm" className="mt-3 w-full">
                        View Analysis
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Right Column (1/3) ─── */}
        <div className="space-y-6">
          {/* Weather Widget */}
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
                <p className="text-3xl font-bold text-text-primary">
                  {weather.temperature}°C
                </p>
              </div>
              <div className="ml-auto space-y-1 text-right text-xs">
                <p className="text-text-muted">
                  <span className="font-medium text-text-primary">Wind Speed</span>{" "}
                  {weather.windSpeed} km/h
                </p>
                <p className="text-text-muted">
                  <span className="font-medium text-text-primary">Humidity</span>{" "}
                  {weather.humidity}%
                </p>
                <p className="text-text-muted">
                  <span className="font-medium text-text-primary">Visibility</span>{" "}
                  {weather.visibility}
                </p>
              </div>
            </div>
            <div className="border-t border-border pt-3">
              <div className="grid grid-cols-3 gap-2">
                {weather.forecast.map((day) => (
                  <div key={day.day} className="flex flex-col items-center gap-1 text-xs">
                    <span className="font-semibold text-text-muted">{day.day}</span>
                    {weatherIcons[day.icon] || <Cloud className="h-5 w-5 text-gray-400" />}
                    <span className="font-semibold text-text-primary">{day.tempHigh}°</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Active Alerts */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">Active Alerts</h3>
              <Badge variant="danger" size="sm" className="font-bold">
                {alerts.length} NEW
              </Badge>
            </div>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-surface-secondary shrink-0">
                    {alertIcons[alert.icon] || <AlertTriangle className="h-5 w-5 text-amber-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary">
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
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
