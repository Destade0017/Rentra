import React from 'react';
import { AlertCircle, Clock, CheckCircle2, Zap } from 'lucide-react';
import { cn } from '../../utils/cn.js';

const statItems = [
  { label: 'Open Requests', value: '14', icon: AlertCircle, color: 'text-brand-500 bg-brand-50' },
  { label: 'Urgent Issues', value: '4', icon: Zap, color: 'text-rose-500 bg-rose-50' },
  { label: 'Resolved (MTD)', value: '28', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
  { label: 'Avg Resolution', value: '2.4 Days', icon: Clock, color: 'text-amber-500 bg-amber-50' },
];

export default function RequestStats() {
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
