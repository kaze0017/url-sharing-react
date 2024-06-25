import  {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  
} from "react";

interface RelationsContextType {
  view: "small" | "medium" | "table";
  setView: Dispatch<SetStateAction<"small" | "medium" | "table">>;
  showFilter: boolean;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
}

const RelationsContext = createContext<RelationsContextType>({
  view: "small",
  setView: () => {},
  showFilter: false,
  setShowFilter: () => {},
});

interface RelationsProviderProps {
  children: ReactNode;
}

export default function RelationsProvider({
  children,
}: RelationsProviderProps) {
  const [view, setView] = useState<"small" | "medium" | "table">("small");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  return (
    <RelationsContext.Provider value={{ view, setView , showFilter, setShowFilter}}>
      {children}
    </RelationsContext.Provider>
  );
}

export { RelationsContext };
