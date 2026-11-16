"use client";

import Link from "next/link";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, type ColumnDef, type SortingState, useReactTable } from "@tanstack/react-table";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import type { VirtualMachine } from "@/lib/types";
import { StatusBadge } from "./status-badge";

export function InventoryTable({ data }: { data: VirtualMachine[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState("");
  const columns = useMemo<ColumnDef<VirtualMachine>[]>(() => [
    { id: "select", enableSorting: false, header: ({ table }) => <input type="checkbox" aria-label="Select all rows" checked={table.getIsAllPageRowsSelected()} onChange={table.getToggleAllPageRowsSelectedHandler()} />, cell: ({ row }) => <input type="checkbox" aria-label={`Select ${row.original.name}`} checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} /> },
    { accessorKey: "name", header: "Name", cell: ({ row }) => <Link className="font-medium text-blue-600 hover:underline" href={`/inventory/vms/${row.original.id}`}>{row.original.name}</Link> },
    { accessorKey: "powerState", header: "Power state", cell: ({ getValue }) => <span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${getValue() === "Powered on" ? "bg-emerald-500" : "bg-slate-400"}`} />{String(getValue())}</span> },
    { accessorKey: "guestOs", header: "Guest OS" },
    { accessorKey: "vcpu", header: "vCPU" },
    { accessorKey: "memoryGb", header: "Memory", cell: ({ getValue }) => <span className="tabular-nums">{String(getValue())} GB</span> },
    { accessorKey: "storageGb", header: "Storage", cell: ({ getValue }) => <span className="tabular-nums">{Number(getValue()).toLocaleString()} GB</span> },
    { accessorKey: "network", header: "Network", cell: ({ getValue }) => <span className="font-mono text-xs">{String(getValue())}</span> },
    { accessorKey: "cluster", header: "Cluster" },
    { accessorKey: "assessment", header: "Assessment", cell: ({ getValue }) => <StatusBadge status={String(getValue())} /> },
  ], []);
  const table = useReactTable({ data, columns, state: { sorting, globalFilter: filter }, onSortingChange: setSorting, onGlobalFilterChange: setFilter, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), getFilteredRowModel: getFilteredRowModel(), getPaginationRowModel: getPaginationRowModel(), initialState: { pagination: { pageSize: 5 } } });
  return <div className="panel overflow-hidden rounded-md"><div className="flex flex-col gap-3 border-b border-line p-3 sm:flex-row"><div className="relative w-full sm:max-w-sm"><Search size={16} className="absolute left-3 top-2.5 text-muted" /><input className="field pl-9" placeholder="Search virtual machines" value={filter} onChange={e => setFilter(e.target.value)} /></div><select className="field w-full sm:w-44" aria-label="Filter power state" onChange={e => table.getColumn("powerState")?.setFilterValue(e.target.value || undefined)}><option value="">All power states</option><option>Powered on</option><option>Powered off</option></select><button className="button-secondary sm:ml-auto"><SlidersHorizontal size={15} />Columns<ChevronDown size={14} /></button></div>
    <div className="overflow-x-auto"><table className="w-full min-w-[1200px] text-left text-sm"><thead className="bg-slate-50 text-xs text-muted dark:bg-slate-900">{table.getHeaderGroups().map(group => <tr key={group.id}>{group.headers.map(header => <th key={header.id} className="whitespace-nowrap px-3 py-2.5 font-medium"><button className="flex items-center gap-1" onClick={header.column.getToggleSortingHandler()} disabled={!header.column.getCanSort()}>{flexRender(header.column.columnDef.header, header.getContext())}{header.column.getCanSort() && <ChevronsUpDown size={12} />}</button></th>)}</tr>)}</thead><tbody>{table.getRowModel().rows.map(row => <tr className="border-t border-line hover:bg-slate-50/70 dark:hover:bg-slate-900/50" key={row.id}>{row.getVisibleCells().map(cell => <td className="whitespace-nowrap px-3 py-3" key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}</tr>)}</tbody></table></div>
    <div className="flex flex-col gap-3 border-t border-line px-4 py-3 text-sm sm:flex-row sm:items-center"><span className="text-muted">{table.getSelectedRowModel().rows.length ? `${table.getSelectedRowModel().rows.length} selected · ` : ""}{table.getFilteredRowModel().rows.length} virtual machines</span><div className="flex items-center gap-2 sm:ml-auto"><span className="text-xs text-muted">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span><button className="grid h-8 w-8 place-items-center rounded border border-line disabled:opacity-40" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} aria-label="Previous page"><ChevronLeft size={16} /></button><button className="grid h-8 w-8 place-items-center rounded border border-line disabled:opacity-40" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} aria-label="Next page"><ChevronRight size={16} /></button></div></div>
  </div>;
}
