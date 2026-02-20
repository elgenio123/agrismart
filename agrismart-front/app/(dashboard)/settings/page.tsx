"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { PageTransition, AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { currentUser, droneOperators, agronomists } from "@/lib/mock-data";
import {
  User,
  Mail,
  Bell,
  Shield,
  Cpu,
  Users,
  Camera,
  Pencil,
  Phone,
  Globe,
  Clock,
  CheckCircle2,
  Zap,
} from "lucide-react";

export default function SettingsPage() {
  const [fullName, setFullName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || "");

  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    newRequest: true,
    paymentReceived: true,
    scanComplete: true,
    analysisReady: false,
    validationNeeded: true,
    operatorStatus: false,
  });

  const toggleNotification = (id: string) => {
    setNotifications((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const [aiModel, setAiModel] = useState("agrsmart-v3.2");
  const [confidenceThreshold, setConfidenceThreshold] = useState("75");
  const [autoAssign, setAutoAssign] = useState(true);
  const [timezone, setTimezone] = useState("Africa/Nairobi");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <PageTransition>
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage your profile, notifications, AI model, and team settings
          </p>
        </div>

        <div className="space-y-6">
          {/* ─── Profile ─── */}
          <AnimateIn>
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-extrabold text-text-primary tracking-tight flex items-center gap-2">
                  <User className="h-5 w-5 text-primary-500" /> Profile
                </h2>
                <Badge variant="info" size="sm">{currentUser.role.replace("_", " ")}</Badge>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative shrink-0">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {fullName.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-primary-500 border-2 border-white flex items-center justify-center">
                    <Pencil className="h-2.5 w-2.5 text-white" />
                  </div>
                </div>

                <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none hover:border-gray-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none hover:border-gray-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none hover:border-gray-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1">Timezone</label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none hover:border-gray-300 transition-all cursor-pointer appearance-none"
                    >
                      <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                      <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                      <option value="Africa/Cairo">Africa/Cairo (EET)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>
          </AnimateIn>

          {/* ─── Notifications ─── */}
          <AnimateIn delay={0.1}>
            <Card>
              <div className="mb-4">
                <h2 className="text-lg font-extrabold text-text-primary tracking-tight flex items-center gap-2">
                  <Bell className="h-5 w-5 text-amber-500" /> Notifications
                </h2>
                <p className="text-sm text-text-secondary mt-0.5">
                  Control which operational events trigger alerts
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { id: "newRequest", label: "New Scan Request", desc: "When a farmer submits a new scan request", icon: Mail },
                  { id: "paymentReceived", label: "Payment Received", desc: "When payment is confirmed for a request", icon: CheckCircle2 },
                  { id: "scanComplete", label: "Drone Scan Complete", desc: "When a drone operator finishes imaging a field", icon: Camera },
                  { id: "analysisReady", label: "AI Analysis Ready", desc: "When the AI model completes disease detection", icon: Cpu },
                  { id: "validationNeeded", label: "Validation Required", desc: "When analysis results need agronomist review", icon: Shield },
                  { id: "operatorStatus", label: "Operator Status Change", desc: "When a drone operator goes on/off duty", icon: Users },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-lg border border-border-light p-4 hover:bg-surface-secondary/50 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 shrink-0 shadow-sm">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-text-primary">{item.label}</h4>
                      <p className="text-xs text-text-muted">{item.desc}</p>
                    </div>
                    <Toggle
                      enabled={notifications[item.id] ?? false}
                      onChange={() => toggleNotification(item.id)}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </AnimateIn>

          {/* ─── AI & Processing ─── */}
          <AnimateIn delay={0.15}>
            <Card>
              <div className="mb-4">
                <h2 className="text-lg font-extrabold text-text-primary tracking-tight flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-purple-500" /> AI & Processing
                </h2>
                <p className="text-sm text-text-secondary mt-0.5">
                  Configure AI model and processing parameters
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1">AI Model Version</label>
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none hover:border-gray-300 transition-all cursor-pointer appearance-none"
                  >
                    <option value="agrsmart-v3.2">Agrsmart v3.2 (Latest)</option>
                    <option value="agrsmart-v3.1">Agrsmart v3.1 (Stable)</option>
                    <option value="agrsmart-v3.0">Agrsmart v3.0 (Legacy)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1">Confidence Threshold (%)</label>
                  <input
                    type="number"
                    min="50"
                    max="99"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(e.target.value)}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none hover:border-gray-300 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-border-light p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 shrink-0 shadow-sm">
                  <Zap className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-text-primary">Auto-assign Operators</h4>
                  <p className="text-xs text-text-muted">Automatically assign the nearest available drone operator to approved requests</p>
                </div>
                <Toggle enabled={autoAssign} onChange={() => setAutoAssign((p) => !p)} />
              </div>
            </Card>
          </AnimateIn>

          {/* ─── Team Overview ─── */}
          <AnimateIn delay={0.2}>
            <Card>
              <div className="mb-4">
                <h2 className="text-lg font-extrabold text-text-primary tracking-tight flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" /> Team
                </h2>
                <p className="text-sm text-text-secondary mt-0.5">
                  Drone operators and agronomists on your team
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Drone Operators ({droneOperators.length})</h3>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {droneOperators.map((op) => (
                    <div key={op.id} className="flex items-center gap-3 rounded-lg border border-border-light p-3 hover:bg-surface-secondary/50 transition-colors">
                      <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <Camera className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-text-primary truncate">{op.name}</p>
                        <p className="text-xs text-text-muted">{op.region} · {op.completedMissions} missions</p>
                      </div>
                      <Badge
                        variant={op.status === "available" ? "success" : op.status === "on_mission" ? "warning" : "neutral"}
                        size="sm"
                        dot
                      >
                        {op.status.replace("_", " ")}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">Agronomists ({agronomists.length})</h3>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {agronomists.map((ag) => (
                    <div key={ag.id} className="flex items-center gap-3 rounded-lg border border-border-light p-3 hover:bg-surface-secondary/50 transition-colors">
                      <div className="h-9 w-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                        <Shield className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-text-primary truncate">{ag.name}</p>
                        <p className="text-xs text-text-muted">{ag.specialization} · {ag.validationsCompleted} validations</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </AnimateIn>

          {/* Save */}
          <AnimateIn delay={0.25}>
            <div className="flex items-center justify-end gap-3 pb-6">
              <Button variant="secondary">Cancel</Button>
              <Button loading={saving} onClick={handleSave}>Save Settings</Button>
            </div>
          </AnimateIn>
        </div>
      </div>
    </PageTransition>
  );
}
