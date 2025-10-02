import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Funciones de manejo de notificaciones
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

  // Simulación de notificaciones cada 10 segundos (solo para prueba)
  useEffect(() => {
    const interval = setInterval(() => {
      addNotification(
        'Notificación de prueba',
        `Se generó a las ${new Date().toLocaleTimeString()}`
      );
    }, 10000); // 10000 ms = 10 segundos

    return () => clearInterval(interval); // Limpiar al desmontar
  }, []);

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
