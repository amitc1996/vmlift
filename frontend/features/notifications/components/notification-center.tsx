"use client";

import { AlertTriangle, Bell, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function NotificationCenter() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="relative grid h-8 w-8 place-items-center rounded text-muted hover:bg-slate-100 dark:hover:bg-slate-800"
        title="1 operational warning"
        aria-label="Open notifications, 1 unread"
        aria-expanded={open}
        aria-controls="notifications-drawer"
        onClick={() => setOpen(true)}
      >
        <Bell size={17} />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
      </button>

      {open && createPortal(
        <>
          <button type="button" className="fixed inset-0 z-40 bg-slate-950/30" aria-label="Close notifications" onClick={() => setOpen(false)} />
          <aside id="notifications-drawer" className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-line bg-surface shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="notifications-title">
            <div className="flex h-14 items-center justify-between border-b border-line px-5">
              <div className="flex items-center gap-2">
                <Bell size={18} />
                <h2 id="notifications-title" className="font-semibold">Notifications</h2>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-300">1 new</span>
              </div>
              <button type="button" className="grid h-8 w-8 place-items-center rounded text-muted hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setOpen(false)} aria-label="Close notifications">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <article className="rounded-md border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/40">
                <div className="flex gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                    <AlertTriangle size={17} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-ink">Operational warning</h3>
                      <span className="h-2 w-2 rounded-full bg-amber-500" aria-label="Unread" />
                    </div>
                    <p className="mt-1 text-sm leading-5 text-muted">Demo data is active. Connect a VMware environment to begin collecting live inventory data.</p>
                    <p className="mt-2 text-xs text-muted">Just now</p>
                  </div>
                </div>
              </article>
            </div>
          </aside>
        </>,
        document.body,
      )}
    </>
  );
}
