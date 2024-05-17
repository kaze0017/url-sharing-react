import React, { createContext, useState } from "react";
import { PersonType } from "../lib/interfaces";
import { groupType } from "../lib/interfaces";

interface ShareWithGroupsContextType {
  mode: "people" | "groups";
  status: "loading" | "error" | "success" | "noLinks" | "approval";
  setMode: React.Dispatch<React.SetStateAction<"people" | "groups">>;
  setStatus: React.Dispatch<
    React.SetStateAction<
      "loading" | "error" | "success" | "noLinks" | "approval"
    >
  >;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedPeople: PersonType[];
  setSelectedPeople: React.Dispatch<React.SetStateAction<PersonType[]>>;
  selectedGroups: groupType[];
  groupsToDisplay: groupType[];
  setGroupsToDisplay: React.Dispatch<React.SetStateAction<groupType[]>>;
  setSelectedGroups: React.Dispatch<React.SetStateAction<groupType[]>>;
  peopleToDisplay: PersonType[];
  setPeopleToDisplay: React.Dispatch<React.SetStateAction<PersonType[]>>;
}

const ShareWithGroupsContext = createContext<ShareWithGroupsContextType>({
  query: "",
  mode: "people",
  status: "noLinks",
  setQuery: () => {},
  selectedPeople: [],
  selectedGroups: [],
  peopleToDisplay: [],
  groupsToDisplay: [],
  setSelectedPeople: () => {},
  setPeopleToDisplay: () => {},
  setStatus: () => {},
  setMode: () => {},
  setSelectedGroups: () => {},
  setGroupsToDisplay: () => {},
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
  const [selectedGroups, setSelectedGroups] = useState<groupType[]>([]);
  const [groupsToDisplay, setGroupsToDisplay] = useState<groupType[]>([]);
  const [status, setStatus] = useState<
    "loading" | "error" | "success" | "noLinks" | "approval"
  >("noLinks");

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
        selectedGroups,
        setSelectedGroups,
        groupsToDisplay,
        setGroupsToDisplay,
        status,
        setStatus,
      }}
    >
      {children}
    </ShareWithGroupsContext.Provider>
  );
}

export default ShareWithGroupsContext;
