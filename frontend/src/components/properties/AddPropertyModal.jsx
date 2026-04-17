import React, { useState } from 'react';
import { X, Building2, MapPin, List, DollarSign, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { propertyService } from '../../api/services.js';

export default function AddPropertyModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: 'Apartment',
    rent: '',
    status: 'vacant'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await propertyService.createProperty(formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess();
        onClose();
        setFormData({ name: '', address: '', type: 'Apartment', rent: '', status: 'vacant' });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create property');
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
          className="relative bg-white w-full max-w-3xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Add New Property</h2>
              <p className="text-[10px] text-brand-500 font-bold uppercase tracking-widest mt-0.5">Physical Asset Onboarding</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-xl text-slate-400 transition-colors border border-slate-100">
              <X size={20} />
            </button>
          </div>

          <form className="flex-1 overflow-y-auto p-8" onSubmit={handleSubmit}>
            {success ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-2xl flex items-center justify-center mb-4 animate-bounce">
                        <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Success!</h3>
                    <p className="text-slate-500 text-sm">Property has been successfully listed in your portfolio.</p>
                </div>
            ) : (
                <div className="space-y-6">
                {error && (
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-sm font-semibold">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Property Name</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                            <Building2 size={18} />
                            </div>
                            <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="e.g. Royal Heritage Apartments" 
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                            required
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Physical Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                            <MapPin size={18} />
                            </div>
                            <input 
                            type="text" 
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            placeholder="Full location address" 
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                            required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Property Type</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                            <List size={18} />
                            </div>
                            <select 
                             value={formData.type}
                             onChange={(e) => setFormData({...formData, type: e.target.value})}
                             className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium appearance-none"
                            >
                            <option>Apartment</option>
                            <option>Office Space</option>
                            <option>Warehouse</option>
                            <option>Shop / Retail</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Base Monthly Rent</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                            <DollarSign size={18} />
                            </div>
                            <input 
                             type="number" 
                             value={formData.rent}
                             onChange={(e) => setFormData({...formData, rent: e.target.value})}
                             placeholder="₦ Value" 
                             className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                             required
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 block mb-3">Property Images</label>
                        <div className="border-2 border-dashed border-slate-100 rounded-[32px] p-12 text-center hover:bg-slate-50 transition-colors group cursor-pointer">
                            <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                <Upload className="text-slate-400" size={24} />
                            </div>
                            <p className="text-sm font-bold text-slate-700">Drop property photos here</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">PNG, JPG up to 10MB</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pt-10 pb-2">
                    <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-colors">
                        Cancel
                    </button>
                    <button 
                     type="submit" 
                     disabled={loading}
                     className="flex-1 py-4 bg-brand-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-brand-200 hover:bg-brand-600 hover:-translate-y-1 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Launch Listing"}
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
