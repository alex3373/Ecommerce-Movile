import React, { createContext, useContext, useState } from 'react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read: boolean;
  favorite?: boolean;
  type?: string;  
  role?: string;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  addNotification: (title: string, message: string) => void;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = (title: string, message: string) => {
    const newNotification: NotificationItem = {
      id: Date.now().toString(),
      title,
      message,
      read: false,
      favorite: false,
      type: 'general',
      role: 'cliente',
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, favorite: !n.favorite } : n))
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAsRead, deleteNotification, toggleFavorite }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotificationContext debe usarse dentro de NotificationProvider");
  return context;
};

export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      const result = await Notification.requestPermission();
      console.log("Permiso para notificaciones:", result);
    } else {
      console.log("Permiso ya configurado:", Notification.permission);
    }
  } else {
    console.log("Las notificaciones no son compatibles con este navegador.");
  }
};
