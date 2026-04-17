import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmptyState({ 
  icon: Icon, 
  title, 
  message, 
  actionLabel, 
  onAction 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center py-24 text-center bg-white/40 backdrop-blur-sm rounded-[48px] border-2 border-dashed border-slate-200/60"
    >
      <div className="w-24 h-24 bg-white rounded-3xl animate-subtle-fade flex items-center justify-center text-slate-200 shadow-premium mb-8 ring-8 ring-slate-50/50">
        <Icon size={44} strokeWidth={1} />
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-400 text-sm max-w-sm mb-10 leading-relaxed font-semibold">
        {message}
      </p>
      {actionLabel && (
        <button 
          onClick={onAction}
          className="flex items-center gap-3 bg-brand-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-500/10 hover:bg-brand-600 hover:-translate-y-1 transition-all active:translate-y-0"
        >
          <Plus size={18} strokeWidth={3} />
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
