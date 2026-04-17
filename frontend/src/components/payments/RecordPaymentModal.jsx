import React, { useState, useEffect } from 'react';
import { X, User, DollarSign, Calendar, CreditCard, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { paymentService, tenantService } from '../../api/services.js';

export default function RecordPaymentModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    tenantId: '',
    amount: '',
    paymentDate: '',
    method: 'Bank Transfer',
    notes: ''
  });
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchTenants = async () => {
        try {
          const res = await tenantService.getTenants();
          setTenants(res.data || []);
        } catch (err) {
          console.error('Failed to load tenants for payment recording');
        }
      };
      fetchTenants();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Find property from selected tenant to send propertyId
      const tenant = tenants.find(t => t._id === formData.tenantId);
      const payload = {
          ...formData,
          propertyId: tenant?.property?._id
      };
      
      await paymentService.recordPayment(payload);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
        onClose();
        setFormData({ tenantId: '', amount: '', paymentDate: '', method: 'Bank Transfer', notes: '' });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Transaction recording failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/30">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Record Rent Payment</h2>
              <p className="text-[10px] text-brand-500 font-bold uppercase tracking-widest mt-0.5">Log a manual transaction for a tenant</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-xl text-slate-400 border border-slate-100 shadow-sm">
              <X size={20} />
            </button>
          </div>

          <form className="p-8 space-y-6" onSubmit={handleSubmit}>
            {success ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-2xl flex items-center justify-center mb-4 animate-bounce">
                        <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Transaction Logged</h3>
                    <p className="text-slate-500 text-sm">Financial records have been updated successfully.</p>
                </div>
            ) : (
                <div className="space-y-6">
                {error && (
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-sm font-semibold">
                        {error}
                    </div>
                )}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Select Tenant</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                                <User size={18} />
                            </div>
                            <select 
                                value={formData.tenantId}
                                onChange={(e) => setFormData({...formData, tenantId: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium appearance-none"
                                required
                            >
                                <option value="">Select Resident...</option>
                                {tenants.map(t => (
                                    <option key={t._id} value={t._id}>{t.name} ({t.property?.name || 'N/A'})</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Amount Paid (₦)</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                                    <DollarSign size={18} />
                                </div>
                                <input 
                                    type="number" 
                                    value={formData.amount}
                                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                    placeholder="0" 
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium" 
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Payment Date</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                                    <Calendar size={18} />
                                </div>
                                <input 
                                    type="date" 
                                    value={formData.paymentDate}
                                    onChange={(e) => setFormData({...formData, paymentDate: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium uppercase" 
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Payment Method</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                                <CreditCard size={18} />
                            </div>
                            <select 
                                value={formData.method}
                                onChange={(e) => setFormData({...formData, method: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium appearance-none"
                            >
                                <option>Bank Transfer</option>
                                <option>Card Payment</option>
                                <option>Cash</option>
                                <option>Cheque</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Notes / Remarks</label>
                        <div className="relative group">
                            <div className="absolute top-3 left-4 text-slate-400 group-focus-within:text-brand-500 transition-colors">
                                <FileText size={18} />
                            </div>
                            <textarea 
                                value={formData.notes}
                                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                placeholder="Ref number, month details..." 
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium min-h-[100px]" 
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pt-6">
                    <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors">
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="flex-1 py-4 bg-brand-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-brand-200 hover:bg-brand-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Confirm Records"}
                    </button>
                </div>
                </div>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
