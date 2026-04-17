import React from 'react';
import { 
  CreditCard, 
  MessageSquare, 
  Wrench, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore.js';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn.js';

export default function TenantDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const mockTenantData = {
    property: 'Royal Heritage Tower',
    unit: 'Penthouse 4B',
    rentAmount: 450000,
    dueDate: 'Oct 1, 2026',
    status: 'paid',
    lastPayment: 'Sep 1, 2026',
    openRequests: 1
  };

  return (
    <div className="space-y-10 animate-subtle-slide pb-16">
      {/* Resident Welcome Explorer */}
      <div className="bg-brand-500 rounded-[48px] p-10 lg:p-16 text-white relative overflow-hidden shadow-elevated border border-white/5">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/20 blur-[120px] -mr-64 -mt-64 rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[80px] -ml-32 -mb-32 rounded-full" />
          
          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-12">
              <div className="space-y-6">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-accent-400">
                      <ShieldCheck size={14} />
                      Verified Resident Portal
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-5xl font-black tracking-tight leading-tight">Bonjour, {user?.name?.split(' ')[0] || 'Resident'}.</h1>
                    <p className="text-white/60 font-medium text-xl max-w-lg leading-relaxed">
                        Welcome to your refined resident experience at <span className="text-white font-black">{mockTenantData.property}</span>.
                    </p>
                  </div>
              </div>

              <div className="bg-white/10 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] min-w-[320px] shadow-2xl">
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-6">Active Unit Assignment</p>
                  <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-accent-500 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-accent-500/20 border border-white/20">
                          <Building2 size={24} />
                      </div>
                      <div>
                          <p className="text-2xl font-black text-white tracking-tight">{mockTenantData.unit}</p>
                          <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-0.5">Premium Tenancy</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Rent Status Card */}
          <div className="lg:col-span-1 space-y-6">
              <div className="premium-card p-10 h-full flex flex-col justify-between overflow-hidden relative group bg-white">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700">
                      <CreditCard size={180} />
                  </div>
                  <div className="relative z-10">
                      <div className="flex items-center justify-between mb-10">
                          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Lease Status</h3>
                          <div className={cn(
                              "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                              mockTenantData.status === 'paid' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                          )}>
                              {mockTenantData.status}
                          </div>
                      </div>
                      
                      <div className="space-y-2 mb-10">
                          <p className="text-4xl font-black text-slate-900 tracking-tight">₦{mockTenantData.rentAmount.toLocaleString()}</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Cycle terminates on {mockTenantData.dueDate}</p>
                      </div>

                      <div className="p-5 bg-slate-50/50 rounded-3xl border border-slate-100 flex items-center gap-4 mb-10">
                          <Calendar size={18} className="text-slate-300" />
                          <div className="flex-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Last Record</p>
                              <p className="text-xs font-bold text-slate-700">{mockTenantData.lastPayment}</p>
                          </div>
                      </div>
                  </div>

                  <button className="relative z-10 w-full py-4.5 bg-brand-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-brand-500/10 hover:bg-brand-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group">
                      Initialize Payment
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>
          </div>

          {/* Practical Links / Activities */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div 
                onClick={() => navigate('/complaints')}
                className="premium-card p-10 hover:border-brand-500 transition-all cursor-pointer group flex flex-col justify-between bg-white"
              >
                  <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-[32px] flex items-center justify-center group-hover:bg-brand-500/5 group-hover:text-brand-500 transition-all duration-500 mb-8 border border-slate-100">
                      <Wrench size={30} strokeWidth={1.5} />
                  </div>
                  <div>
                      <h4 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Support Cases</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">Report asset irregularities. Our technical team responds within a 24-hour window.</p>
                      <div className="mt-8 flex items-center gap-2 text-brand-500 font-black text-[10px] uppercase tracking-widest transition-all group-hover:translate-x-1">
                          Operational Status <ArrowRight size={14} />
                      </div>
                  </div>
              </div>

              <div 
                onClick={() => navigate('/messages')}
                className="premium-card p-10 hover:border-accent-500 transition-all cursor-pointer group flex flex-col justify-between bg-white"
              >
                  <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-[32px] flex items-center justify-center group-hover:bg-accent-500/5 group-hover:text-accent-500 transition-all duration-500 mb-8 border border-slate-100">
                      <MessageSquare size={30} strokeWidth={1.5} />
                  </div>
                  <div>
                      <h4 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Dialogue Center</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">Direct encrypted communication for asset discussions and urgent notifications.</p>
                      <div className="mt-8 flex items-center gap-2 text-accent-500 font-black text-[10px] uppercase tracking-widest transition-all group-hover:translate-x-1">
                          Open Dialogues <ArrowRight size={14} />
                      </div>
                  </div>
              </div>

              <div className="md:col-span-2 premium-card p-10 bg-slate-50/30 border-dashed border-2">
                  <div className="flex items-center justify-between mb-8">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                          recent ledger activity
                      </h4>
                  </div>
                  <div className="space-y-4">
                      <div className="flex items-center gap-5 bg-white p-5 rounded-3xl shadow-sm border border-slate-100/60">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/5">
                              <CheckCircle2 size={18} />
                          </div>
                          <div className="flex-1">
                              <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Financial Commitment Confirmed</p>
                              <p className="text-[10px] text-slate-500 font-semibold tracking-wide mt-0.5">Processed for current lease cycle</p>
                          </div>
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">14 DAYS AGO</span>
                      </div>
                      <div className="flex items-center gap-5 bg-white p-5 rounded-3xl shadow-sm border border-slate-100/60 opacity-60">
                          <div className="w-10 h-10 rounded-xl bg-accent-500/10 text-accent-600 flex items-center justify-center border border-accent-500/5">
                              <AlertCircle size={18} />
                          </div>
                          <div className="flex-1">
                              <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Lease Amendment Available</p>
                              <p className="text-[10px] text-slate-500 font-semibold tracking-wide mt-0.5">Synthesized terms updated in configuration</p>
                          </div>
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">OCT 12</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
