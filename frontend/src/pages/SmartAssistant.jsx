import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  AlertCircle, 
  Send, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  MessageSquare, 
  ArrowRight,
  Zap,
  Bot,
  RefreshCw,
  Bell
} from 'lucide-react';
import { tenantService } from '../api/services.js';
import { useSettingsStore } from '../store/useSettingsStore.js';
import { cn } from '../utils/cn.js';
import { useNotificationStore } from '../store/useNotificationStore.js';

export default function SmartAssistant() {
  const { isDemoMode } = useSettingsStore();
  const { addNotification } = useNotificationStore();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await tenantService.getTenants();
      setTenants(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isDemoMode]);

  const demoTenants = [
    { _id: 't1', name: 'James Adeyemi', unit: 'A1', phone: '+2348012345678', rentStatus: 'overdue', rent: 450000, nextRentDate: '2026-03-15' },
    { _id: 't2', name: 'Sarah Chima', unit: 'B4', phone: '+2348129876543', rentStatus: 'unpaid', rent: 380000, nextRentDate: '2026-04-10' },
    { _id: 't3', name: 'Ibrahim Musa', unit: 'Floor 2-C', phone: '+2347031112222', rentStatus: 'paid', rent: 1200000, nextRentDate: '2026-05-20' },
    { _id: 't4', name: 'Felix Okoro', unit: 'G2', phone: '+2348030001111', rentStatus: 'overdue', rent: 250000, nextRentDate: '2026-02-28' }
  ];

  const currentTenants = isDemoMode ? demoTenants : tenants;
  
  // Logic Calculations
  const overdueTenants = currentTenants.filter(t => t.rentStatus === 'overdue' || t.rentStatus === 'unpaid');
  const totalUnpaid = overdueTenants.reduce((sum, t) => sum + (t.rent || 0), 0);
  const dueSoon = currentTenants.filter(t => {
      if (!t.nextRentDate) return false;
      const today = new Date();
      const dueDate = new Date(t.nextRentDate);
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 && diffDays <= 7;
  });

  // AI Message Generation Logic
  const generateMessage = (tenant, tone = 'professional') => {
    const templates = {
        professional: `Hello ${tenant.name}, trust you're doing well. Just a quick reminder that your rent for ${tenant.unit} was due on ${new Date(tenant.nextRentDate).toLocaleDateString()}. Please process the payment soon. Thank you.`,
        friendly: `Hi ${tenant.name}! 😊 Just checking in regarding the rent for ${tenant.unit}. It seems it's slightly past due. Let me know if you need any help with the payment process!`,
        urgent: `URGENT: Hello ${tenant.name}, your rent for ${tenant.unit} is currently overdue. Please ensure payment is made immediately to avoid lease penalties. Regards.`
    };
    return templates[tone];
  };

  const handleBulkRemind = () => {
    if (overdueTenants.length === 0) return;
    setGenerating(true);
    setTimeout(() => {
        setGenerating(false);
        addNotification({
            title: 'AI Nudge Complete',
            message: `Generated reminders for ${overdueTenants.length} tenants. WhatsApp queue ready.`,
            type: 'success'
        });
        // Open first one as example
        const first = overdueTenants[0];
        const msg = generateMessage(first, 'urgent');
        window.open(`https://wa.me/${first.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
    }, 1500);
  };

  const handleSingleRemind = (tenant) => {
      const msg = generateMessage(tenant, 'professional');
      window.open(`https://wa.me/${tenant.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-subtle-slide">
      {/* AI Header Section */}
      <div className="bg-brand-500 rounded-[48px] p-10 lg:p-16 text-white relative overflow-hidden shadow-elevated border border-white/5">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-400/20 blur-[120px] -mr-64 -mt-64 rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[80px] -ml-32 -mb-32 rounded-full" />
          
          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-12">
              <div className="space-y-6">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-accent-400">
                      <Sparkles size={14} />
                      AI Operations Center
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tight leading-tight">Smart Rent Assistant</h1>
                    <p className="text-white/60 font-medium text-lg max-w-lg leading-relaxed">
                        I've analyzed your portfolio records. You have <span className="text-white font-black">{overdueTenants.length} residents</span> awaiting payment nudges.
                    </p>
                  </div>
              </div>

              <div className="flex gap-4">
                  <button 
                    onClick={handleBulkRemind}
                    disabled={generating || overdueTenants.length === 0}
                    className="bg-white text-brand-500 px-8 py-5 rounded-[32px] font-black text-xs uppercase tracking-widest shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                  >
                      {generating ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} />}
                      Nudge All Overdue
                  </button>
              </div>
          </div>
      </div>

      {/* Smart Insight Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
          <div className="premium-card p-10 bg-white group cursor-default">
              <div className="w-14 h-14 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110">
                  <AlertCircle size={28} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Overdue Residents</p>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">{overdueTenants.length}</h3>
              <p className="text-xs text-rose-500 font-bold mt-4 flex items-center gap-1">
                  Requires immediate action
              </p>
          </div>

          <div className="premium-card p-10 bg-white group cursor-default">
              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110">
                  <TrendingUp size={28} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Pending Inflow</p>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">₦{totalUnpaid.toLocaleString()}</h3>
              <p className="text-xs text-emerald-500 font-bold mt-4 flex items-center gap-1">
                  Expected outstanding revenue
              </p>
          </div>

          <div className="premium-card p-10 bg-white group cursor-default">
              <div className="w-14 h-14 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110">
                  <Clock size={28} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Due Within 7 Days</p>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">{dueSoon.length}</h3>
              <p className="text-xs text-slate-400 font-bold mt-4">
                  Scheduled payment cycles
              </p>
          </div>
      </div>

      {/* Actionable Suggestions & Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Priority Suggestions */}
          <div className="space-y-6">
              <h3 className="text-xl font-black text-brand-500 tracking-tight flex items-center gap-2 ml-2">
                  <Bot className="text-accent-500" size={24} />
                  AI Priority Suggestions
              </h3>
              <div className="space-y-4">
                  {overdueTenants.length === 0 ? (
                      <div className="premium-card p-12 text-center flex flex-col items-center border-dashed">
                          <CheckCircle2 size={48} className="text-emerald-500/30 mb-4" />
                          <p className="text-slate-400 font-bold text-sm italic">All residents are current in their records.</p>
                      </div>
                  ) : (
                    overdueTenants.sort((a,b) => new Date(a.nextRentDate) - new Date(b.nextRentDate)).map(tenant => (
                        <div key={tenant._id} className="premium-card p-8 group hover:border-rose-500/30 transition-all">
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-slate-400">
                                        {tenant.unit}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 tracking-tight uppercase">{tenant.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">Overdue Status</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-slate-900">₦{tenant.rent?.toLocaleString()}</p>
                                    <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mt-1 italic">Last due: {new Date(tenant.nextRentDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                            
                            <div className="bg-slate-50/50 rounded-2xl p-6 mb-8 border border-slate-100 italic text-[11px] leading-relaxed text-slate-500 font-medium">
                                "I suggest a <span className="text-slate-900 font-black">Professional Nudge</span> for this resident. It's been {Math.ceil((new Date() - new Date(tenant.nextRentDate))/(1000*60*60*24))} days since the lease cycle reset."
                            </div>
                            
                            <button 
                                onClick={() => handleSingleRemind(tenant)}
                                className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all group/btn shadow-lg"
                            >
                                <Send size={14} /> Send Managed Reminder <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))
                  )}
              </div>
          </div>

          {/* AI Workflow Preview */}
          <div className="space-y-6">
              <h3 className="text-xl font-black text-brand-500 tracking-tight flex items-center gap-2 ml-2">
                  <Bell className="text-accent-500" size={24} />
                  Message Optimization
              </h3>
              <div className="premium-card p-10 bg-slate-900 text-white flex flex-col h-full min-h-[500px] overflow-hidden group">
                  <div className="flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-10">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-accent-400">
                               <Sparkles size={24} />
                          </div>
                          <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Contextual Logic</p>
                              <h4 className="font-black text-white tracking-tight">AI Reminder Composer</h4>
                          </div>
                      </div>

                      <div className="space-y-6 flex-1">
                            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4 hover:bg-white/10 transition-all cursor-default">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Professional Variant</span>
                                    <span className="text-[9px] text-white/30 font-bold italic">Default choice</span>
                                </div>
                                <p className="text-xs text-white/70 leading-relaxed font-medium">"Hello [Name], trust you're doing well. Just a quick reminder that your rent for [Unit] was due on [Date]. Please process the payment soon. Thank you."</p>
                            </div>

                            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4 opacity-50 hover:opacity-100 transition-all cursor-default">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Friendly Variant</span>
                                </div>
                                <p className="text-xs text-white/70 leading-relaxed font-medium">"Hi [Name]! 😊 Just checking in regarding the rent for [Unit]. It seems it's slightly past due. Let me know if you need any help with the payment process!"</p>
                            </div>

                            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4 opacity-50 hover:opacity-100 transition-all cursor-default border-rose-500/20">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Urgent Variant</span>
                                </div>
                                <p className="text-xs text-white/70 leading-relaxed font-medium italic">"URGENT: Hello [Name], your rent for [Unit] is currently overdue. Please ensure payment is made immediately to avoid lease penalties."</p>
                            </div>
                      </div>

                      <div className="mt-10 pt-10 border-t border-white/5">
                          <p className="text-[10px] text-white/30 font-black uppercase tracking-widest text-center">Rentra Adaptive Intelligence v1.0</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>

    </div>
  );
}
