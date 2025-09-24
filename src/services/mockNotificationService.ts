export const simulateMockNotifications = (addNotification: (title: string, message: string) => void) => {
  
  const interval = setInterval(() => {
    const title = '¡Nueva notificación!';
    const message = 'Esta es una notificación de prueba enviada automáticamente.';

    
    addNotification(title, message);

   
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: '/assets/icon/logo.png', 
      });
    }
  }, 300000); 

  return () => clearInterval(interval);
};
