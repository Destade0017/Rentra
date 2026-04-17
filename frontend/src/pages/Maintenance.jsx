import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, ChevronDown, Kanban, LayoutGrid, Loader2, AlertCircle, RotateCcw } from 'lucide-react';
import MaintenanceBoard from '../components/maintenance/MaintenanceBoard.jsx';
import RequestStats from '../components/maintenance/RequestStats.jsx';
import TicketDrawer from '../components/maintenance/TicketDrawer.jsx';
import NewRequestModal from '../components/maintenance/NewRequestModal.jsx';
import { complaintService } from '../api/services.js';
import { cn } from '../utils/cn.js';

export default function Maintenance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await complaintService.getComplaints();
      // Backend may return different status names than frontend mock, let's normalize if needed
      setTickets(response.data || []);
      setError(null);
    } catch (err) {
      setError('Support pipeline sync failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Command Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Maintenance Pipeline</h1>
          <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
            Managing <span className="text-slate-950 font-bold">{tickets.filter(t => t.status !== 'resolved').length}</span> active cases
            {loading && <Loader2 className="animate-spin text-brand-500" size={14} />}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by ticket ID..." 
              className="bg-white border border-slate-100 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 w-64 shadow-sm"
            />
          </div>

          <div className="flex items-center bg-white border border-slate-100 rounded-xl p-1 shadow-sm">
             <button className="p-2 rounded-lg bg-brand-50 text-brand-500 shadow-sm">
                <Kanban size={18} />
             </button>
             <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-not-allowed">
                <LayoutGrid size={18} />
             </button>
          </div>

          <button className="flex items-center gap-2 bg-white border border-slate-100 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm font-bold">
            <Filter size={18} />
            Priority
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-brand-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-brand-200 hover:bg-brand-600 hover:-translate-y-0.5 transition-all ml-2 font-bold"
          >
            <Plus size={20} strokeWidth={3} />
            New Request
          </button>
        </div>
      </div>

      {/* Stats KPI Row */}
      <RequestStats tickets={tickets} />

      {/* Main Workspace */}
      {error ? (
        <div className="premium-card p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4">
                <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Workspace Offline</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-sm">{error}</p>
            <button 
                onClick={fetchTickets}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2"
            >
                <RotateCcw size={18} /> Reconnect
            </button>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-slate-50 h-96 rounded-3xl animate-pulse" />
            ))}
        </div>
      ) : (
        <MaintenanceBoard 
            tickets={tickets} 
            onSelectTicket={handleSelectTicket} 
        />
      )}

      {/* Overlays */}
      <NewRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchTickets}
      />

      <TicketDrawer 
        ticket={selectedTicket} 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onRefresh={fetchTickets}
      />
    </div>
  );
}
