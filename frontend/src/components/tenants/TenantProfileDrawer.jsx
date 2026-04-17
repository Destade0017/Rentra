import React from 'react';
import { X, Mail, Phone, Calendar, DollarSign, MapPin, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn.js';
import { useNavigate } from 'react-router-dom';

export default function TenantProfileDrawer({ tenant, isOpen, onClose }) {
  const navigate = useNavigate();
  if (!tenant) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[70]"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[80] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-brand-500 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-brand-200 uppercase">
                    {tenant.name.split(' ').map(n => n[0]).join('')}
                 </div>
                 <div>
                    <h2 className="text-lg font-bold text-slate-800">{tenant.name}</h2>
                    <p className="text-[10px] text-brand-500 font-bold uppercase tracking-widest">Active Resident</p>
                 </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 shadow-sm transition-all border border-slate-100">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Contact Section */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Contact Details</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100/50">
                            <Mail size={16} className="text-slate-400" />
                            <span className="text-sm font-semibold text-slate-700">{tenant.email}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100/50">
                            <Phone size={16} className="text-slate-400" />
                            <span className="text-sm font-semibold text-slate-700">{tenant.phone}</span>
                        </div>
                    </div>
                </div>

                {/* Lease Section */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Lease Information</h3>
                    <div className="premium-card p-5 space-y-6">
                        <div className="flex justify-between items-start">
                              <div className="flex gap-3">
                                <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg h-9 w-9 flex items-center justify-center">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{tenant.property?.name || 'N/A'}</p>
                                    <p className="text-xs text-slate-400 font-medium">Unit {tenant.unit || 'N/A'}</p>
                                </div>
                             </div>
                             <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded">Active</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Rent</p>
                                <p className="text-sm font-bold text-slate-800">₦{tenant.rent?.toLocaleString() || '0'}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Next Due Date</p>
                                <p className="text-sm font-bold text-slate-800">{tenant.dueDate || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                            <div className="flex-1 space-y-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lease Start</p>
                                <p className="text-xs font-bold text-slate-600">{tenant.leaseStart ? new Date(tenant.leaseStart).toLocaleDateString() : 'N/A'}</p>
                            </div>
                            <div className="flex-1 space-y-1 text-right">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lease End</p>
                                <p className="text-xs font-bold text-slate-600">{tenant.leaseEnd ? new Date(tenant.leaseEnd).toLocaleDateString() : 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Placeholders for History & Requests */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Payment History</h3>
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                        <DollarSign size={24} className="text-slate-300 mb-2" />
                        <p className="text-xs text-slate-500 font-medium">View detailed payment logs and receipts after live data integration.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Maintenance Requests</h3>
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                        <AlertCircle size={24} className="text-slate-300 mb-2" />
                        <p className="text-xs text-slate-500 font-medium">No open maintenance requests recorded for this resident.</p>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex gap-3">
                <button 
                    onClick={async () => {
                        const { useSettingsStore } = await import('../../store/useSettingsStore.js');
                        const { useNotificationStore } = await import('../../store/useNotificationStore.js');
                        const setActionLoading = useSettingsStore.getState().setActionLoading;
                        
                        setActionLoading(true);
                        // Simulate API Delay
                        await new Promise(r => setTimeout(r, 1500));
                        setActionLoading(false);
                        
                        useNotificationStore.getState().addNotification({
                            title: 'Reminder Dispatched',
                            message: `Rent reminder sent to ${tenant.name}.`,
                            type: 'success'
                        });
                        alert(`Success: Rent reminder sent to ${tenant.name}.`);
                    }}
                    className="flex-1 py-3 bg-brand-500 text-white rounded-xl font-bold text-sm hover:bg-brand-600 transition-all shadow-lg shadow-brand-100 flex items-center justify-center gap-2"
                >
                    <Calendar size={16} /> Send Reminder
                </button>
                <button 
                    onClick={() => navigate('/messages')}
                    className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm"
                >
                    Send Message
                </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
