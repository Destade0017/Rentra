import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, ChevronDown, TrendingUp } from 'lucide-react';
import { useSettingsStore } from '../../store/useSettingsStore.js';

const demoData = [
  { name: 'Jan', revenue: 2500000, collections: 90 },
  { name: 'Feb', revenue: 2800000, collections: 94 },
  { name: 'Mar', revenue: 3100000, collections: 88 },
  { name: 'Apr', revenue: 3250000, collections: 92 },
  { name: 'May', revenue: 3400000, collections: 96 },
  { name: 'Jun', revenue: 3600000, collections: 91 },
];

export default function RevenueChartCard({ payments = [] }) {
  const { isDemoMode } = useSettingsStore();

  const chartData = isDemoMode ? demoData : [];

  return (
    <div className="premium-card p-8 flex flex-col min-h-[480px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <TrendingUp size={16} className="text-brand-500" />
             <h3 className="text-lg font-bold text-slate-900 tracking-tight">Revenue Trajectory</h3>
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none">Global Portfolio Performance</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex flex-col items-end pr-4 border-r border-slate-100 hidden sm:flex">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth</span>
                <span className="text-sm font-bold text-emerald-500">+18.2%</span>
           </div>
           <button className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all">
                H1 2026 Reports <ChevronDown size={14} className="text-slate-400" />
           </button>
        </div>
      </div>

      <div className="flex-1 w-full h-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }}
              tickFormatter={(value) => `₦${value/1000000}M`}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '24px', 
                border: 'none', 
                boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
                padding: '20px'
              }}
              labelStyle={{ fontWeight: 800, color: '#0f172a', marginBottom: '8px', fontSize: '14px', textTransform: 'uppercase' }}
              itemStyle={{ fontWeight: 700, color: '#6366f1', fontSize: '13px' }}
              formatter={(value) => [`₦${value.toLocaleString()}`, 'Total Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#6366f1" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              animationDuration={2500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
