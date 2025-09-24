export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  favorite?: boolean;
};

const NOTIFICATIONS_KEY = 'notifications';

export const getNotificationsFromLocalStorage = (): NotificationItem[] => {
  const data = localStorage.getItem(NOTIFICATIONS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveNotificationsToLocalStorage = (notifications: NotificationItem[]) => {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
};

export const addNotification = (title: string, message: string) => {
  const notifications = getNotificationsFromLocalStorage();
  const newNotification: NotificationItem = {
    id: Date.now().toString(),
    title,
    message,
    read: false,
  };
  notifications.push(newNotification);
  saveNotificationsToLocalStorage(notifications);

  
  window.dispatchEvent(new Event('notificationsUpdated'));
};
