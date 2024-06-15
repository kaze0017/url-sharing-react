import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthProvider";
import ShareWithGroupsContext from "../../../context/ShareWithGroupsProvider";
import SearchBar from "../../SearchBar";
import TabBtn from "./TabBtn";
import TabBtnText from "./TabBtnText";
import { GoPerson } from "react-icons/go";
import { GoPeople } from "react-icons/go";
import { PiShareFatThin } from "react-icons/pi";

import { UserProfileType, groupType } from "../../../lib/interfaces";
import { getNPeople } from "../../../lib/actions";
import { groupsPH } from "../../../lib/placeholder-data";
import { getTopUsers } from "../../../api/getTopUsers";
import { getUserByQuery } from "../../../api/getUserByQuery";

export default function Controller() {
  const {
    selectedPeople,
    selectedGroups,
    setGroupsToDisplay,
    query,
    setQuery,
    setPeopleToDisplay,
    mode,
  } = useContext(ShareWithGroupsContext);
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";

  let topTenPeople;

  async function getTopTenPeople() {
    topTenPeople = await getTopUsers(token);
    setPeopleToDisplay(topTenPeople);
  }
  async function searchForUsers(query: string, token: string) {
    const users = await getUserByQuery(token, query);
    setPeopleToDisplay(users);
  }

  useEffect(() => {
    if (mode === "users") {
      if (query) {
        searchForUsers(query, token);
      } else {
        getTopTenPeople();
      }
    } else {
      let searchedGroups = groupsPH.filter(
        (group: groupType) =>
          group.name.toLowerCase().includes(query.toLowerCase()) ||
          group.name.toLowerCase().includes(query.toLowerCase())
      );
      searchedGroups.filter((group) => {
        selectedGroups.some((item) => item.id !== group.id);
      });
      setGroupsToDisplay(searchedGroups);
    }
  }, [query]);

  // useEffect(() => {
  //   getTopTenPeople();
  // }, []);

  return (
    <div className="flex flex-col w-full items-center font-semibold">
      <div className="flex items-center justify-between h-[35px] w-full">
        <TabBtnText selectedCount={selectedPeople.length} name={"users"} />
        <TabBtnText selectedCount={selectedGroups.length} name={"groups"} />
        <TabBtnText
          selectedCount={selectedPeople.length + selectedGroups.length}
          name={"selected"}
        />
      </div>
      <SearchBar query={query} setQuery={setQuery} />
    </div>
  );
}
