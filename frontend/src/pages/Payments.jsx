import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  AlertCircle, 
  Calendar, 
  Download, 
  Plus, 
  TrendingUp, 
  ChevronDown,
  Filter,
  Wallet,
  Loader2,
  RotateCcw
} from 'lucide-react';
import RevenueStatCard from '../components/payments/RevenueStatCard.jsx';
import PaymentsTable from '../components/payments/PaymentsTable.jsx';
import OverdueAlertsPanel from '../components/payments/OverdueAlertsPanel.jsx';
import RecordPaymentModal from '../components/payments/RecordPaymentModal.jsx';
import RevenueChartCard from '../components/payments/RevenueChartCard.jsx';
import { paymentService } from '../api/services.js';

export default function Payments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({ totalRevenue: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPaymentData = async () => {
    setLoading(true);
    try {
      const [paymentsRes, summaryRes] = await Promise.all([
        paymentService.getPayments(),
        paymentService.getSummary()
      ]);
      setPayments(paymentsRes.data || []);
      setSummary(summaryRes.data || { totalRevenue: 0, count: 0 });
      setError(null);
    } catch (err) {
      setError('Unable to fetch financial data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentData();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Command Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Financial Overview</h1>
          <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
            Real-time rent tracking & analytics
            {loading && <Loader2 className="animate-spin text-brand-500" size={14} />}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-100 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
            <Calendar size={18} className="text-slate-400" />
            April 2026
            <ChevronDown size={14} />
          </div>

          <button className="flex items-center gap-2 bg-white border border-slate-100 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm font-bold">
            <Download size={18} />
            Reports
          </button>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-brand-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-brand-200 hover:bg-brand-600 hover:-translate-y-0.5 transition-all ml-2 font-bold"
          >
            <Plus size={20} strokeWidth={3} />
            Record Payment
          </button>
        </div>
      </div>

      {error ? (
        <div className="premium-card p-16 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4">
                <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Financial Sync Failed</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-sm">{error}</p>
            <button 
                onClick={fetchPaymentData}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2"
            >
                <RotateCcw size={18} /> Try Refetching
            </button>
        </div>
      ) : (
        <>
            {/* KPI Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <RevenueStatCard 
                    title="Revenue Collected"
                    value={`₦${summary.totalRevenue.toLocaleString()}`}
                    subValue="Total MTD"
                    trend="up"
                    trendValue="+12.4%"
                    icon={Wallet}
                />
                <RevenueStatCard 
                    title="Outstanding Rent"
                    value="₦450,000"
                    subValue="Manual Entry"
                    trend="down"
                    trendValue="-2.1%"
                    icon={AlertCircle}
                    color="bg-rose-500"
                />
                <RevenueStatCard 
                    title="Transactions"
                    value={summary.count.toString()}
                    subValue="Processed entries"
                    trend="up"
                    trendValue="+3.5%"
                    icon={TrendingUp}
                    color="bg-emerald-500"
                />
                <RevenueStatCard 
                    title="Upcoming Dues"
                    value="₦320,000"
                    subValue="Projected week"
                    icon={Calendar}
                    color="bg-amber-500"
                />
            </div>

            {/* Analytics & Ledger Body */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    <RevenueChartCard payments={payments} />
                    <PaymentsTable transactions={payments} />
                </div>
                
                <div className="xl:col-span-1">
                    <OverdueAlertsPanel />
                </div>
            </div>
        </>
      )}

      {/* Overlays */}
      <RecordPaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchPaymentData}
      />
    </div>
  );
}
