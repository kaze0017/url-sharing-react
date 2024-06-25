import  {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface NetworksContextType {
  type: "groups" | "graphs" | "relations" | "none";
  view: "grid" | "list";
  setType: Dispatch<SetStateAction<"groups" | "graphs" | "relations" | "none">>;
  setView: Dispatch<SetStateAction<"grid" | "list">>;
}

const NetworksContext = createContext<NetworksContextType>({
  type: "none",
  view: "grid",
  setType: () => {},
  setView: () => {},
});

interface ModeProviderProps {
  children: ReactNode;
}

export default function NetworksProvider({ children }: ModeProviderProps) {
  const [type, setType] = useState<"groups" | "graphs" | "relations" | "none">(
    "none"
  );
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <NetworksContext.Provider value={{ type, view, setType, setView }}>
      {children}
    </NetworksContext.Provider>
  );
}

export { NetworksContext };
