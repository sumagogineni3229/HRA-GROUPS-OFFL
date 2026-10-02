"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Search, Filter } from "lucide-react";

export function AdminModulePlaceholder({
  title,
  subtitle,
  category,
  stats = [],
  actionLabel = "Add New Record",
  columns = ["Title / Name", "Category / Status", "Date Added", "Actions"],
  rows = [],
}: {
  title: string;
  subtitle: string;
  category: string;
  stats?: { label: string; value: string; color: string }[];
  actionLabel?: string;
  columns?: string[];
  rows?: any[];
}) {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-[#0052cc] uppercase tracking-wider block">
            {category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172947] mt-1">
            {title}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-2xl bg-[#0052cc] hover:bg-[#0041a3] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md shadow-blue-500/20 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>{actionLabel}</span>
          </button>
        </div>
      </div>

      {/* Stats Summary if any */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-2 shadow-sm"
            >
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {stat.label}
              </span>
              <div className="text-2xl font-extrabold text-[#172947]">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Data Table */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/20 transition-all bg-slate-50"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-all">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="text-xs uppercase bg-slate-50 text-slate-500 border-b border-slate-200 font-bold tracking-wider">
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`px-6 py-4 ${idx === 0 ? "rounded-l-2xl" : ""} ${
                      idx === columns.length - 1 ? "rounded-r-2xl text-right" : ""
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-12 text-slate-400 text-sm"
                  >
                    No records found yet. Click &quot;{actionLabel}&quot; to create your first entry.
                  </td>
                </tr>
              ) : (
                rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    {Object.values(row).map((val: any, cIdx) => (
                      <td key={cIdx} className="px-6 py-4">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
