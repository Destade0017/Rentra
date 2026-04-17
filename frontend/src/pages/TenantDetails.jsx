import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  MessageSquare, 
  ArrowLeft, 
  Calendar, 
  CreditCard, 
  Home, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Plus,
  History,
  Wrench,
  User
} from 'lucide-react';
import { tenantService, paymentService } from '../api/services.js';
import { cn } from '../utils/cn.js';
import { useNotificationStore } from '../store/useNotificationStore.js';

export default function TenantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();
  const [tenant, setTenant] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const tenantRes = await tenantService.getTenantById(id);
      setTenant(tenantRes.data);
      
      const paymentRes = await paymentService.getTenantPayments(id);
      setPayments(paymentRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleWhatsApp = () => {
    const message = `Hello ${tenant.name}, just a friendly reminder regarding your rent for ${tenant.unit} at ${tenant.property?.name}. It is due on ${new Date(tenant.nextRentDate).toLocaleDateString()}. Thank you!`;
    window.open(`https://wa.me/${tenant.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${tenant.phone}`, '_self');
  };

  const markAsPaid = async () => {
      setSubmitting(true);
      try {
          // Simulation of marking as paid
          await new Promise(r => setTimeout(r, 1000));
          addNotification({ 
              title: 'Payment Recorded', 
              message: `Rent for ${tenant.name} has been updated to Paid.`,
              type: 'success' 
          });
          fetchData();
      } finally {
          setSubmitting(false);
      }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-pulse">
        <div className="w-20 h-20 bg-slate-100 rounded-full mb-4" />
        <div className="h-4 w-32 bg-slate-100 rounded mb-2" />
        <div className="h-3 w-48 bg-slate-50 rounded" />
    </div>
  );

  if (!tenant) return <div className="p-20 text-center">Tenant not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-subtle-slide">
      {/* Navigation */}
      <button 
        onClick={() => navigate('/tenants')}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all font-bold text-sm bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100"
      >
        <ArrowLeft size={16} /> Back to Directory
      </button>

      {/* Main Profile Shell */}
      <div className="bg-white rounded-[40px] shadow-premium overflow-hidden border border-slate-100">
          <div className="h-32 bg-brand-500 relative">
              <div className="absolute -bottom-12 left-10">
                  <div className="w-24 h-24 bg-white rounded-3xl p-1 shadow-xl ring-8 ring-white">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tenant.name}`} alt={tenant.name} className="w-full h-full rounded-2xl bg-slate-50" />
                  </div>
              </div>
          </div>

          <div className="pt-16 px-10 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">{tenant.name}</h1>
                  <p className="text-slate-500 font-medium flex items-center gap-2 mt-1 italic">
                    <Home size={16} className="text-slate-300" /> {tenant.unit} at {tenant.property?.name}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mt-6">
                      <div className={cn(
                          "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                          tenant.rentStatus === 'paid' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-rose-500/10 text-rose-600 border-rose-500/20 shadow-lg shadow-rose-500/5 animate-pulse"
                      )}>
                          {tenant.rentStatus}
                      </div>
                      <div className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-50 border border-slate-100 text-slate-500">
                          ₦{tenant.rent?.toLocaleString()}/year
                      </div>
                  </div>
              </div>

              <div className="flex items-center gap-3">
                  <button 
                    onClick={handleCall}
                    className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-slate-800 transition-all"
                  >
                      <Phone size={24} />
                  </button>
                  <button 
                    onClick={handleWhatsApp}
                    className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-all"
                  >
                      <MessageSquare size={24} />
                  </button>
                  <button className="w-14 h-14 bg-white border border-slate-200 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-all">
                      <MoreVertical size={24} />
                  </button>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Status and Action Card */}
          <div className="lg:col-span-1 space-y-6">
              <div className="premium-card p-8 space-y-8">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       Financial Health
                  </h3>
                  
                  <div className="space-y-6">
                      <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Nex Payment Due</p>
                          <div className="flex items-center gap-3 text-slate-900 font-black">
                              <Calendar size={18} className="text-accent-500" />
                              {tenant.nextRentDate ? new Date(tenant.nextRentDate).toLocaleDateString() : 'Not Set'}
                          </div>
                      </div>

                      <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Active Balance</p>
                          <div className="flex items-center gap-3 text-slate-900 font-black text-2xl tracking-tight">
                              ₦{tenant.balance?.toLocaleString() || 0}
                          </div>
                      </div>
                  </div>

                  <hr className="border-slate-50" />

                  <div className="space-y-3">
                      <button 
                         onClick={markAsPaid}
                         disabled={submitting}
                         className="w-full py-4 bg-accent-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-accent-500/10 hover:bg-accent-600 transition-all flex items-center justify-center gap-2"
                      >
                          {submitting ? 'Recording...' : 'Mark as Paid'} <CheckCircle2 size={16} />
                      </button>
                      <button 
                        onClick={handleWhatsApp}
                        className="w-full py-4 bg-emerald-100 text-emerald-700 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-200 transition-all flex items-center justify-center gap-2"
                      >
                          Send WhatsApp Reminder <MessageSquare size={16} />
                      </button>
                  </div>
              </div>

              {/* Quick Summary list */}
              <div className="premium-card p-6 bg-slate-50/50 border-dashed border-2">
                  <div className="flex items-center justify-between mb-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Maintenance</h4>
                  </div>
                  <div className="text-center py-6 text-slate-400 text-xs italic font-medium">
                      No open requests for this unit.
                  </div>
              </div>
          </div>

          {/* Payment History and Details */}
          <div className="lg:col-span-2 space-y-8">
              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="premium-card p-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-3">Unit Records</p>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-medium">Flat Number</span>
                            <span className="font-bold text-slate-900">{tenant.unit}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-medium">Lease Start</span>
                            <span className="font-bold text-slate-900">{tenant.leaseStart ? new Date(tenant.leaseStart).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-medium">Annual Rent</span>
                            <span className="font-bold text-slate-900">₦{tenant.rent?.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                <div className="premium-card p-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-3">Communication Details</p>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-medium">Mobile</span>
                            <span className="font-bold text-slate-900">{tenant.phone}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 font-medium">Email</span>
                            <span className="font-bold text-slate-900 truncate ml-4">{tenant.email}</span>
                        </div>
                    </div>
                </div>
              </div>

              {/* Payment Log */}
              <div className="premium-card overflow-hidden">
                  <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                            <History size={20} className="text-slate-300" />
                            Transaction Log
                        </h3>
                        <button className="flex items-center gap-2 text-[10px] font-black text-accent-500 uppercase tracking-widest hover:text-accent-600 transition-all">
                             <Plus size={14} /> Manul Entry
                        </button>
                  </div>
                  {payments.length === 0 ? (
                      <div className="p-20 text-center flex flex-col items-center">
                          <CreditCard size={48} className="text-slate-100 mb-4" />
                          <p className="text-slate-400 text-sm font-medium">No historical transactions found.</p>
                      </div>
                  ) : (
                      <div className="divide-y divide-slate-50">
                          {payments.map(payment => (
                              <div key={payment._id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all">
                                  <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400">
                                          <TrendingUp size={20} />
                                      </div>
                                      <div>
                                          <p className="text-xs font-black text-slate-900">Rent Payment for {new Date(payment.createdAt).getFullYear()}</p>
                                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{payment.method || 'Bank Transfer'}</p>
                                      </div>
                                  </div>
                                  <div className="text-right">
                                      <p className="text-sm font-black text-slate-900">₦{payment.amount?.toLocaleString()}</p>
                                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{new Date(payment.createdAt).toLocaleDateString()}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
}
