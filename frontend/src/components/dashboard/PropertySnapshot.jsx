import React from 'react';
import { MapPin, Users, Wrench, Wallet } from 'lucide-react';
import { cn } from '../../utils/cn.js';

const properties = [
  {
    id: 1,
    name: 'Royal Heritage Apartments',
    address: 'Victoria Island, Lagos',
    revenue: '₦1.2M',
    status: '95% Occupied',
    issues: 0,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Silverline Towers',
    address: 'Lekki Phase 1, Lagos',
    revenue: '₦850k',
    status: '70% Occupied',
    issues: 2,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'The Grande Estates',
    address: 'Ikeja Gra, Lagos',
    revenue: '₦2.1M',
    status: '100% Occupied',
    issues: 1,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=400&auto=format&fit=crop'
  }
];

export default function PropertySnapshot() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="premium-card group overflow-hidden">
          <div className="h-48 overflow-hidden relative">
            <img 
              src={property.image} 
              alt={property.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-slate-800 shadow-sm">
                {property.status}
            </div>
          </div>
          <div className="p-5">
            <h4 className="font-bold text-slate-800 mb-1 group-hover:text-brand-500 transition-colors uppercase text-xs tracking-wider">
                {property.name}
            </h4>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-4">
              <MapPin size={12} className="text-slate-400" />
              {property.address}
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Monthly Revenue</span>
                <span className="text-sm font-bold text-slate-800">{property.revenue}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Active Issues</span>
                <span className={cn(
                  "text-sm font-bold px-2 rounded-md",
                  property.issues > 0 ? "text-amber-600 bg-amber-50" : "text-emerald-600 bg-emerald-50"
                )}>
                  {property.issues > 0 ? `${property.issues} pending` : 'Clean'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
