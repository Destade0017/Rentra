import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api') + '/auth';

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
          const response = await axios.post(`${API_URL}/login`, { email, password });
          if (response.data.success) {
            set({ 
              user: { 
                id: response.data._id, 
                name: response.data.name, 
                email: response.data.email, 
                role: response.data.role 
              }, 
              token: response.data.token,
              isAuthenticated: true,
              loading: false 
            });
            return { success: true };
          }
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Login failed', 
            loading: false 
          });
          return { success: false, message: get().error };
        }
      },

      // Register action
      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/register`, userData);
          if (response.data.success) {
            set({ 
              user: { 
                id: response.data._id, 
                name: response.data.name, 
                email: response.data.email, 
                role: response.data.role 
              }, 
              token: response.data.token,
              isAuthenticated: true,
              loading: false 
            });
            return { success: true };
          }
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Registration failed', 
            loading: false 
          });
          return { success: false, message: get().error };
        }
      },

      // Logout action
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, error: null });
        localStorage.removeItem('auth-storage'); // Clearing persisted state
      },

      // Clear Errors
      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage', // name of the item in storage (must be unique)
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
