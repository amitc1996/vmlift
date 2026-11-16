"use client";

import { usePathname } from "next/navigation";
import { Bell, ChevronRight, Menu } from "lucide-react";
import { useState } from "react";
import { AppSidebar } from "./app-sidebar";
import { ThemeToggle } from "./theme-toggle";

const labels: Record<string, string> = { connections: "Connections", new: "Add VMware connection", inventory: "Inventory", vms: "Virtual Machines" };

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  return (
    <div className="min-h-screen bg-canvas">
      <AppSidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 items-center border-b border-line bg-surface/95 px-4 backdrop-blur sm:px-6">
          <button className="mr-3 text-muted lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
          <nav className="flex min-w-0 items-center gap-1.5 text-sm text-muted" aria-label="Breadcrumb">
            <span className="hidden sm:inline">VMLift</span>
            {segments.length === 0 ? <><ChevronRight size={14} /><span className="text-ink">Dashboard</span></> : segments.map((segment, index) => <span className="flex min-w-0 items-center gap-1.5" key={segment}><ChevronRight size={14} className="shrink-0" /><span className={index === segments.length - 1 ? "truncate text-ink" : "hidden truncate sm:inline"}>{labels[segment] ?? (segment.startsWith("vm-") ? segment : segment)}</span></span>)}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <span className="mr-2 hidden rounded border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-amber-700 sm:inline dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">Demo data</span>
            <ThemeToggle />
            <span className="relative grid h-8 w-8 place-items-center text-muted" title="1 operational warning"><Bell size={17} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" /></span>
            <span className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-100" title="Amit Kumar">AK</span>
          </div>
        </header>
        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-7">{children}</main>
      </div>
    </div>
  );
}
