"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageTransition, AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { scheduleEvents, droneOperators, scanRequests } from "@/lib/mock-data";
import { getStatusLabel, getStatusColor, formatCurrency } from "@/lib/services";
import type { ScheduleEvent } from "@/lib/types";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Banana,
  Plus,
  CheckCircle2,
  AlertCircle,
  Radio,
} from "lucide-react";

// Build calendar grid for current month
function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

export default function SchedulingPage() {
  const [currentDate] = useState(new Date(2026, 1)); // Feb 2026
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getCalendarDays(year, month);
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const today = new Date().getDate();

  const [selectedDay, setSelectedDay] = useState<number | null>(today);

  // Get events for a particular day
  const getEventsForDay = (day: number): ScheduleEvent[] => {
    const dateStr = `2026-02-${String(day).padStart(2, "0")}`;
    return scheduleEvents.filter((e) => e.date === dateStr);
  };

  const selectedEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  // Requests ready to be scheduled (approved but not yet scheduled)
  const readyToSchedule = scanRequests.filter((r) => r.status === "approved");

  return (
    <PageTransition>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Scheduling</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Plan and assign drone missions
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <AnimateIn className="lg:col-span-2">
          <Card>
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-extrabold text-text-primary tracking-tight">{monthName}</h2>
              <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface-secondary transition-colors cursor-pointer">
                  <ChevronLeft className="h-4 w-4 text-text-secondary" />
                </button>
                <button className="px-3 py-1 rounded-lg bg-primary-50 text-primary-600 text-xs font-semibold cursor-pointer">Today</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface-secondary transition-colors cursor-pointer">
                  <ChevronRight className="h-4 w-4 text-text-secondary" />
                </button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-center text-xs font-bold uppercase tracking-wider text-text-muted py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-border-light rounded-xl overflow-hidden border border-border-light">
              {days.map((day, i) => {
                const events = day ? getEventsForDay(day) : [];
                const isToday = day === today;
                const isSelected = day === selectedDay;
                const isPast = day !== null && day < today;
                return (
                  <button
                    key={i}
                    disabled={day === null}
                    onClick={() => day && setSelectedDay(day)}
                    className={`relative flex flex-col items-start p-2 min-h-[130px] sm:min-h-[130px] bg-white transition-colors cursor-pointer text-left ${
                      day === null ? "bg-surface-secondary/50 cursor-default" : ""
                    } ${isSelected ? "bg-primary-50 ring-1 ring-primary-300 z-10" : "hover:bg-surface-secondary"} ${
                      isPast ? "opacity-60" : ""
                    }`}
                  >
                    {day && (
                      <>
                        <span
                          className={`text-xs font-semibold mb-1 ${
                            isToday
                              ? "bg-primary-500 text-white h-6 w-6 rounded-full flex items-center justify-center"
                              : "text-text-primary"
                          }`}
                        >
                          {day}
                        </span>
                        {events.map((ev) => (
                          <div
                            key={ev.id}
                            className={`w-full text-[10px] font-semibold rounded px-1 py-0.5 truncate mb-0.5 ${
                              ev.status === "completed"
                                ? "bg-emerald-100 text-emerald-700"
                                : ev.status === "in_progress"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {ev.farmName.split(" ")[0]}
                          </div>
                        ))}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>
        </AnimateIn>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Selected Day Events */}
          <AnimateIn delay={0.1}>
            <Card>
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary-500" />
                {selectedDay ? `Feb ${selectedDay}, 2026` : "Select a day"}
              </h3>
              {selectedEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedEvents.map((ev) => (
                    <div key={ev.id} className="rounded-lg border border-border-light p-3 hover:bg-surface-secondary/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-text-primary">{ev.farmName}</p>
                        <Badge
                          variant={ev.status === "completed" ? "success" : ev.status === "in_progress" ? "warning" : "info"}
                          size="sm" dot
                        >
                          {ev.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-xs text-text-muted">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" /> {ev.time}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="h-3 w-3" /> {ev.operatorName}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3" /> {ev.region} · {ev.hectares}ha
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Banana className="h-3 w-3" /> {ev.cropType}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-muted text-center py-6">No missions on this day</p>
              )}
            </Card>
          </AnimateIn>

          {/* Ready to Schedule */}
          <AnimateIn delay={0.2}>
            <Card>
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Ready to Schedule
                <Badge variant="warning" size="sm">{readyToSchedule.length}</Badge>
              </h3>
              {readyToSchedule.length > 0 ? (
                <div className="space-y-3">
                  {readyToSchedule.map((req) => (
                    <div key={req.id} className="rounded-lg border border-border-light p-3">
                      <p className="text-sm font-semibold text-text-primary">{req.farmName}</p>
                      <p className="text-xs text-text-muted mt-0.5">{req.hectares}ha · {req.cropType} · {req.location.region}</p>
                      <Button size="sm" variant="outline" className="mt-2 w-full">
                        <Plus className="h-3 w-3" /> Assign & Schedule
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-muted text-center py-4">All approved requests are scheduled</p>
              )}
            </Card>
          </AnimateIn>

          {/* Operator Availability */}
          <AnimateIn delay={0.3}>
            <Card>
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <Radio className="h-4 w-4 text-indigo-500" />
                Operator Status
              </h3>
              <div className="space-y-2">
                {droneOperators.map((op) => (
                  <div key={op.id} className="flex items-center gap-3 py-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-white">
                        {op.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">{op.name}</p>
                      <p className="text-xs text-text-muted">{op.region}</p>
                    </div>
                    <Badge
                      variant={op.status === "available" ? "success" : op.status === "on_mission" ? "warning" : "neutral"}
                      size="sm" dot
                    >
                      {op.status.replace("_", " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </AnimateIn>
        </div>
      </div>
    </PageTransition>
  );
}
