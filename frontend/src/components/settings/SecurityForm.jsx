import React from 'react';
import { Lock, LogOut } from 'lucide-react';

export default function SecurityForm() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 max-w-md">
        <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
            <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
            />
        </div>
        <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">New Password</label>
            <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
            />
        </div>
        <button className="px-8 py-3.5 bg-brand-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-brand-100 hover:bg-brand-600 transition-all flex items-center justify-center gap-2">
            <Lock size={16} /> Update Password
        </button>
      </div>

      <div className="pt-8 border-t border-slate-50">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Device Sessions</h3>
          <p className="text-xs text-slate-400 mb-6 font-medium">If you've lost a device or suspect unauthorized access, you can end all other active sessions.</p>
          <button className="px-6 py-3 bg-white border border-rose-100 text-rose-500 rounded-xl font-bold text-xs hover:bg-rose-50 transition-all flex items-center gap-2">
              <LogOut size={16} /> Logout from all devices
          </button>
      </div>
    </div>
  );
}
