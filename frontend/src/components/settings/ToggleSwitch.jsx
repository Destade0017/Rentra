import React from 'react';
import { cn } from '../../utils/cn.js';

export default function ToggleSwitch({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-bold text-slate-800">{label}</span>
        {description && <span className="text-xs text-slate-400 font-medium">{description}</span>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 outline-none ring-offset-2 focus:ring-2 focus:ring-brand-500",
          checked ? "bg-brand-500" : "bg-slate-200"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
}
