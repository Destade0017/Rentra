import React, { useState } from 'react';
import { Bell, Search, Settings, HelpCircle, LogOut, CheckCheck, Trash2, User, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore.js';
import { useNotificationStore } from '../../store/useNotificationStore.js';
import { useSettingsStore } from '../../store/useSettingsStore.js';
import { cn } from '../../utils/cn.js';
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const { user, logout } = useAuthStore();
  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotificationStore();
  const { isDemoMode, toggleDemoMode } = useSettingsStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;
  const navigate = useNavigate();

  return (
    <div className="h-20 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl sticky top-0 z-30 px-10 flex items-center justify-between">
      {/* Search Simulation */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-500 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search dashboard or portfolio..." 
            className="w-full bg-slate-100/50 border border-slate-200/50 rounded-2xl py-2.5 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-accent-500/5 focus:border-accent-400/50 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Simulation Toggle */}
        <button 
            onClick={toggleDemoMode}
            className={cn(
                "hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-xl text-[11px] font-bold transition-all border",
                isDemoMode 
                    ? "bg-amber-500/5 border-amber-500/20 text-amber-600" 
                    : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
            )}
        >
            <div className={cn("w-1.5 h-1.5 rounded-full", isDemoMode ? "bg-amber-500 animate-pulse" : "bg-slate-300")} />
            {isDemoMode ? "PROTOTYPE ACTIVE" : "ENABLE SIMULATION"}
        </button>

        {/* Action Icons */}
        <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-400 hover:text-brand-500 transition-all rounded-xl hover:bg-slate-50">
                <HelpCircle size={18} />
            </button>
            <div className="relative">
                <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={cn(
                        "p-2.5 text-slate-400 hover:text-accent-500 transition-all rounded-xl hover:bg-accent-50 relative",
                        showNotifications && "text-accent-500 bg-accent-50"
                    )}
                >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-accent-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                            {unreadCount}
                        </span>
                    )}
                </button>

                <AnimatePresence>
                    {showNotifications && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                        <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 mt-3 w-80 lg:w-96 bg-white border border-slate-200/60 rounded-3xl shadow-elevated z-50 overflow-hidden"
                        >
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h4 className="font-bold text-slate-900 text-sm">Alert Center</h4>
                            <div className="flex gap-4">
                                <button onClick={markAllAsRead} className="text-[10px] font-black text-accent-500 uppercase tracking-widest hover:text-accent-600">Archive All</button>
                                <button onClick={clearAll} className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-600">Clear</button>
                            </div>
                        </div>
                        
                        <div className="max-h-[350px] overflow-y-auto">
                            {notifications.length > 0 ? (
                            notifications.map(notification => (
                                <div 
                                key={notification.id}
                                onClick={() => {
                                    markAsRead(notification.id);
                                    setShowNotifications(false);
                                }}
                                className={cn(
                                    "p-5 border-b border-slate-50 hover:bg-slate-50 transition-all cursor-pointer relative group",
                                    notification.unread && "bg-accent-500/5"
                                )}
                                >
                                {notification.unread && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-500" />
                                )}
                                <p className="text-xs font-bold text-slate-900 group-hover:text-accent-600 transition-colors">{notification.title}</p>
                                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{notification.message}</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] mt-3">{notification.time}</p>
                                </div>
                            ))
                            ) : (
                            <div className="p-16 text-center text-slate-400">
                                <Bell size={32} className="mx-auto mb-3 opacity-20" />
                                <p className="text-xs font-bold tracking-wide">Environment status: clear</p>
                            </div>
                            )}
                        </div>
                        </motion.div>
                    </>
                    )}
                </AnimatePresence>
            </div>
        </div>

        <div className="w-[1px] h-8 bg-slate-200" />

        {/* Identity Section */}
        <div className="flex items-center gap-4 group cursor-pointer">
             <div className="text-right hidden sm:block">
                 <p className="text-sm font-black text-slate-900 leading-none mb-1 group-hover:text-accent-500 transition-colors">{user?.name || 'Landlord'}</p>
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em]">{user?.role || 'Landlord'}</p>
             </div>
             <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200/60 shadow-sm group-hover:border-accent-300 transition-all ring-4 ring-slate-400/5">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Felix'}`} alt="profile" />
             </div>
             <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-900 transition-all" />
        </div>
      </div>
    </div>
  );
}
