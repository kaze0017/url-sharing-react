import SharedLinksNotification from "./notifications/SharedLinksNotification";
import ToggledSharedLinksNotification from "./notifications/ToggledSharedLinksNotification";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

export default function Notifications() {
  const { notifications, toggleRightPanel } = useSelector(
    (state: RootState) => state.rightPanel
  );

  return (
    <div className="flex flex-col p-1 gap-1  w-full items-center">
      {notifications?.map((notification, index) => {
        return toggleRightPanel ? (
          <ToggledSharedLinksNotification
            key={index}
            notification={notification}
          />
        ) : (
          <SharedLinksNotification key={index} notification={notification} />
        );
      })}
    </div>
  );
}
