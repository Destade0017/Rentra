import React, { useState } from 'react';
import { X, User, MapPin, Calendar, Clock, MessageSquare, Wrench, ChevronDown, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn.js';
import { complaintService } from '../../api/services.js';

export default function TicketDrawer({ ticket, isOpen, onClose, onRefresh }) {
  const [loading, setLoading] = useState(false);

  if (!ticket) return null;

  const handleUpdateStatus = async (newStatus) => {
    setLoading(true);
    try {
      await complaintService.updateStatus(ticket._id, newStatus);
      onRefresh?.();
      onClose();
    } catch (err) {
      console.error('Failed to update ticket status', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70]"
          />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-[80] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-brand-500 text-white rounded-xl shadow-lg shadow-brand-100">
                        <Wrench size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Support Case Details</h2>
                        <p className="text-[10px] text-brand-500 font-bold uppercase tracking-widest mt-0.5">Reference #{ticket._id?.slice(-8)}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 shadow-sm transition-all border border-slate-100">
                    <X size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10">
                {/* Title and Description */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{ticket.title}</h3>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            {ticket.description || "No detailed description provided."}
                        </p>
                    </div>
                </div>

                {/* Status and Action */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Current Status</label>
                         <div className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm">
                            <span className="flex items-center gap-2 uppercase">
                                <div className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    ticket.status === 'new' ? "bg-indigo-500" : 
                                    ticket.status === 'resolved' ? "bg-emerald-500" : "bg-amber-500"
                                )} />
                                {ticket.status.replace('_', ' ')}
                            </span>
                         </div>
                    </div>
                    <div className="space-y-2">
                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Urgency</label>
                         <div className={cn(
                             "w-full flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase border",
                             (ticket.priority === 'Urgent' || ticket.priority === 'High') ? "bg-rose-50 border-rose-100 text-rose-600" : "bg-blue-50 border-blue-100 text-blue-600"
                         )}>
                            <AlertCircle size={14} />
                            {ticket.priority}
                         </div>
                    </div>
                </div>

                {/* Property & Tenant Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-50">
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Property Source</h4>
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">{ticket.property?.name || 'N/A'}</p>
                                <p className="text-[11px] text-slate-500 font-medium">{ticket.property?.address || 'Property'}</p>
                            </div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reporting Resident</h4>
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                                <User size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">{ticket.tenant?.name || 'Unknown'}</p>
                                <p className="text-[11px] text-slate-500 font-medium">Verified Resident</p>
                            </div>
                        </div>
                     </div>
                </div>

                {/* Timeline and Internal Notes */}
                <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Internal Activity</h4>
                    <div className="space-y-6 relative pl-6 border-l border-slate-100 ml-2">
                        <div className="relative">
                            <div className="absolute -left-[30px] top-0 w-3.5 h-3.5 bg-brand-500 rounded-full border-2 border-white shadow-sm" />
                            <p className="text-xs font-bold text-slate-800">Case opened by system</p>
                            <p className="text-[10px] text-slate-400 font-medium mt-0.5">{new Date(ticket.createdAt).toLocaleString()}</p>
                        </div>
                        {ticket.status !== 'new' && (
                            <div className="relative">
                                <div className={cn(
                                    "absolute -left-[30px] top-0 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm",
                                    ticket.status === 'resolved' ? "bg-emerald-500" : "bg-amber-500"
                                )} />
                                <p className="text-xs font-bold text-slate-800">Case updated to {ticket.status.replace('_', ' ')}</p>
                                <p className="text-[10px] text-slate-400 font-medium mt-0.5">{new Date(ticket.updatedAt).toLocaleString()}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                 {ticket.status !== 'in_progress' && ticket.status !== 'resolved' && (
                    <button 
                        onClick={() => handleUpdateStatus('in_progress')}
                        disabled={loading}
                        className="flex-1 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-100/50 transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Wrench size={16} />} Start Repairs
                    </button>
                 )}
                 {ticket.status !== 'resolved' && (
                    <button 
                        onClick={() => handleUpdateStatus('resolved')}
                        disabled={loading}
                        className="flex-1 py-3.5 bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />} Resolve Case
                    </button>
                 )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
