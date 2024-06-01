import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { NotificationsType } from "../lib/interfaces/notifications";

interface RightPanelContextType {
  toggleRightPanel: boolean;
  setToggleRightPanel: Dispatch<SetStateAction<boolean>>;
  notifications: NotificationsType;
  setNotifications: Dispatch<SetStateAction<NotificationsType>>;
  suggestionsCount: number;
  setSuggestionsCount: Dispatch<SetStateAction<number>>;
  content: "history" | "suggestions" | "search" | "notifications";
  setContent: Dispatch<
    SetStateAction<"history" | "suggestions" | "search" | "notifications">
  >;
}

const RightPanelContext = createContext<RightPanelContextType>({
  toggleRightPanel: false,
  setToggleRightPanel: () => {},
  notifications: [],
  setNotifications: () => {},
  suggestionsCount: 0,
  setSuggestionsCount: () => {},
  content: "history",
  setContent: () => {},
});

interface RightPanelProviderProps {
  children: ReactNode;
}

export default function RightPanelProvider({
  children,
}: RightPanelProviderProps) {
  const [toggleRightPanel, setToggleRightPanel] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationsType>([]);
  const [suggestionsCount, setSuggestionsCount] = useState<number>(0);
  const [content, setContent] = useState<
    "history" | "suggestions" | "search" | "notifications"
  >("notifications");
  return (
    <RightPanelContext.Provider
      value={{
        toggleRightPanel,
        setToggleRightPanel,
        notifications,
        setNotifications,
        suggestionsCount,
        setSuggestionsCount,
        content,
        setContent,
      }}
    >
      {children}
    </RightPanelContext.Provider>
  );
}

export { RightPanelContext };
