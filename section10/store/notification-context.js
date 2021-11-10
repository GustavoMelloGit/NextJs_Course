import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export function NotificationProvider(props) {
  const [notification, setNotification] = useState();

  useEffect(() => {
    if (notification && notification.status === ("success" || "error")) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  const showNotificationHandler = (notificationData) => {
    setNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setNotification(null);
  };

  const context = {
    notification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}
export default NotificationContext;
