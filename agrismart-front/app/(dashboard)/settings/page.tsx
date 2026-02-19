"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { currentUser, managedFields } from "@/lib/mock-data";
import {
  Mail,
  MessageSquare,
  Bell,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

const notificationItems = [
  {
    id: "email",
    label: "Email Notifications",
    description: "Detailed weekly health reports and urgent alerts.",
    icon: Mail,
    defaultEnabled: true,
  },
  {
    id: "sms",
    label: "SMS Alerts",
    description: "Immediate text messages for high-risk pest detection.",
    icon: MessageSquare,
    defaultEnabled: false,
  },
  {
    id: "push",
    label: "Push Notifications",
    description: "Mobile app alerts for real-time field monitoring.",
    icon: Bell,
    defaultEnabled: true,
  },
];

const statusConfig = {
  healthy: { variant: "success" as const, label: "Healthy" },
  warning: { variant: "warning" as const, label: "Warning" },
  critical: { variant: "danger" as const, label: "Critical" },
};

export default function SettingsPage() {
  const [fullName, setFullName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone || "");
  const [language, setLanguage] = useState(currentUser.language || "English (US)");

  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    email: true,
    sms: false,
    push: true,
  });

  const toggleNotification = (id: string) => {
    setNotifications((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">
          Settings & Profile
        </h1>
        <p className="mt-1 text-text-secondary">
          Manage your account details, notification triggers, and agricultural
          field parameters.
        </p>
      </div>

      <div className="space-y-6">
        {/* ─── Personal Information ─── */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-primary">
              Personal Information
            </h2>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors cursor-pointer">
              Edit Info
            </button>
          </div>

          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-primary-500 border-2 border-white flex items-center justify-center">
                <Pencil className="h-2.5 w-2.5 text-white" />
              </div>
            </div>

            {/* Form fields */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none cursor-pointer appearance-none"
                >
                  <option>English (US)</option>
                  <option>Español</option>
                  <option>Français</option>
                  <option>Português</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* ─── Disease & Pest Alerts ─── */}
        <Card>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-text-primary">
              Disease & Pest Alerts
            </h2>
            <p className="text-sm text-text-secondary mt-0.5">
              Configure how you receive critical crop health notifications.
            </p>
          </div>

          <div className="space-y-4">
            {notificationItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-lg border border-border-light p-4 hover:bg-surface-secondary/50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600 shrink-0">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-text-primary">
                    {item.label}
                  </h4>
                  <p className="text-xs text-text-muted">{item.description}</p>
                </div>
                <Toggle
                  enabled={notifications[item.id] ?? item.defaultEnabled}
                  onChange={() => toggleNotification(item.id)}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* ─── Field Management ─── */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-text-primary">
                Field Management
              </h2>
              <p className="text-sm text-text-secondary mt-0.5">
                Configure your managed agricultural plots.
              </p>
            </div>
            <Button size="sm">
              <Plus className="h-3 w-3" />
              Add Field
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-2 text-left text-xs font-bold uppercase tracking-wider text-text-muted">
                    Field Name
                  </th>
                  <th className="pb-2 text-left text-xs font-bold uppercase tracking-wider text-text-muted">
                    Location
                  </th>
                  <th className="pb-2 text-left text-xs font-bold uppercase tracking-wider text-text-muted">
                    Crop Type
                  </th>
                  <th className="pb-2 text-center text-xs font-bold uppercase tracking-wider text-text-muted">
                    Status
                  </th>
                  <th className="pb-2 text-right text-xs font-bold uppercase tracking-wider text-text-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {managedFields.map((field) => {
                  const sc = statusConfig[field.status];
                  return (
                    <tr
                      key={field.id}
                      className="border-b border-border-light last:border-0"
                    >
                      <td className="py-3 font-medium text-text-primary">
                        {field.name}
                      </td>
                      <td className="py-3 text-text-secondary">
                        {field.location}
                      </td>
                      <td className="py-3 text-text-secondary">
                        {field.cropType}
                      </td>
                      <td className="py-3 text-center">
                        <Badge variant={sc.variant}>{sc.label}</Badge>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="text-text-muted hover:text-primary-600 transition-colors cursor-pointer">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button className="text-text-muted hover:text-danger transition-colors cursor-pointer">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Save / Cancel */}
        <div className="flex items-center justify-end gap-3 pb-6">
          <Button variant="secondary">Cancel Changes</Button>
          <Button>Save All Settings</Button>
        </div>
      </div>
    </div>
  );
}
