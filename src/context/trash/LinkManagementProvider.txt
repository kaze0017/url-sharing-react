import { useState, createContext } from "react";
import { SharedLinkType } from "../lib/interfaces";

interface LinkManagementContextType {
  linkMode: "edit" | "create";
  setLinkMode: (mode: "edit" | "create") => void;
  selectedLinks: SharedLinkType[];
  setSelectedLinks: (links: SharedLinkType[]) => void;
}

const LinkManagementContext = createContext<LinkManagementContextType>({
  linkMode: "create",
  setLinkMode: () => {},
  selectedLinks: [],
  setSelectedLinks: () => {},
});

export function LinkManagementProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedLinks, setSelectedLinks] = useState<SharedLinkType[]>([]);
  const [linkMode, setLinkMode] = useState<"edit" | "create">("create");
  return (
    <LinkManagementContext.Provider
      value={{ selectedLinks, setSelectedLinks, linkMode, setLinkMode }}
    >
      {children}
    </LinkManagementContext.Provider>
  );
}

export default LinkManagementContext;
