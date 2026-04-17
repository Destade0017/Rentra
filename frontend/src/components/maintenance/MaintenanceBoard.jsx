import React from 'react';
import TicketCard from './TicketCard.jsx';

const columns = [
  { id: 'new', title: 'New', color: 'bg-indigo-500' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-amber-500' },
  { id: 'waiting', title: 'Waiting on Vendor', color: 'bg-rose-500' },
  { id: 'resolved', title: 'Resolved', color: 'bg-emerald-500' },
];

export default function MaintenanceBoard({ tickets, onSelectTicket }) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-6 -mx-2 px-2 scrollbar-none">
      {columns.map((column) => {
        const columnTickets = tickets.filter(t => t.status === column.id);
        
        return (
          <div key={column.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
            {/* Column Header */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${column.color}`} />
                    <h3 className="font-bold text-slate-700 uppercase text-[11px] tracking-widest">{column.title}</h3>
                </div>
                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {columnTickets.length}
                </span>
            </div>

            {/* Column Body */}
            <div className="bg-slate-50/50 rounded-3xl p-3 min-h-[500px] border border-slate-100/50 flex flex-col gap-4">
                {columnTickets.map((ticket) => (
                    <TicketCard 
                        key={ticket.id} 
                        ticket={ticket} 
                        onClick={onSelectTicket}
                    />
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
