import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  BarChart3, 
  Wrench, 
  MessageSquare, 
  Settings,
  Menu as MenuIcon,
  X,
  CreditCard,
  Home,
  LogOut,
  ShieldCheck,
  Plus,
  Sparkles
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn.js';
import { useAuthStore } from '../../store/useAuthStore.js';
import { useSettingsStore } from '../../store/useSettingsStore.js';

const landlordItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Building2, label: 'Properties', path: '/properties' },
  { icon: Users, label: 'Residents', path: '/tenants' },
  { icon: Sparkles, label: 'AI Assistant', path: '/assistant' },
  { icon: BarChart3, label: 'Financials', path: '/payments' },
  { icon: MessageSquare, label: 'Communications', path: '/messages' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const mobileNavItems = [
  { icon: LayoutDashboard, label: 'Home', path: '/' },
  { icon: Building2, label: 'Assets', path: '/properties' },
  { icon: Users, label: 'Tenants', path: '/tenants' },
  { icon: MessageSquare, label: 'Chat', path: '/messages' },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const { isDemoMode } = useSettingsStore();
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = user?.role === 'landlord' ? landlordItems : [
      { icon: Home, label: 'Dashboard', path: '/tenant-dashboard' },
      { icon: CreditCard, label: 'Pay Rent', path: '/rent-status' },
      { icon: Wrench, label: 'Repair', path: '/complaints' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full z-40 bg-brand-500 border-r border-brand-600/20 transition-all duration-300 ease-in-out select-none hidden lg:flex flex-col w-64"
      )}>
        <div className="flex flex-col h-full p-6">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
              <ShieldCheck className="text-accent-400" size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white leading-tight">Rentra</span>
              <span className="text-[10px] font-black text-accent-400 uppercase tracking-widest mt-0.5 opacity-80">Landlord Suite</span>
            </div>
          </Link>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 group",
                  activePath === item.path 
                    ? "bg-white/10 text-white shadow-xl border border-white/5" 
                    : "text-brand-200 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={20} className={cn(
                  "transition-all",
                  activePath === item.path ? "text-accent-400" : "text-brand-300 group-hover:text-white"
                )} />
                <span className="text-sm font-bold">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/5 space-y-4">
             {isDemoMode && (
                 <div className="px-4 py-2 bg-amber-500/10 text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                     DEMO DATA LOADED
                 </div>
             )}
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-brand-300 hover:bg-rose-500/10 hover:text-rose-400 transition-all font-bold text-sm"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 z-50 flex lg:hidden items-center justify-around px-2 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
          {mobileNavItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={cn(
                    "flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all",
                    activePath === item.path ? "text-accent-500" : "text-slate-400"
                )}
              >
                  <item.icon size={22} strokeWidth={activePath === item.path ? 2.5 : 2} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
              </Link>
          ))}
          <button 
            onClick={() => navigate('/tenants')}
            className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg -mt-10"
          >
              <Plus size={24} strokeWidth={3} />
          </button>
      </div>

    </>
  );
}
