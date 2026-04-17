import React from 'react';
import { CreditCard, UserPlus, MessageSquare, AlertCircle, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn.js';

const activities = [
  {
    id: 1,
    type: 'payment',
    title: 'Rent Payment Received',
    desc: '₦450,000 from Sarah Williams',
    time: '2 hours ago',
    icon: CreditCard,
    color: 'text-emerald-500 bg-emerald-50'
  },
  {
    id: 2,
    type: 'tenant',
    title: 'New Tenant Onboarded',
    desc: 'Michael Chen assigned to Unit 4B',
    time: '5 hours ago',
    icon: UserPlus,
    color: 'text-blue-500 bg-blue-50'
  },
  {
    id: 3,
    type: 'issue',
    title: 'Maintenance Request',
    desc: 'Leaking faucet in Silverline Towers',
    time: 'Yesterday',
    icon: AlertCircle,
    color: 'text-amber-500 bg-amber-50'
  },
  {
    id: 4,
    type: 'payment',
    title: 'Rent Overdue',
    desc: 'David Smith - 3 days late',
    time: 'Yesterday',
    icon: CreditCard,
    color: 'text-red-500 bg-red-50'
  }
];

export default function ActivityFeed() {
  return (
    <div className="premium-card p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
        <button className="text-sm font-bold text-brand-500 hover:text-brand-600 flex items-center gap-0.5">
          View All <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-8 relative flex-1">
        {/* Timeline Line */}
        <div className="absolute left-6 top-2 bottom-2 w-px bg-slate-100" />

        {activities.map((activity) => (
          <div key={activity.id} className="relative flex gap-4 items-start">
            <div className={cn(
              "z-10 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm shrink-0",
              activity.color
            )}>
              <activity.icon size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800 tracking-tight">{activity.title}</span>
              <span className="text-xs text-slate-500 mt-0.5 leading-relaxed">{activity.desc}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-2">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
