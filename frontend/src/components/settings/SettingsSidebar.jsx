import React from 'react';
import { cn } from '../../utils/cn.js';

export default function SettingsSidebar({ items, activeId, onSelect }) {
  return (
    <div className="w-full lg:w-64 flex-shrink-0 bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 p-2">
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
              activeId === item.id 
                ? "bg-brand-50 text-brand-600 font-bold" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            )}
          >
            <item.icon size={20} className={cn(
              "transition-colors",
              activeId === item.id ? "text-brand-500" : "text-slate-400 group-hover:text-slate-600"
            )} />
            <span className="text-sm">{item.label}</span>
            
            {activeId === item.id && (
              <div className="absolute left-0 w-1 h-6 bg-brand-500 rounded-full" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
