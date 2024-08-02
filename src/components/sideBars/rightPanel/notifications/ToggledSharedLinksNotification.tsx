import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { setToggleRightPanel } from "../../../../state/rightPanel/rightPanelSlice";
import Badge from "@mui/material/Badge";
import { Avatar } from "@mui/material";
import { SharedType } from "../../../../lib/interfaces/SharedType";

interface ToggledSharedLinksNotificationProps {
  notification: SharedType;
}
export default function ToggledSharedLinksNotification({
  notification,
}: ToggledSharedLinksNotificationProps) {
  const dispatch = useDispatch();

  return (
    <div
      className="flex items-center justify-center relative cursor-pointer"
      onClick={() => dispatch(setToggleRightPanel(false))}
    >
      <Badge badgeContent={notification.links.length} color="success">
        <Avatar
          src={notification.sender.profile_picture}
          alt={notification.sender.first_name}
        />
      </Badge>
    </div>
  );
}
