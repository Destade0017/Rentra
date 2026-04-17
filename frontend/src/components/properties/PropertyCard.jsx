import React from 'react';
import { MapPin, Home, Users, DollarSign, Eye, MoreHorizontal } from 'lucide-react';
import { cn } from '../../utils/cn.js';

export default function PropertyCard({ property }) {
  return (
    <div className="premium-card group transition-all duration-500 overflow-hidden border-slate-200/40">
      {/* Image Section */}
      <div className="h-52 overflow-hidden relative">
        <img 
          src={property.image || `https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop`} 
          alt={property.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className={cn(
          "absolute top-5 left-5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] shadow-lg backdrop-blur-xl border border-white/20",
          (property.status === 'Occupied' || property.status === 'rented' || property.status === 'occupied') ? "bg-emerald-500/80 text-white" : 
          (property.status === 'maintenance') ? "bg-amber-500/80 text-white" :
          "bg-indigo-500/80 text-white"
        )}>
          {property.status}
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-black text-slate-900 tracking-tight group-hover:text-accent-500 transition-colors text-sm uppercase">{property.name}</h3>
          <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-300 hover:text-slate-600 transition-all">
             <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-[11px] mb-6 font-medium">
          <MapPin size={13} className="text-slate-300" />
          <span className="truncate">{property.address}</span>
        </div>

        <div className="grid grid-cols-2 gap-y-6 pt-6 border-t border-slate-100/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-accent-500 group-hover:bg-accent-50 transition-all">
              <Home size={16} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1.5 tracking-wider">Classification</p>
              <p className="text-xs font-bold text-slate-900 leading-none">{property.type}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-accent-500 group-hover:bg-accent-50 transition-all">
              <DollarSign size={16} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1.5 tracking-wider">Lease Value</p>
              <p className="text-xs font-bold text-slate-900 leading-none">₦{property.rent?.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-accent-500 group-hover:bg-accent-50 transition-all">
              <Users size={16} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1.5 tracking-wider">Occupancy</p>
              <p className="text-xs font-bold text-slate-900 leading-none">{property.units || property.tenants || 0} Residents</p>
            </div>
          </div>

          <div className="flex justify-end items-center">
             <button className="flex items-center gap-2 text-[10px] font-black text-accent-500 uppercase tracking-widest hover:text-accent-600 transition-all group/btn">
                 Manage Asset <Eye size={14} className="group-hover/btn:scale-110" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
