import SharedLinksNotification from "./notifications/SharedLinksNotification";
import ToggledSharedLinksNotification from "./notifications/ToggledSharedLinksNotification";
import ConnectionRequests from "./notifications/ConnectionRequests";
import ToggledConnectionRequests from "./notifications/ToggledConnectionRequests";

import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

export default function Notifications() {
  const { toggleRightPanel } = useSelector(
    (state: RootState) => state.rightPanel
  );
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  return (
    <div className="flex flex-col p-1 gap-3 w-full items-center">
      {notifications.shared.map((notification, index) => {
        return toggleRightPanel ? (
          <ToggledSharedLinksNotification
            key={index}
            notification={notification}
          />
        ) : (
          <SharedLinksNotification key={index} notification={notification} notificationIndex={index} />
        );
      })}
        {toggleRightPanel ? (
          <ToggledConnectionRequests/>
        ) : (
          <ConnectionRequests/>
        )}
    </div>
  );
}
