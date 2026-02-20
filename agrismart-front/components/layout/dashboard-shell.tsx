"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { Menu } from "lucide-react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-secondary">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-white px-4 py-3 md:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-surface-secondary transition-colors cursor-pointer"
        >
          <Menu className="h-5 w-5 text-text-primary" />
        </button>
        <span className="text-sm font-bold text-text-primary">Agrsmart</span>
      </div>

      <main className="md:ml-[220px] min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 page-enter">{children}</div>
      </main>
    </div>
  );
}
