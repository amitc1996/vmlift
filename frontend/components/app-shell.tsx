"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { AccountMenu } from "@/features/account/components/account-menu";
import { NotificationCenter } from "@/features/notifications/components/notification-center";
import { AppSidebar } from "./app-sidebar";
import { ThemeToggle } from "./theme-toggle";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas">
      <AppSidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 items-center border-b border-line bg-surface/95 px-4 backdrop-blur sm:px-6">
          <button className="mr-3 text-muted lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
          <div className="ml-auto flex items-center gap-1">
            <span className="mr-2 hidden rounded border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-amber-700 sm:inline dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">Demo data</span>
            <ThemeToggle />
            <NotificationCenter />
            <AccountMenu />
          </div>
        </header>
        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-7">{children}</main>
      </div>
    </div>
  );
}
