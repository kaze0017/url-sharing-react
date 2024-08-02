import { MdOutlineHistory } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../state/store";
import { setContent } from "../../../state/rightPanel/rightPanelSlice";
import Badge from "@mui/material/Badge";
import { useEffect } from "react";
import { Tabs, Tab } from "@mui/material";

export default function ActionBtns() {
  const { content, toggleRightPanel } = useSelector(
    (state: RootState) => state.rightPanel
  );
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );

  const dispatch = useDispatch();

  const activeBtnClass = "text-2xl text-gray-900 cursor-pointer";
  const passiveBtnClass = "text-2xl text-gray-500 cursor-pointer";

  return !toggleRightPanel ? (
    <Tabs
      value={content}
      onChange={(event, newValue) => dispatch(setContent(newValue))}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
      scrollButtons="auto"
      orientation="horizontal"
    >
      <Tab
        value="history"
        icon={<MdOutlineHistory className="text-2xl" />}
        sx={{ minWidth: 50 }}
      />
      <Tab
        value="suggestions"
        icon={<AiOutlineUsergroupAdd className="text-2xl" />}
        sx={{ minWidth: 50 }}
      />
      <Tab
        value="search"
        icon={<FiSearch className="text-2xl" />}
        sx={{ minWidth: 50 }}
      />
      <Tab
        value="notifications"
        icon={
          <Badge
            badgeContent={
              notifications.shared.length +
              notifications.connection_request.length
            }
            color="success"
          >
            {/* <MailIcon color="action" /> */}
            <MdOutlineNotificationImportant
              className="text-2xl"
              title="Notifications"
            />
          </Badge>
        }
        sx={{ minWidth: 50 }}
      />
    </Tabs>
  ) : (
    <div className="flex flex-col gap-1 p-1">
      <Tabs
        value={content}
        onChange={(event, newValue) => dispatch(setContent(newValue))}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        orientation="vertical"
      >
        <Tab value="history" icon={<MdOutlineHistory className="text-2xl" />} />
        <Tab
          value="suggestions"
          icon={<AiOutlineUsergroupAdd className="text-2xl" />}
        />
        <Tab value="search" icon={<FiSearch className="text-2xl" />} />
        <Tab
          value="notifications"
          icon={
            <Badge
              badgeContent={
                notifications.shared.length +
                notifications.connection_request.length
              }
              color="error"
              overlap="circular"
              variant="dot"
            >
              <MdOutlineNotificationImportant
                className="text-2xl"
                onClick={() => dispatch(setContent("notifications"))}
              />
            </Badge>
          }
        />
      </Tabs>
    </div>
  );
}
