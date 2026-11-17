"use client";

import Link from "next/link";
import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className="relative ml-1" ref={menuRef}>
      <button
        type="button"
        className="flex h-9 items-center gap-1 rounded-full pr-1 text-muted hover:bg-slate-100 dark:hover:bg-slate-800"
        aria-label="Open user account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-100">AK</span>
        <ChevronDown size={14} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-52 overflow-hidden rounded-md border border-line bg-surface py-1 shadow-lg" role="menu" aria-label="User account">
          <Link href="/account" role="menuitem" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-ink hover:bg-slate-50 dark:hover:bg-slate-800">
            <UserRound size={16} className="text-muted" />
            <span>Account Details</span>
          </Link>
          <Link href="/settings" role="menuitem" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-ink hover:bg-slate-50 dark:hover:bg-slate-800">
            <Settings size={16} className="text-muted" />
            <span>Settings</span>
          </Link>
          <Link href="/logout" role="menuitem" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40">
            <LogOut size={16} />
            <span>Logout</span>
          </Link>
        </div>
      )}
    </div>
  );
}
