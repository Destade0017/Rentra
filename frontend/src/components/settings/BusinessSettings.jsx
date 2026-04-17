import React from 'react';
import { Building2, Globe, DollarSign, Clock } from 'lucide-react';

export default function BusinessSettings() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Company / Landlord Name</label>
            <input 
                type="text" 
                defaultValue="Felix & Co. Properties" 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
            />
        </div>
        <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Default Currency</label>
            <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all appearance-none text-slate-700">
                <option>Nigerian Naira (₦)</option>
                <option>US Dollar ($)</option>
                <option>British Pound (£)</option>
            </select>
        </div>
        <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Business Timezone</label>
            <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all appearance-none text-slate-700">
                <option>(GMT+01:00) Lagos</option>
                <option>(GMT+00:00) London</option>
                <option>(GMT-05:00) New York</option>
            </select>
        </div>
      </div>

      <div className="pt-6">
        <button className="px-8 py-3.5 bg-brand-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-brand-100 hover:bg-brand-600 transition-all">
            Save Business Profile
        </button>
      </div>
    </div>
  );
}
