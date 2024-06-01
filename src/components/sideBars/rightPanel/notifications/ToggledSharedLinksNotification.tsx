import { useContext } from "react";
import { RightPanelContext } from "../../../../context/RightPanelProvider";

import { NotificationType } from "../../../../lib/interfaces/notifications";

interface ToggledSharedLinksNotificationProps {
  notification: NotificationType;
}
export default function ToggledSharedLinksNotification({
  notification,
}: ToggledSharedLinksNotificationProps) {
  const { setToggleRightPanel } = useContext(RightPanelContext);
  return (
    <div
      className="flex items-center justify-center relative cursor-pointer"
      onClick={() => setToggleRightPanel(false)}
    >
      <img
        src={notification.sharedBy.profile_picture}
        alt=""
        width={30}
        className="rounded-full aspect-square"
      />
      <div className="absolute top-0 right-0 translate-x-1 -translate-y-1 text-sm text-red-500">
        {notification.links.length}
      </div>
    </div>
  );
}
