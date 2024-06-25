import { useContext } from "react";
import { NotificationType } from "../../../../lib/interfaces/notifications";
import {  useDispatch } from "react-redux";
import { RootState } from "../../../../state/store";
import { setToggleRightPanel } from "../../../../state/rightPanel/rightPanelSlice";

interface ToggledSharedLinksNotificationProps {
  notification: NotificationType;
}
export default function ToggledSharedLinksNotification({
  notification,
}: ToggledSharedLinksNotificationProps) {
  const dispatch = useDispatch();

  return (
    <div
      className="flex items-center justify-center relative cursor-pointer"
      onClick={() => dispatch(setToggleRightPanel(true))}
    >
      <img
        src={notification.sender.profile_picture}
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
