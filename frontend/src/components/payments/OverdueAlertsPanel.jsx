import React from 'react';
import { AlertCircle, Bell, Send, ArrowRight } from 'lucide-react';

const overdueDevs = [
  { id: 1, name: 'David Smith', amount: '₦650,000', days: 12 },
  { id: 2, name: 'Michael Chen', amount: '₦320,000', days: 6 },
  { id: 3, name: 'Alice Johnson', amount: '₦1.2M', days: 22 },
];

export default function OverdueAlertsPanel() {
  return (
    <div className="premium-card bg-slate-900 border-none p-6 text-white h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg">
                <AlertCircle size={20} />
            </div>
            <h3 className="text-lg font-bold">Overdue Alerts</h3>
        </div>
        <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3 Urgent</span>
      </div>

      <div className="space-y-6 flex-1">
        {overdueDevs.map((item) => (
          <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h4 className="text-sm font-bold text-slate-100">{item.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.amount} Owed</p>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-bold text-rose-400 uppercase">{item.days} Days Late</span>
                </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-white text-slate-900 rounded-xl font-bold text-xs hover:bg-slate-200 transition-all opacity-80 group-hover:opacity-100">
                <Send size={14} /> Send Reminder
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="bg-brand-500/10 rounded-2xl p-4 border border-brand-500/20">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-1.5 bg-brand-500 text-white rounded-lg">
                    <Bell size={16} />
                </div>
                <p className="text-xs font-bold">Automated Followups</p>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed mb-4">You have 5 automated rent reminders scheduled for dispatch tomorrow morning.</p>
            <button className="text-[10px] font-bold uppercase tracking-widest text-brand-400 flex items-center gap-1 hover:text-brand-300">
                Manage Schedule <ArrowRight size={12} />
            </button>
        </div>
      </div>
    </div>
  );
}
