import React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';

export default function AccountSettings() {
  return (
    <div className="space-y-12">
      <section className="space-y-4 max-w-md">
          <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Username</label>
              <input 
                type="text" 
                defaultValue="felix_onyekachi" 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
              />
          </div>
          <div className="p-4 bg-brand-50/50 rounded-2xl border border-brand-100/50">
              <p className="text-xs text-brand-700 font-medium">Your public profile is available at <span className="font-bold">rentflow.io/felix_onyekachi</span></p>
          </div>
      </section>

      {/* Danger Zone */}
      <section className="pt-8 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-4 text-rose-500">
              <AlertTriangle size={20} />
              <h3 className="text-sm font-bold uppercase tracking-widest">Danger Zone</h3>
          </div>
          <div className="bg-rose-50/30 border border-rose-100 rounded-[32px] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-md">
                  <h4 className="font-bold text-slate-800 mb-1">Delete Account</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      This action will permanently delete all your properties, tenants, and financial history. This cannot be undone.
                  </p>
              </div>
              <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-rose-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-rose-200 hover:bg-rose-600 hover:-translate-y-0.5 transition-all whitespace-nowrap">
                  <Trash2 size={16} /> Delete Account
              </button>
          </div>
      </section>
    </div>
  );
}
