import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Building2, ArrowRight, AlertCircle, Loader2, ShieldCheck, UserCircle } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore.js';
import { motion } from 'framer-motion';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'landlord'
  });
  const { register, loading, error, clearError, isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = user?.role === 'landlord' ? '/' : '/tenant-dashboard';
      navigate(redirectPath, { replace: true });
    }
    return () => clearError();
  }, [isAuthenticated, user, navigate, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    if (result.success) {
      // Navigation handled by useEffect
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center shadow-xl shadow-brand-200">
                <Building2 className="text-white" size={28} />
            </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">Create your account</h2>
        <p className="mt-2 text-center text-sm text-slate-500 font-medium">
          Start managing your properties like a pro.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow-2xl shadow-slate-200/50 sm:rounded-[32px] sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-semibold">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                  placeholder="Alex Johnson"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                  placeholder="alex@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">I am a...</label>
              <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, role: 'landlord'})}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        formData.role === 'landlord' ? "border-brand-500 bg-brand-50/50" : "border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200"
                    }`}
                  >
                      <ShieldCheck size={24} className={formData.role === 'landlord' ? "text-brand-500" : "text-slate-400"} />
                      <span className={`text-xs font-bold ${formData.role === 'landlord' ? "text-brand-600" : "text-slate-500"}`}>Landlord</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, role: 'tenant'})}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                        formData.role === 'tenant' ? "border-brand-500 bg-brand-50/50" : "border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200"
                    }`}
                  >
                      <UserCircle size={24} className={formData.role === 'tenant' ? "text-brand-500" : "text-slate-400"} />
                      <span className={`text-xs font-bold ${formData.role === 'tenant' ? "text-brand-600" : "text-slate-500"}`}>Tenant</span>
                  </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand-500 text-white rounded-2xl py-4 font-bold text-sm shadow-xl shadow-brand-200 hover:bg-brand-600 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Create Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-slate-400 font-medium whitespace-nowrap">Already have an account?</span>{' '}
            <Link to="/login" className="text-brand-500 font-bold hover:text-brand-600">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
