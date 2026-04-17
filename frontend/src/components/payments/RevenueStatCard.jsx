import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../utils/cn.js';

export default function RevenueStatCard({ title, value, subValue, trend, trendValue, icon: Icon, color }) {
  const isPositive = trend === 'up';

  return (
    <div className="premium-card p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Decorative gradient background */}
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700",
        color || "bg-brand-500"
      )} />
      
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm",
          color ? `bg-${color.split('-')[1]}-50 text-${color.split('-')[1]}-600` : "bg-brand-50 text-brand-600"
        )}>
          <Icon size={24} />
        </div>
        
        {trendValue && (
          <div className={cn(
            "flex items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-bold",
            isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trendValue}
          </div>
        )}
      </div>
      
      <div className="relative z-10">
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
           <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
           {subValue && <span className="text-xs font-bold text-slate-400">{subValue}</span>}
        </div>
      </div>
    </div>
  );
}
