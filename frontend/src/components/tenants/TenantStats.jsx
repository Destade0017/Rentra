import React from 'react';
import { Users, FileText, AlertCircle, RefreshCcw } from 'lucide-react';
import { cn } from '../../utils/cn.js';

const statItems = [
  { label: 'Total Tenants', value: '54', icon: Users, color: 'text-brand-500 bg-brand-50' },
  { label: 'Active Leases', value: '52', icon: FileText, color: 'text-emerald-500 bg-emerald-50' },
  { label: 'Overdue Payments', value: '5', icon: AlertCircle, color: 'text-rose-500 bg-rose-50' },
  { label: 'Renewals Due', value: '8', icon: RefreshCcw, color: 'text-amber-500 bg-amber-50' },
];

export default function TenantStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat, i) => (
        <div key={i} className="premium-card p-4 flex items-center gap-4">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", stat.color)}>
            <stat.icon size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">{stat.label}</p>
            <p className="text-xl font-bold text-slate-800 tracking-tight">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
