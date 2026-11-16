"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Boxes, Cable, ClipboardCheck, FileText, Gauge, History, ListTree, Settings, Workflow, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", href: "/", icon: Gauge },
  { label: "Connections", href: "/connections", icon: Cable },
  { label: "Discovery", href: "/discovery", icon: ListTree, disabled: true },
  { label: "Inventory", href: "/inventory", icon: Boxes },
  { label: "Assessments", href: "/assessments", icon: ClipboardCheck, disabled: true },
  { label: "Migration Projects", href: "/projects", icon: Workflow, disabled: true },
  { label: "Migration Jobs", href: "/jobs", icon: Activity, disabled: true },
  { label: "Reports", href: "/reports", icon: FileText, disabled: true },
  { label: "Activity Logs", href: "/activity", icon: History, disabled: true },
  { label: "Settings", href: "/settings", icon: Settings, disabled: true },
];

export function AppSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {open && <button className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={onClose} aria-label="Close navigation" />}
      <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-800 bg-slate-950 text-slate-200 transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex h-14 items-center justify-between border-b border-slate-800 px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-white" onClick={onClose}>
            <span className="grid h-7 w-7 place-items-center rounded bg-blue-600 text-xs font-bold">VL</span>
            <span>VMLift</span>
          </Link>
          <button className="text-slate-400 lg:hidden" onClick={onClose} aria-label="Close navigation"><X size={19} /></button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3" aria-label="Primary navigation">
          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Migration operations</p>
          <ul className="space-y-0.5">
            {nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link href={item.disabled ? "#" : item.href} aria-disabled={item.disabled} onClick={(event) => { if (item.disabled) event.preventDefault(); else onClose(); }} className={cn("flex h-9 items-center gap-3 rounded px-2.5 text-sm", active ? "bg-slate-800 font-medium text-white" : "text-slate-300 hover:bg-slate-900 hover:text-white", item.disabled && "cursor-not-allowed text-slate-600 hover:bg-transparent hover:text-slate-600")}>
                    <Icon size={17} strokeWidth={1.8} />
                    <span>{item.label}</span>
                    {item.disabled && <span className="ml-auto text-[10px] uppercase text-slate-600">Soon</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-slate-800 px-4 py-3 text-xs text-slate-500">
          <div>VMLift Community</div><div className="mt-0.5 font-mono">v0.1.0 · demo mode</div>
        </div>
      </aside>
    </>
  );
}
