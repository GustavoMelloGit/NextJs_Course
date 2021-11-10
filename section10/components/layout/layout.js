import { Fragment, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import Notification from "../ui/notification";

import MainHeader from "./main-header";

function Layout(props) {
  const notification = useContext(NotificationContext);
  const activeNotification = notification.notification;
  let notificationType;

  if (activeNotification) {
    notificationType = {
      title: activeNotification.title,
      message: activeNotification.message,
      status: activeNotification.status,
    };
  }
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && <Notification {...notificationType} />}
    </Fragment>
  );
}

export default Layout;
