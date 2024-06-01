import { useContext } from "react";
import { RightPanelContext } from "../../../context/RightPanelProvider";
import SharedLinksNotification from "./notifications/SharedLinksNotification";
import ToggledSharedLinksNotification from "./notifications/ToggledSharedLinksNotification";

export default function Notifications() {
  const { notifications, toggleRightPanel } = useContext(RightPanelContext);
  useContext(RightPanelContext);

  return (
    <div className="flex flex-col p-1 gap-1  w-full items-center">
      {notifications?.map((notification, index) => {
        return toggleRightPanel ? (
          <ToggledSharedLinksNotification key={index} notification={notification} />
        ) : (
          <SharedLinksNotification key={index} notification={notification} />
        );
      })}
    </div>
  );
}
