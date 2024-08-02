import React from "react";
import { SharedLinkType } from "../../../../lib/interfaces";
// import { NotificationType } from "../../../../lib/interfaces/NotificationType";
import { RxCross1 } from "react-icons/rx";
import { RiCheckLine } from "react-icons/ri";
import { RiDatabase2Line } from "react-icons/ri";
import SharedLinkNotification from "./SharedLinkNotification";
import UndoTimerBtn from "./UndoTimerBtn";
import { SharedType } from "../../../../lib/interfaces/SharedType";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../state/store";
import { acceptLinks } from "../../../../state/notifications/notificationSlice";

interface SharedLinksNotificationProps {
  notification: SharedType;
  notificationIndex: number;
}

export default function SharedLinksNotification({
  notification,
  notificationIndex,
}: SharedLinksNotificationProps) {
  const [state, setState] = React.useState<"rejecting" | "accepting" | "none">(
    "none"
  );
  const [isExpanded, setIsExpanded] = React.useState(false);
  const sender = notification.sender;
  const date = notification.publicationDate
    ? new Date(notification.publicationDate)
    : new Date();
  const dateToDisplay = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const btn = " flex w-1/3 items-center justify-center uppercase text-2xs";
  const btnRejectClass = "text-red-500" + btn;
  const btnAcceptClass = "text-green-500" + btn;
  const btnExpandClass = "text-blue-500" + btn;

  const dispatch = useDispatch<AppDispatch>();

  async function handelAcceptAll() {
    const links = notification.links.map((link) => link.event_id);
    dispatch(acceptLinks({ links, sharedIndex: notificationIndex }));
  }

  return (
    <div className="text-xs flex flex-col gap-1 p-1 w-full border border-gray-950 bg-gray-100 rounded-md">
      {state === "rejecting" && (
        <div className="flex items-center p-1 w-full gap-2">
          <p>Undo Reject?</p>
          <UndoTimerBtn setState={setState} />
        </div>
      )}
      {state === "accepting" && <p>Accepting...</p>}
      {state === "none" && (
        <>
          <div className="flex flex-row uppercase justify-between p-1">
            <div className="flex items-center gap-2 font-semibold">
              <Avatar
                src={notification.sender.profile_picture}
                alt={notification.sender.first_name}
              />
              <p>
                {sender.first_name} {sender.last_name} (
                {notification.links.length})
              </p>
            </div>
            <p className="text-2xs">{dateToDisplay}</p>
          </div>
          <p>{notification.description}</p>
          <div className="flex flex-col w-full">
            {!isExpanded && ""}
            {isExpanded && (
              <div className="flex flex-col gap-2">
                {notification.links.map(
                  (link: SharedLinkType, index: number) => (
                    <SharedLinkNotification
                      key={index}
                      link={link}
                      sharedIndex={notificationIndex}
                    />
                  )
                )}
              </div>
            )}
          </div>
          <div className="flex w-full text-2xs">
            <button className={btnRejectClass} onClick={() => handelAcceptAll()}>
              <div className="flex flex-col items-center">
                <RxCross1 className="text-2xl" />
                <span className="text-gray-900">reject all</span>
              </div>
            </button>
            <button
              className={btnExpandClass}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex flex-col items-center">
                <RiDatabase2Line className="text-2xl" />
                <span className="text-gray-900">
                  {isExpanded ? "collapse" : "expand"}
                </span>
              </div>
            </button>
            <button
              className={btnAcceptClass}
              onClick={() => handelAcceptAll()}
            >
              <div className="flex flex-col items-center">
                <RiCheckLine className="text-2xl" />
                <span className="text-gray-900">accept all</span>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
