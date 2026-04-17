import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsSection({ title, children }) {
  return (
    <AnimatePresence mode="wait">
        <motion.div
            key={title}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
        >
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
                    <p className="text-[10px] text-brand-500 font-bold uppercase tracking-widest mt-0.5">Configuration Module</p>
                </div>
                <div className="p-8">
                    {children}
                </div>
            </div>
        </motion.div>
    </AnimatePresence>
  );
}
