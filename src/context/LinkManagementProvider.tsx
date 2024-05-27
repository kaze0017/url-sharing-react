import {  useState, createContext } from "react";
import { SharedLinkType } from "../lib/interfaces";

interface LinkManagementContextType {
  selectedLinks: SharedLinkType[];
  setSelectedLinks: (links: SharedLinkType[]) => void;
}

const LinkManagementContext = createContext<LinkManagementContextType>({
  selectedLinks: [],
  setSelectedLinks: () => {},
});


export function LinkManagementProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedLinks, setSelectedLinks] = useState<SharedLinkType[]>([]);
  return (
    <LinkManagementContext.Provider value={{ selectedLinks, setSelectedLinks }}>
      {children}
    </LinkManagementContext.Provider>
  );
}

export default LinkManagementContext;
