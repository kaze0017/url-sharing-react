import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface RelationsContextType {
  view: "small" | "medium" | "table";
  setView: Dispatch<SetStateAction<"small" | "medium" | "table">>;
}

const RelationsContext = createContext<RelationsContextType>({
  view: "small",
  setView: () => {},
});

interface RelationsProviderProps {
  children: ReactNode;
}

export default function RelationsProvider({
  children,
}: RelationsProviderProps) {
  const [view, setView] = useState<"small" | "medium" | "table">("small");
  return (
    <RelationsContext.Provider value={{ view, setView }}>
      {children}
    </RelationsContext.Provider>
  );
}

export { RelationsContext };
