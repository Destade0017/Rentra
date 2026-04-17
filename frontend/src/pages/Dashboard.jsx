import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Users, 
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  CreditCard,
  Building2,
  Phone,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import KPICard from '../components/dashboard/KPICard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { dashboardService, tenantService } from '../api/services.js';
import { useAuthStore } from '../store/useAuthStore.js';
import { useSettingsStore } from '../store/useSettingsStore.js';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '../utils/cn.js';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { isDemoMode } = useSettingsStore();
  const [stats, setStats] = useState(null);
  const [overdueTenants, setOverdueTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await dashboardService.getStats();
      setStats(res.data);
      
      // Also fetch a snapshot of tenants to find overdue ones
      const tenantsRes = await tenantService.getTenants();
      const overdue = (tenantsRes.data || []).filter(t => t.rentStatus === 'overdue' || t.rentStatus === 'unpaid');
      setOverdueTenants(overdue);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isDemoMode]);

  const currentStats = isDemoMode ? {
      totalRevenue: 3250000,
      paidTenants: 8,
      owingTenants: 4,
      totalTenants: 12,
  } : {
      totalRevenue: stats?.totalRevenue || 0,
      paidTenants: stats?.paidTenants || 0,
      owingTenants: stats?.tenantsCount - stats?.paidTenants || 0,
      totalTenants: stats?.tenantsCount || 0,
  };

  const demoOverdue = [
      { _id: 't1', name: 'James Adeyemi', unit: 'A1', phone: '+2348012345678', rentStatus: 'overdue' },
      { _id: 't2', name: 'Sarah Chima', unit: 'B4', phone: '+2348129876543', rentStatus: 'unpaid' },
  ];

  const displayOverdue = isDemoMode ? demoOverdue : overdueTenants;

  if (loading) return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse p-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-40 bg-slate-100 rounded-3xl" />)}
      </div>
  );

  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      {/* Quick Greeting */}
      <div className="px-4">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">E k'aabo, {user?.name?.split(' ')[0] || 'Landlord'}!</h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest italic opacity-70">Rentra Hub Overview</p>
      </div>

      {/* Primary Financial Stats - MASSIVE AND CLEAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
          <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20 group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <CreditCard size={120} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-3">Total Money Collected</p>
              <div className="flex flex-col">
                  <span className="text-4xl font-black tracking-tight leading-tight">₦{currentStats.totalRevenue.toLocaleString()}</span>
                  <span className="text-emerald-400 text-xs font-bold mt-2 flex items-center gap-1">
                      <TrendingUp size={14} /> This month
                  </span>
              </div>
          </div>

          <div className="bg-brand-500 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-3">Tenant Population</p>
              <div className="grid grid-cols-2 gap-6 mt-2">
                  <div>
                      <span className="text-3xl font-black text-white">{currentStats.paidTenants}</span>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Paid Rent</p>
                  </div>
                  <div>
                      <span className="text-3xl font-black text-rose-300">{currentStats.owingTenants}</span>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-rose-300">Owing</p>
                  </div>
              </div>
          </div>
      </div>

      {/* Critical Action Items - Overdue List */}
      <div className="px-4 space-y-4">
          <div className="flex items-center justify-between px-2">
               <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                   Immediate Focus
                   {displayOverdue.length > 0 && <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />}
               </h3>
               <Link to="/tenants" className="text-[11px] font-black text-accent-500 uppercase tracking-widest">
                   Full Directory
               </Link>
          </div>

          {displayOverdue.length === 0 ? (
              <div className="bg-white rounded-[40px] p-12 text-center border-2 border-dashed border-slate-100 flex flex-col items-center">
                  <CheckCircle2 size={48} className="text-emerald-500/30 mb-4" />
                  <p className="text-slate-400 text-sm font-bold">Everyone is currently up to date!</p>
              </div>
          ) : (
              <div className="space-y-4">
                  {displayOverdue.map(tenant => (
                      <div 
                        key={tenant._id}
                        onClick={() => navigate(`/tenants/${tenant._id}`)}
                        className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-premium flex items-center justify-between group cursor-pointer hover:border-accent-500 transition-all"
                      >
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center font-black">
                                  {tenant.unit}
                              </div>
                              <div>
                                  <p className="font-black text-slate-900 tracking-tight">{tenant.name}</p>
                                  <p className="text-xs text-rose-500 font-bold uppercase tracking-widest">Rent Overdue</p>
                              </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                              <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const message = `Hello ${tenant.name}, just a friendly reminder your rent for ${tenant.unit} is overdue. Please make payment. Thank you!`;
                                    window.open(`https://wa.me/${tenant.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
                                }}
                                className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"
                              >
                                  <MessageSquare size={18} />
                              </button>
                              <ChevronRight className="text-slate-200 group-hover:text-accent-500 transition-colors" size={20} />
                          </div>
                      </div>
                  ))}
              </div>
          )}
      </div>

      {/* Smart Assistant Nudge */}
      <div className="px-4">
          <div 
            onClick={() => navigate('/assistant')}
            className="bg-brand-500 rounded-[32px] p-6 text-white flex items-center justify-between cursor-pointer hover:bg-brand-600 transition-all shadow-xl group border border-white/10"
          >
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-accent-400">
                      <Sparkles size={24} />
                  </div>
                  <div>
                      <h4 className="font-black text-sm tracking-tight uppercase">Smart Rent Assistant</h4>
                      <p className="text-[10px] text-white/50 font-bold tracking-widest uppercase italic">AI is analyzing {overdueTenants.length} payment delays</p>
                  </div>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:bg-accent-500 transition-colors">
                  Open Assistant <ArrowRight size={14} />
              </div>
          </div>
      </div>

      {/* Quick Action Hub */}
      <div className="px-4 grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/properties')}
            className="premium-card p-6 flex flex-col items-center justify-center gap-3 text-slate-600 hover:border-accent-500 transition-all group"
          >
              <Building2 className="text-slate-300 group-hover:text-accent-500" size={32} />
              <span className="text-[10px] font-black uppercase tracking-widest italic">My Properties</span>
          </button>
          <button 
            onClick={() => navigate('/messages')}
            className="premium-card p-6 flex flex-col items-center justify-center gap-3 text-slate-600 hover:border-accent-500 transition-all group"
          >
              <MessageSquare className="text-slate-300 group-hover:text-accent-500" size={32} />
              <span className="text-[10px] font-black uppercase tracking-widest italic">Open Messages</span>
          </button>
      </div>

    </div>
  );
}
