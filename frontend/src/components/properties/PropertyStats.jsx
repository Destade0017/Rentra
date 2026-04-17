import React from 'react';
import { Building2, Home, CheckCircle2, DollarSign } from 'lucide-react';
import { cn } from '../../utils/cn.js';

const statItems = [
  { label: 'Total Properties', value: '12', icon: Building2, color: 'text-brand-500 bg-brand-50' },
  { label: 'Occupied Units', value: '45', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
  { label: 'Vacant Units', value: '8', icon: Home, color: 'text-amber-500 bg-amber-50' },
  { label: 'Est. Revenue', value: '₦4.2M', icon: DollarSign, color: 'text-blue-500 bg-blue-50' },
];

export default function PropertyStats() {
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
