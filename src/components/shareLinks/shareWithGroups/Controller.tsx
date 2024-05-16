import { useState, useContext, useEffect } from "react";
import ShareWithGroupsContext from "../../../context/ShareWithGroupsProvider";
import SearchBar from "../../SearchBar";
import TabBtn from "./TabBtn";
import { GoPerson } from "react-icons/go";
import { GoPeople } from "react-icons/go";
import { PersonType } from "../../../lib/interfaces";
import { getNPeople } from "../../../lib/actions";

export default function Controller() {
  const { selectedPeople, query, setQuery, setPeopleToDisplay } = useContext(
    ShareWithGroupsContext
  );
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  useEffect(() => {
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
      </div>
      <SearchBar query={query} setQuery={setQuery} />
    </div>
  );
}
