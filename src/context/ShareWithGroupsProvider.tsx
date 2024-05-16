import { createContext, useState } from "react";
import { PersonType } from "../lib/interfaces";
import { getNPeople } from "../lib/actions";
import { get } from "http";
import { set } from "react-hook-form";

interface ShareWithGroupsContextType {
  mode: "people" | "groups";
  setMode: React.Dispatch<React.SetStateAction<"people" | "groups">>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedPeople: PersonType[];
  setSelectedPeople: React.Dispatch<React.SetStateAction<PersonType[]>>;
  peopleToDisplay: PersonType[];
  setPeopleToDisplay: React.Dispatch<React.SetStateAction<PersonType[]>>;
  
}

const ShareWithGroupsContext = createContext<ShareWithGroupsContextType>({
  query: "",
  setQuery: () => {},
  selectedPeople: [],
  peopleToDisplay: [],
  setSelectedPeople: () => {},
  setPeopleToDisplay: () => {},
  mode: "people",
  setMode: () => {},
});

export function ShareWithGroupsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPeople, setSelectedPeople] = useState<PersonType[]>([]);
  const [mode, setMode] = useState<"people" | "groups">("people");
  const [query, setQuery] = useState<string>("");
  const [peopleToDisplay, setPeopleToDisplay] = useState<PersonType[]>([]);

  return (
    <ShareWithGroupsContext.Provider
      value={{
        selectedPeople,
        setSelectedPeople,
        mode,
        setMode,
        query,
        setQuery,
        peopleToDisplay,
        setPeopleToDisplay,
      }}
    >
      {children}
    </ShareWithGroupsContext.Provider>
  );
}

export default ShareWithGroupsContext;
