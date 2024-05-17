import { useState, useContext, useEffect } from "react";
import ShareWithGroupsContext from "../../../context/ShareWithGroupsProvider";
import SearchBar from "../../SearchBar";
import TabBtn from "./TabBtn";
import { GoPerson } from "react-icons/go";
import { GoPeople } from "react-icons/go";
import { PiShareFatThin } from "react-icons/pi";

import { PersonType, groupType } from "../../../lib/interfaces";
import { getNPeople } from "../../../lib/actions";
import { groupsPH } from "../../../lib/placeholder-data";

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

  useEffect(() => {
    if (mode === "people") {
      const people = getNPeople(10);
      let searchedPeople = people.filter(
        (person: PersonType) =>
          person.first_name.toLowerCase().includes(query.toLowerCase()) ||
          person.last_name.toLowerCase().includes(query.toLowerCase())
      );
      searchedPeople.filter((person) => {
        selectedPeople.some((item) => item.id !== person.id);
      });
      setPeopleToDisplay(searchedPeople);
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

  return (
    <div className="flex items-center gap-6 px-4">
      <div className="flex items-center justify-center gap-4 h-[70px]">
        <TabBtn
          icon={GoPerson}
          selectedCount={selectedPeople.length}
          name={"people"}
        />
        <TabBtn
          icon={GoPeople}
          selectedCount={selectedGroups.length}
          name={"groups"}
        />
        {selectedPeople.length > 0 || selectedGroups.length > 0 ? (
          <TabBtn
            icon={PiShareFatThin}
            selectedCount={selectedPeople.length + selectedGroups.length}
            name={"share"}
          />
        ) : null}
      </div>
      <SearchBar query={query} setQuery={setQuery} />
    </div>
  );
}
