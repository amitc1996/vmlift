"use client";

import Link from "next/link";
import { MoreHorizontal, Plus, RefreshCw, Search, Server, Cloud } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { connections } from "@/lib/mock-data";

export default function ConnectionsPage() {
  const [query, setQuery] = useState("");
  const [testing, setTesting] = useState<string>();
  const filtered = connections.filter(item => `${item.name} ${item.provider} ${item.target}`.toLowerCase().includes(query.toLowerCase()));
  function test(id: string) { setTesting(id); window.setTimeout(() => setTesting(undefined), 900); }
  return <div className="space-y-5"><PageHeader title="Connections" description="Manage vCenter and AWS access used by discovery and migration workflows." actions={<Link href="/connections/new" className="button-primary"><Plus size={16} />Add connection</Link>} />
    <div className="panel overflow-hidden rounded-md"><div className="flex flex-col gap-3 border-b border-line p-3 sm:flex-row sm:items-center"><div className="relative w-full sm:max-w-sm"><Search size={16} className="absolute left-3 top-2.5 text-muted" /><input className="field pl-9" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search connections" aria-label="Search connections" /></div><div className="sm:ml-auto text-xs text-muted">{filtered.length} of {connections.length} connections</div></div>
    <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-slate-50 text-xs text-muted dark:bg-slate-900"><tr>{["Provider", "Connection name", "Endpoint / region", "Health", "Last validated", "Actions"].map(x => <th className="px-4 py-2.5 font-medium" key={x}>{x}</th>)}</tr></thead><tbody>{filtered.map(item => <tr className="border-t border-line hover:bg-slate-50/70 dark:hover:bg-slate-900/50" key={item.id}><td className="px-4 py-3"><div className="flex items-center gap-2">{item.provider.startsWith("VMware") ? <Server size={16} className="text-slate-500" /> : <Cloud size={16} className="text-slate-500" />}<span>{item.provider}</span></div></td><td className="px-4 py-3 font-medium">{item.name}<div className="font-mono text-[11px] text-muted">{item.id}</div></td><td className="px-4 py-3 font-mono text-xs">{item.target}</td><td className="px-4 py-3"><StatusBadge status={item.health} /></td><td className="px-4 py-3 text-muted">{item.lastValidated}</td><td className="px-4 py-3"><div className="flex items-center gap-1"><button onClick={() => test(item.id)} className="button-secondary h-8 px-2.5"><RefreshCw size={14} className={testing === item.id ? "animate-spin" : ""} />{testing === item.id ? "Testing…" : "Test"}</button><button className="grid h-8 w-8 place-items-center rounded hover:bg-slate-100 dark:hover:bg-slate-800" aria-label={`More actions for ${item.name}`}><MoreHorizontal size={17} /></button></div></td></tr>)}</tbody></table></div>
    {filtered.length === 0 && <div className="px-4 py-12 text-center"><p className="text-sm font-medium">No connections found</p><p className="mt-1 text-sm text-muted">Try another search term.</p></div>}</div></div>;
}
