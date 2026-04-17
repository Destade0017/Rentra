import React from 'react';
import { Eye, Edit2, Trash2, MoreHorizontal } from 'lucide-react';
import { cn } from '../../utils/cn.js';

export default function PropertyTable({ properties }) {
  return (
    <div className="premium-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Property</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly Rent</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tenants</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {properties.map((property) => (
              <tr key={property.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100">
                      <img src={property.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{property.name}</p>
                      <p className="text-xs text-slate-400 font-medium">{property.address}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{property.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-[10px] font-bold uppercase px-2.5 py-1 rounded-full",
                    (property.status === 'Occupied' || property.status === 'rented' || property.status === 'occupied') ? "bg-emerald-50 text-emerald-600" : 
                    property.status === 'maintenance' ? "bg-rose-50 text-rose-600" :
                    "bg-amber-50 text-amber-600"
                  )}>
                    {property.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-800">₦{property.rent?.toLocaleString()}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-600">{property.tenants} Units</p>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 hover:text-brand-500">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 hover:text-indigo-500">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
