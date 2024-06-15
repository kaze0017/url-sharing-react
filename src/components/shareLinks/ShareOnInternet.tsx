import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import { getNPeople } from "../../lib/actions";
import Person from "./shareOnInternet/Person";

export default function ShareOnInternet() {
  const [query, setQuery] = useState<string>("");
  const [peopleToDisplay, setPeopleToDisplay] = useState<any[]>([]);
  const people = getNPeople(10);
  useEffect(() => {
    setPeopleToDisplay(people);
  }, []);

  useEffect(() => {
    setPeopleToDisplay(
      people.filter(
        (person) =>
          person.first_name.toLowerCase().includes(query.toLowerCase()) ||
          person.last_name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);
  return (
    <div className="flex items-center flex-col flex-grow w-full border">
      <div className="flex flex-col gap-2 w-[600px] m-x-auto">
        <SearchBar query={query} setQuery={setQuery} />
        <div className="uppercase text-xs font-semibold flex flex-col gap-1">
          {peopleToDisplay.map((person, index) => (
            <Person key={index} person={person} />
          ))}
        </div>
      </div>
    </div>
  );
}
