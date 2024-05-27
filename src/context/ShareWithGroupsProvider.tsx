import React, { createContext, useState } from "react";
import { UserProfileType } from "../lib/interfaces";
import { groupType } from "../lib/interfaces";

interface ShareWithGroupsContextType {
  mode: "users" | "groups"  | "selected";
  status: "loading" | "error" | "success" | "noLinks" | "approval" | "sharingOptions" | "selectingRecipients";
  setMode: React.Dispatch<React.SetStateAction<"users" | "groups" |  "selected">>;
  setStatus: React.Dispatch<
    React.SetStateAction<
      "loading" | "error" | "success" | "noLinks" | "approval" | "sharingOptions" | "selectingRecipients"
    >
  >;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedPeople: UserProfileType[];
  setSelectedPeople: React.Dispatch<React.SetStateAction<UserProfileType[]>>;
  selectedGroups: groupType[];
  groupsToDisplay: groupType[];
  setGroupsToDisplay: React.Dispatch<React.SetStateAction<groupType[]>>;
  setSelectedGroups: React.Dispatch<React.SetStateAction<groupType[]>>;
  peopleToDisplay: UserProfileType[];
  setPeopleToDisplay: React.Dispatch<React.SetStateAction<UserProfileType[]>>;
  publicationDate: string;
  setPublicationDate: React.Dispatch<React.SetStateAction<string>>;
  expirationDate: string;
  setExpirationDate: React.Dispatch<React.SetStateAction<string>>;
}

const ShareWithGroupsContext = createContext<ShareWithGroupsContextType>({
  query: "",
  mode: "users",
  status: "sharingOptions",
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
  publicationDate: "Today",
  setPublicationDate: () => {},
  expirationDate: "No expiration date",
  setExpirationDate: () => {},
});

export function ShareWithGroupsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPeople, setSelectedPeople] = useState<UserProfileType[]>([]);
  const [mode, setMode] = useState<"users" | "groups" | "selected">("users");
  const [query, setQuery] = useState<string>("");
  const [peopleToDisplay, setPeopleToDisplay] = useState<UserProfileType[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<groupType[]>([]);
  const [groupsToDisplay, setGroupsToDisplay] = useState<groupType[]>([]);
  const [status, setStatus] = useState<
    "loading" | "error" | "success" | "noLinks" | "approval" | "sharingOptions" | "selectingRecipients"
  >("sharingOptions");
  const [publicationDate, setPublicationDate] = useState<string>("Today");
  const [expirationDate, setExpirationDate] = useState<string>("No expiration date");

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
        publicationDate,
        setPublicationDate,
        expirationDate,
        setExpirationDate,
      }}
    >
      {children}
    </ShareWithGroupsContext.Provider>
  );
}

export default ShareWithGroupsContext;
