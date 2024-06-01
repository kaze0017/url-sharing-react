import { useContext } from "react";
import { RightPanelContext } from "../../../context/RightPanelProvider";
import { MdOutlineHistory } from "react-icons/md";

import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { MdOutlineNotificationImportant } from "react-icons/md";

interface ActionBtnsProps {
  variant: "expanded" | "collapsed";
  notifications?: number;
}

export default function ActionBtns(props: ActionBtnsProps) {
  const { content, setContent } = useContext(RightPanelContext);

  const activeBtnClass = "text-2xl text-gray-900 cursor-pointer";
  const passiveBtnClass = "text-2xl text-gray-500 cursor-pointer";

  return props.variant === "expanded" ? (
    <div className="flex w-full items-center justify-between gap-2 text-xs">
      <div
        className="flex flex-col items-center"
        onClick={() => setContent("history")}
      >
        <MdOutlineHistory
          className={content === "history" ? activeBtnClass : passiveBtnClass}
        />
        <p>History</p>
      </div>
      <div
        className="flex flex-col items-center"
        onClick={() => setContent("suggestions")}
      >
        <AiOutlineUsergroupAdd
          className={
            content === "suggestions" ? activeBtnClass : passiveBtnClass
          }
        />

        <p>Suggestions</p>
      </div>
      <div
        className="flex flex-col items-center"
        onClick={() => setContent("search")}
      >
        <FiSearch
          className={content === "search" ? activeBtnClass : passiveBtnClass}
        />
        <p>Search</p>
      </div>
      <div
        className="flex flex-col items-center"
        onClick={() => setContent("notifications")}
      >
        <div className="relative">
          <MdOutlineNotificationImportant
            className={
              content === "notifications" ? activeBtnClass : passiveBtnClass
            }
          />
          <p className="absolute top-0 right-0 translate-x-1 -translate-y-1 text-red-700 font-semibold rounded-full bg-gray-50">
            {props.notifications}
          </p>
        </div>
        <p>Notifications</p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-1 p-1">
      <MdOutlineHistory
        className={content === "history" ? activeBtnClass : passiveBtnClass}
        onClick={() => setContent("history")}
      />
      <AiOutlineUsergroupAdd
        className={content === "suggestions" ? activeBtnClass : passiveBtnClass}
        onClick={() => setContent("suggestions")}
      />
      <FiSearch
        className={content === "search" ? activeBtnClass : passiveBtnClass}
        onClick={() => setContent("search")}
      />
      <div className="relative">
        <MdOutlineNotificationImportant
          className={
            content === "notifications" ? activeBtnClass : passiveBtnClass
          }
          onClick={() => setContent("notifications")}
        />
        <p className="absolute top-0 right-0 translate-x-1 -translate-y-1 text-red-700 font-semibold rounded-full">
          {props.notifications}
        </p>
      </div>
    </div>
  );
}
