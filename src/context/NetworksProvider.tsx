import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface NetworksContextType {
  type: "all" | "groups" | "graphs";
  view: "grid" | "list";
  setType: Dispatch<SetStateAction<"all" | "groups" | "graphs">>;
  setView: Dispatch<SetStateAction<"grid" | "list">>;
}

const NetworksContext = createContext<NetworksContextType>({
  type: "all",
  view: "grid",
  setType: () => {},
  setView: () => {},
});

interface ModeProviderProps {
  children: ReactNode;
}

export default function NetworksProvider({ children }: ModeProviderProps) {
  const [type, setType] = useState<"all" | "groups" | "graphs">("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <NetworksContext.Provider value={{ type, view, setType, setView }}>
      {children}
    </NetworksContext.Provider>
  );
}

export { NetworksContext };
