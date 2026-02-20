"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { X } from "lucide-react";
import {
  LayoutDashboard,
  Clock,
  FileText,
  Users,
  Settings,
  LogOut,
  MapPin,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Fields", href: "/fields", icon: MapPin },
  { label: "History", href: "/history", icon: Clock },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Specialists", href: "/specialists", icon: Users },
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
      {/* ── Mobile overlay ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-[260px] md:w-[220px] flex-col bg-white border-r border-border shadow-sm transition-transform duration-300 ease-out",
          // Mobile: off-screen by default, slide in when open
          open ? "translate-x-0" : "-translate-x-full",
          // Desktop: always visible
          "md:translate-x-0"
        )}
      >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-border-light">
        <Logo size="sm" subtitle="Precision Farming" />
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface-secondary md:hidden cursor-pointer transition-colors"
        >
          <X className="h-5 w-5 text-text-secondary" />
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 pt-5 space-y-1">
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

      {/* Bottom Nav */}
      <div className="border-t border-border px-3 py-3 space-y-1">
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

      {/* User */}
      <div className="border-t border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm">
            <span className="text-xs font-bold text-white">JM</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate">
              John Miller
            </p>
            <p className="text-xs text-text-muted truncate">Senior Agronomist</p>
          </div>
          <button className="text-text-muted hover:text-danger transition-colors cursor-pointer" title="Logout">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
