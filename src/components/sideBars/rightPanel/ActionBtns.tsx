import { MdOutlineHistory } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { MdOutlineNotificationImportant } from "react-icons/md";

interface ActionBtnsProps {
  setContent: (content: string) => void;
  variant: "expanded" | "collapsed";
}

export default function ActionBtns(props: ActionBtnsProps) {
  return props.variant === "expanded" ? (
    <div className="flex w-full items-center justify-between gap-2 text-xs">
      <div
        className="flex flex-col items-center"
        onClick={() => props.setContent("history")}
      >
        <MdOutlineHistory className="text-2xl" />
        <p>History</p>
      </div>
      <div
        className="flex flex-col items-center"
        onClick={() => props.setContent("suggestions")}
      >
        <AiOutlineUsergroupAdd className="text-2xl" />
        <p>Suggestions</p>
      </div>
      <div
        className="flex flex-col items-center"
        onClick={() => props.setContent("search")}
      >
        <FiSearch className="text-2xl" />
        <p>Search</p>
      </div>
      <div
        className="flex flex-col items-center"
        onClick={() => props.setContent("notifications")}
      >
        <MdOutlineNotificationImportant className="text-2xl" />
        <p>Notifications</p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-1 p-1">
      <MdOutlineHistory
        className="text-2xl"
        onClick={() => props.setContent("history")}
      />
      <AiOutlineUsergroupAdd
        className="text-2xl"
        onClick={() => props.setContent("suggestions")}
      />
      <FiSearch
        className="text-2xl"
        onClick={() => props.setContent("search")}
      />
      <MdOutlineNotificationImportant
        className="text-2xl"
        onClick={() => props.setContent("notifications")}
      />
    </div>
  );
}
