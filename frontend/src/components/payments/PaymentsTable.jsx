import React from 'react';
import { FileText, MoreHorizontal, Download, CreditCard, Banknote } from 'lucide-react';
import { cn } from '../../utils/cn.js';

export default function PaymentsTable({ transactions }) {
  return (
    <div className="premium-card overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white">
        <h3 className="text-lg font-bold text-slate-800">Transaction Ledger</h3>
        <button className="flex items-center gap-2 text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors uppercase tracking-widest">
            <Download size={14} /> Export Ledger
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resident</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Method</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payment Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-bold text-slate-800 tracking-tight">{tx.tenant}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{tx.property}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-900">{tx.amount}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    {tx.method === 'Bank Transfer' ? <Banknote size={14} /> : <CreditCard size={14} />}
                    <span className="text-xs font-semibold">{tx.method}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs font-bold text-slate-600">{tx.date}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-[10px] font-bold uppercase px-2.5 py-1 rounded-full",
                    tx.status === 'Paid' ? "bg-emerald-50 text-emerald-600" : 
                    tx.status === 'Pending' ? "bg-amber-50 text-amber-600" :
                    "bg-rose-50 text-rose-600"
                  )}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={18} />
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
