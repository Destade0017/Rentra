import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useNotificationStore = create(
  persist(
    (set) => ({
      notifications: [
        {
          id: 1,
          title: 'Welcome to Rentra',
          message: 'Your high-fidelity asset management console is initialized.',
          time: 'Initialization complete',
          type: 'info',
          unread: true
        },
        {
          id: 2,
          title: 'Strategic Reminder',
          message: 'Financial summary for H1 2026 is ready for review.',
          time: '1 hour ago',
          type: 'warning',
          unread: true
        }
      ],
      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            id: Date.now(),
            time: 'Just now',
            unread: true,
            ...notification
          },
          ...state.notifications
        ]
      })),
      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, unread: false } : n
        )
      })),
      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, unread: false }))
      })),
      clearAll: () => set({ notifications: [] })
    }),
    {
      name: 'rentra-notifications'
    }
  )
);
