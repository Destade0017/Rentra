import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, ChevronDown, LayoutGrid, List, RotateCcw, Building2, AlertCircle, Loader2 } from 'lucide-react';
import PropertyCard from '../components/properties/PropertyCard.jsx';
import PropertyStats from '../components/properties/PropertyStats.jsx';
import PropertyTable from '../components/properties/PropertyTable.jsx';
import AddPropertyModal from '../components/properties/AddPropertyModal.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { propertyService } from '../api/services.js';
import { useSettingsStore } from '../store/useSettingsStore.js';
import { cn } from '../utils/cn.js';

export default function Properties() {
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { isDemoMode } = useSettingsStore();

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await propertyService.getProperties();
      setProperties(response.data || []);
      setError(null);
    } catch (err) {
      setError('System sync failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const demoProperties = [
    { _id: 'd1', name: 'Royal Heritage Tower', address: '12 Victoria Island, Lagos', type: 'Residential', status: 'occupied', rent: 450000, units: 12 },
    { _id: 'd2', name: 'The Zenith Workspace', address: '45 Lekki Phase 1, Lagos', type: 'Commercial', status: 'occupied', rent: 1200000, units: 24 },
    { _id: 'd3', name: 'Greenwood Heights', address: 'Ikeja GRA, Lagos', type: 'Residential', status: 'maintenance', rent: 350000, units: 8 }
  ];

  const currentProperties = isDemoMode ? demoProperties : properties;

  return (
    <div className="space-y-10 animate-subtle-slide pb-16">
      {/* Search and Action Suite */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl font-black text-brand-500 tracking-tight">Asset Portfolio</h1>
          <p className="text-slate-500 mt-2 font-medium flex items-center gap-3">
             Registry holding <span className="text-slate-900 font-black">{currentProperties.length}</span> verified assets
            {loading && <Loader2 className="animate-spin text-accent-500" size={14} />}
            {isDemoMode && <span className="text-[9px] font-black text-amber-500 uppercase px-3 py-1 bg-amber-500/5 rounded-full ring-1 ring-amber-500/20 italic tracking-wider">Simulated Registry</span>}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group min-w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Query by asset name or address..." 
              className="w-full bg-white border border-slate-200/60 rounded-2xl py-3 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent-500/5 focus:border-accent-400/50 shadow-premium transition-all"
            />
          </div>

          <div className="flex items-center bg-white border border-slate-200/60 rounded-2xl p-1.5 shadow-premium">
             <button 
                onClick={() => setViewMode('grid')}
                className={cn(
                    "p-2.5 rounded-xl transition-all duration-300",
                    viewMode === 'grid' ? "bg-brand-500 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                )}
             >
                <LayoutGrid size={18} />
             </button>
             <button 
                onClick={() => setViewMode('table')}
                className={cn(
                    "p-2.5 rounded-xl transition-all duration-300",
                    viewMode === 'table' ? "bg-brand-500 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                )}
             >
                <List size={18} />
             </button>
          </div>

          <button className="flex items-center gap-2.5 bg-white border border-slate-200/60 px-5 py-3 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-premium uppercase tracking-widest">
            <Filter size={16} className="text-slate-400" />
            Class
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2.5 bg-accent-500 text-white px-6 py-3 rounded-2xl font-black text-xs shadow-xl shadow-accent-500/20 hover:bg-accent-600 hover:-translate-y-0.5 transition-all uppercase tracking-widest"
          >
            <Plus size={18} strokeWidth={3} />
            Add Asset
          </button>
        </div>
      </div>

      {/* Snapshot Performance */}
      <PropertyStats properties={currentProperties} />

      {/* Primary Workspace */}
      <div className="min-h-[400px]">
        {error ? (
            <div className="premium-card p-16 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-rose-500/5 text-rose-500 rounded-3xl flex items-center justify-center mb-6">
                    <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Environment Sync Failed</h3>
                <p className="text-slate-500 text-sm max-w-xs mb-8 font-medium leading-relaxed">{error}</p>
                <button 
                    onClick={fetchProperties}
                    className="flex items-center gap-2.5 bg-brand-500 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-600 transition-all shadow-lg"
                >
                    <RotateCcw size={16} /> Reconnect
                </button>
            </div>
        ) : loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white border border-slate-100 h-96 animate-pulse rounded-[40px]" />
                ))}
            </div>
        ) : currentProperties.length === 0 ? (
            <EmptyState 
                icon={Building2}
                title="Asset Registry Clear"
                message="No properties currently indexed. Initialize your first asset to enable portfolio intelligence and resident management."
                actionLabel="Add First Property"
                onAction={() => setIsModalOpen(true)}
            />
        ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
            ))}
            </div>
        ) : (
            <div className="premium-card overflow-hidden">
                <PropertyTable properties={currentProperties} />
            </div>
        )}
      </div>

      {/* Management Overlays */}
      <AddPropertyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProperties}
      />
    </div>
  );
}
