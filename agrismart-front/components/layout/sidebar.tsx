"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { X, LogOut } from "lucide-react";
import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  Microscope,
  FileBarChart,
  TrendingUp,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Requests", href: "/requests", icon: ClipboardList },
  { label: "Scheduling", href: "/scheduling", icon: CalendarDays },
  { label: "Analysis", href: "/analysis", icon: Microscope },
  { label: "Reports", href: "/reports", icon: FileBarChart },
  { label: "Analytics", href: "/analytics", icon: TrendingUp },
];

const bottomItems = [
  { label: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-[260px] md:w-[220px] flex-col bg-white border-r border-border shadow-sm transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-border-light">
          <Logo size="sm" subtitle="Operations" />
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface-secondary md:hidden cursor-pointer transition-colors"
          >
            <X className="h-5 w-5 text-text-secondary" />
          </button>
        </div>

        <div className="px-5 pt-4 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted">Main Menu</p>
        </div>

        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-500 text-white shadow-sm shadow-primary-500/25"
                    : "text-text-secondary hover:bg-primary-50 hover:text-primary-700"
                )}
              >
                <item.icon className={cn("h-[18px] w-[18px] shrink-0 transition-transform duration-200", !isActive && "group-hover:scale-110")} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white/70" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border px-3 py-3 space-y-0.5">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-500 text-white shadow-sm shadow-primary-500/25"
                    : "text-text-secondary hover:bg-primary-50 hover:text-primary-700"
                )}
              >
                <item.icon className="h-[18px] w-[18px]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-border px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm">
              <span className="text-xs font-bold text-white">MN</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">Marie Nguemo</p>
              <p className="text-xs text-text-muted truncate">Admin</p>
            </div>
            <Link href="/login" className="text-text-muted hover:text-danger transition-colors cursor-pointer">
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
