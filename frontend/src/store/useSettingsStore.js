import { create } from 'zustand';

export const useSettingsStore = create((set) => ({
  isDemoMode: false,
  toggleDemoMode: () => set((state) => ({ isDemoMode: !state.isDemoMode })),
  
  // Simulation for action loading states
  isActionLoading: false,
  setActionLoading: (val) => set({ isActionLoading: val }),
  
  // UI Density
  density: 'comfortable',
  setDensity: (val) => set({ density: val }),
}));
