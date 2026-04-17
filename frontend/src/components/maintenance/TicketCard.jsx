import React from 'react';
import { Calendar, User, MapPin, Tag } from 'lucide-react';
import { cn } from '../../utils/cn.js';

export default function TicketCard({ ticket, onClick }) {
  const priorityColors = {
    'Urgent': 'bg-rose-50 text-rose-600 border-rose-100',
    'High': 'bg-amber-50 text-amber-600 border-amber-100',
    'Medium': 'bg-blue-50 text-blue-600 border-blue-100',
    'Low': 'bg-slate-50 text-slate-600 border-slate-100'
  };

  return (
    <div 
      onClick={() => onClick(ticket)}
      className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group select-none"
    >
      <div className="flex justify-between items-start mb-3">
        <span className={cn(
          "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border",
          priorityColors[ticket.priority]
        )}>
          {ticket.priority}
        </span>
        <span className="text-[10px] font-bold text-slate-300 uppercase">#{ticket._id?.slice(-4)}</span>
      </div>

      <h4 className="text-sm font-bold text-slate-800 leading-snug mb-3 group-hover:text-brand-500 transition-colors">
        {ticket.title}
      </h4>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-slate-500">
            <User size={12} className="text-slate-400" />
            <span className="text-[11px] font-semibold">{ticket.tenant?.name || 'Unknown Tenant'}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
            <MapPin size={12} className="text-slate-400" />
            <span className="text-[11px] font-semibold truncate">{ticket.property?.name || 'N/A'} {ticket.property?.unit && `• Unit ${ticket.property.unit}`}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-lg">
            <Tag size={10} className="text-slate-400" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">{ticket.category}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
            <Calendar size={10} />
            <span className="text-[10px] font-bold">{new Date(ticket.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
