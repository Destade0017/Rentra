import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, ChevronDown, Download, Users, Loader2, AlertCircle, RotateCcw, MessageSquare, Phone, ChevronRight } from 'lucide-react';
import TenantTable from '../components/tenants/TenantTable.jsx';
import TenantStats from '../components/tenants/TenantStats.jsx';
import AddTenantModal from '../components/tenants/AddTenantModal.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { tenantService } from '../api/services.js';
import { useSettingsStore } from '../store/useSettingsStore.js';
import { cn } from '../utils/cn.js';

export default function Tenants() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { isDemoMode } = useSettingsStore();

  const fetchTenants = async () => {
    setLoading(true);
    try {
      const response = await tenantService.getTenants();
      setTenants(response.data || []);
      setError(null);
    } catch (err) {
      setError('System communication failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, [isDemoMode]);

  const handleSelectTenant = (tenant) => {
    navigate(`/tenants/${tenant._id}`);
  };

  const demoTenants = [
    { _id: 't1', name: 'James Adeyemi', email: 'james@gmail.com', phone: '+234 801 234 5678', property: { name: 'Royal Heritage Tower' }, unit: 'A1', rent: 450000, rentStatus: 'overdue' },
    { _id: 't2', name: 'Sarah Chima', email: 'sarah.c@outlook.com', phone: '+234 812 987 6543', property: { name: 'Royal Heritage Tower' }, unit: 'B4', rent: 380000, rentStatus: 'paid' },
    { _id: 't3', name: 'Ibrahim Musa', email: 'musa.i@yahoo.com', phone: '+234 703 111 2222', property: { name: 'The Zenith Workspace' }, unit: 'Floor 2-C', rent: 1200000, rentStatus: 'unpaid' }
  ];

  const currentTenants = isDemoMode ? demoTenants : tenants;
  const filteredTenants = currentTenants.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.unit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-subtle-slide pb-20">
      {/* Search and Action Suite */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-2">
        <div>
          <h1 className="text-3xl font-black text-brand-500 tracking-tight">Resident Registry</h1>
          <p className="text-slate-500 mt-2 font-medium flex items-center gap-3">
             Directory of <span className="text-slate-900 font-black">{currentTenants.length}</span> verified residents
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative group w-full sm:min-w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search by name or unit..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200/60 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent-500/5 focus:border-accent-400/50 shadow-premium transition-all"
            />
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2.5 bg-accent-500 text-white px-8 py-4 rounded-2xl font-black text-xs shadow-xl shadow-accent-500/20 hover:bg-accent-600 transition-all uppercase tracking-widest"
          >
            <Plus size={18} strokeWidth={3} />
            Add Resident
          </button>
        </div>
      </div>

      {/* Snapshot Performance */}
      <TenantStats tenants={currentTenants} />

      {/* Primary Workspace - Responsive List */}
      <div className="px-2">
        {error ? (
            <div className="premium-card p-16 flex flex-col items-center justify-center text-center">
                <AlertCircle size={32} className="text-rose-500 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">System Sync Interrupted</h3>
                <button 
                    onClick={fetchTenants}
                    className="mt-6 bg-brand-500 text-white px-8 py-3.5 rounded-2xl font-black tracking-widest text-[10px] uppercase shadow-lg"
                >
                    Reconnect
                </button>
            </div>
        ) : loading ? (
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-24 bg-white animate-pulse rounded-3xl border border-slate-50" />
                ))}
            </div>
        ) : filteredTenants.length === 0 ? (
            <EmptyState 
                icon={Users}
                title="Registry Clear"
                message="No residents found in the current environment."
                actionLabel="Onboard First Resident"
                onAction={() => setIsModalOpen(true)}
            />
        ) : (
            <div className="space-y-4">
                {/* Desktop view could be table, but for practical mobile use, let's go with cards */}
                <div className="hidden lg:block">
                     <TenantTable tenants={filteredTenants} onSelectTenant={handleSelectTenant} />
                </div>
                
                {/* Mobile View - Cards */}
                <div className="grid grid-cols-1 gap-4 lg:hidden pb-12">
                    {filteredTenants.map(tenant => (
                        <div 
                           key={tenant._id}
                           onClick={() => handleSelectTenant(tenant)}
                           className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-premium flex items-center justify-between group active:scale-95 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100 italic font-black text-slate-300">
                                    {tenant.unit}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-black text-slate-900 tracking-tight">{tenant.name}</h4>
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            tenant.rentStatus === 'paid' ? "bg-emerald-500" : "bg-rose-500 animate-pulse"
                                        )} />
                                        <span className={cn(
                                            "text-[10px] font-black uppercase tracking-widest",
                                            tenant.rentStatus === 'paid' ? "text-emerald-600" : "text-rose-600"
                                        )}>
                                            {tenant.rentStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300">
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>

      <AddTenantModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchTenants}
      />
    </div>
  );
}
