import React from 'react';
import { MoreVertical, Mail, Phone, ExternalLink } from 'lucide-react';
import { cn } from '../../utils/cn.js';

export default function TenantTable({ tenants, onSelectTenant }) {
  return (
    <div className="premium-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tenant Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Property / Unit</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rent & Due Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payment Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lease Status</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tenants.map((tenant) => (
              <tr 
                key={tenant.id} 
                className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                onClick={() => onSelectTenant(tenant)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 uppercase">
                      {tenant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 tracking-tight">{tenant.name}</p>
                      <div className="flex items-center gap-3 mt-0.5 text-[10px] font-semibold text-slate-400">
                        <span className="flex items-center gap-1"><Mail size={10} /> {tenant.email}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-700">{tenant.property?.name || 'N/A'}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Unit {tenant.unit || 'N/A'}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-800">₦{tenant.rent?.toLocaleString() || '0'}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Due: {tenant.dueDate || 'N/A'}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border",
                    tenant.paymentStatus === 'paid' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                    tenant.paymentStatus === 'unpaid' ? "bg-amber-50 text-amber-600 border-amber-100" :
                    "bg-rose-50 text-rose-600 border-rose-100"
                  )}>
                    {tenant.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-slate-300 hover:text-brand-500 transition-all">
                        <ExternalLink size={16} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
