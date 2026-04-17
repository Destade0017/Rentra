import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../utils/cn.js';

export default function KPICard({ title, value, subValue, growth, icon: Icon, color }) {
  const isPositive = growth?.startsWith('+');

  return (
    <div className="premium-card p-8 flex flex-col justify-between group cursor-default">
      <div className="flex items-start justify-between mb-8">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105",
          color || "bg-brand-500/5 text-brand-500"
        )}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        {growth && (
          <div className={cn(
            "flex items-center gap-0.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
            isPositive ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
          )}>
            {isPositive ? <ArrowUpRight size={12} strokeWidth={3} /> : <ArrowDownRight size={12} strokeWidth={3} />}
            {growth}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.1em]">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-slate-900 tracking-tight">{value}</span>
          {subValue && <span className="text-slate-400 text-[10px] font-bold italic">{subValue}</span>}
        </div>
      </div>
    </div>
  );
}
