import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/axios.js';

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Login action
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('/auth/login', { email, password });
          if (response.data.success) {
            const userData = response.data.data;
            set({ 
              user: { 
                id: userData._id, 
                name: userData.name, 
                email: userData.email, 
                role: userData.role 
              }, 
              token: userData.token,
              isAuthenticated: true,
              loading: false 
            });
            return { success: true };
          }
        } catch (error) {
          const message = error.response?.data?.message || error.response?.data?.error || 'Login failed';
          set({ error: message, loading: false });
          return { success: false, message: get().error };
        }
      },

      // Register action
      register: async (userData) => {
        set({ loading: true, error: null });
        console.log('Attempting registration with:', { ...userData, password: '***' });
        try {
          const response = await api.post('/auth/register', userData);
          console.log('Registration response:', response.data);
          
          if (response.data.success) {
            const registeredUser = response.data.data;
            set({ 
              user: { 
                id: registeredUser._id, 
                name: registeredUser.name, 
                email: registeredUser.email, 
                role: registeredUser.role 
              }, 
              token: registeredUser.token,
              isAuthenticated: true,
              loading: false 
            });
            console.log('Registration successful, state updated.');
            return { success: true };
          }
        } catch (error) {
          const message = error.response?.data?.message || error.response?.data?.error || 'Registration failed';
          console.error('Registration failed:', message);
          set({ error: message, loading: false });
          return { success: false, message: get().error };
        }
      },

      // Forgot Password action
      forgotPassword: async (email) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('/auth/forgot-password', { email });
          set({ loading: false });
          return response.data;
        } catch (error) {
          const message = error.response?.data?.message || error.response?.data?.error || 'Request failed';
          set({ error: message, loading: false });
          return { success: false, message: get().error };
        }
      },

      // Reset Password action
      resetPassword: async (token, password) => {
        set({ loading: true, error: null });
        try {
          const response = await api.put(`/auth/reset-password/${token}`, { password });
          if (response.data.success) {
            const userData = response.data.data;
            set({ 
              user: { 
                id: userData._id, 
                name: userData.name, 
                email: userData.email, 
                role: userData.role 
              }, 
              token: userData.token,
              isAuthenticated: true,
              loading: false 
            });
            return { success: true };
          }
        } catch (error) {
          const message = error.response?.data?.message || error.response?.data?.error || 'Reset failed';
          set({ error: message, loading: false });
          return { success: false, message: get().error };
        }
      },

      // Fetch current user (Production-ready sync)
      fetchMe: async () => {
        try {
          const response = await api.get('/auth/me');
          if (response.data.success) {
            set({ user: response.data.data, isAuthenticated: true });
          }
        } catch (error) {
          // If 401, the axios interceptor already handles logout
        }
      },

      // Logout action
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, error: null });
        localStorage.removeItem('auth-storage');
      },

      // Clear Errors
      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);
