"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { chatMessages, specialists } from "@/lib/mock-data";
import type { ChatMessage } from "@/lib/types";
import {
  Send,
  Mic,
  Bell,
  MoreVertical,
  Download,
  MapPin,
  ArrowRight,
  ArrowDown,
  ExternalLink,
  Cpu,
} from "lucide-react";

function HealthMetricsCard({ msg }: { msg: ChatMessage }) {
  if (!msg.healthMetrics) return null;
  const m = msg.healthMetrics;

  return (
    <div className="mt-4 rounded-lg border border-border bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
          Health Metrics: {m.sectorName}
        </h4>
        <span className="text-xs text-text-muted">{m.period}</span>
      </div>
      {/* Bars */}
      <div className="flex items-end gap-1.5 h-20 mb-3">
        {m.bars.map((bar, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t transition-all ${
              bar.color === "green" ? "bg-green-300" : "bg-red-400"
            }`}
            style={{ height: `${bar.value}%` }}
          />
        ))}
      </div>
      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 border-t border-border pt-3">
        <div>
          <p className="text-xs text-text-muted">Avg NDVI</p>
          <p className="text-xl font-bold text-text-primary">
            {m.avgNdvi}{" "}
            <span className="text-xs font-medium text-red-500">
              ↓ {Math.abs(m.ndviChange).toFixed(2)}
            </span>
          </p>
        </div>
        <div>
          <p className="text-xs text-text-muted">Soil Moisture</p>
          <p className="text-xl font-bold text-text-primary">
            {m.soilMoisture}%{" "}
            <span className="text-xs font-medium text-red-500">
              {m.moistureStatus}
            </span>
          </p>
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <button className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 transition-colors cursor-pointer">
          <Download className="h-3 w-3" />
          Export PDF Report
        </button>
        <button className="text-xs font-semibold text-text-primary hover:text-primary-600 transition-colors cursor-pointer">
          View Map
        </button>
      </div>
    </div>
  );
}

export default function SpecialistsPage() {
  const [message, setMessage] = useState("");
  const [messages] = useState(chatMessages);

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: connect to chat API
    setMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-6">
      {/* ─── Chat Area ─── */}
      <div className="flex flex-1 flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-text-primary">AI Specialist Support</h2>
              <p className="text-xs text-primary-600 font-medium">
                Specialist Persona Active
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-secondary transition-colors cursor-pointer">
              <Bell className="h-4 w-4 text-text-secondary" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-secondary transition-colors cursor-pointer">
              <MoreVertical className="h-4 w-4 text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div className="shrink-0">
                {msg.sender === "ai" ? (
                  <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                    <Cpu className="h-4 w-4 text-white" />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">JV</span>
                  </div>
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-xl rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === "ai"
                    ? "bg-surface-secondary text-text-primary rounded-tl-none"
                    : "bg-sidebar text-white rounded-tr-none"
                }`}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary-600">$1</strong>')
                      .replace(/\n/g, "<br/>"),
                  }}
                />
                <HealthMetricsCard msg={msg} />
              </div>
            </div>
          ))}

          {/* Follow-up message */}
          {messages[messages.length - 1]?.hasFollowUp && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center shrink-0">
                <Cpu className="h-4 w-4 text-white" />
              </div>
              <div className="max-w-xl rounded-2xl rounded-tl-none bg-surface-secondary px-4 py-3 text-sm text-text-primary leading-relaxed">
                {messages[messages.length - 1].followUpText}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors cursor-pointer shrink-0">
            <span className="text-lg font-bold">+</span>
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about crop health, weather patterns, or yield predictions..."
            className="flex-1 border-0 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-0"
          />
          <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-secondary transition-colors cursor-pointer">
            <Mic className="h-4 w-4 text-text-muted" />
          </button>
          <Button onClick={handleSend} size="sm">
            Send <Send className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* ─── Right Panel: Related Specialists ─── */}
      <div className="hidden xl:block w-72 shrink-0 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
          Related Specialists
        </h3>
        {specialists.map((spec) => (
          <Card key={spec.id} className="text-center">
            {/* Avatar */}
            <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-white">
                {spec.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <h4 className="font-bold text-sm text-text-primary">{spec.name}</h4>
            <p className="text-xs text-text-muted">{spec.title}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-1">
              {spec.tags.map((tag) => (
                <Badge key={tag} variant="neutral" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              Connect Now
            </Button>
          </Card>
        ))}

        {/* Human-in-the-loop notice */}
        <Card className="bg-red-50 border-red-200">
          <h4 className="font-bold text-sm text-text-primary mb-1">
            Human-in-the-loop
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            Your AI responses are monitored by our senior agronomists for quality
            assurance.
          </p>
          <a
            href="#"
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            View Service Agreement <ArrowRight className="h-3 w-3" />
          </a>
        </Card>
      </div>
    </div>
  );
}
