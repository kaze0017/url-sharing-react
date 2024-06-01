import { useEffect, useState, useContext } from "react";
import { RightPanelContext } from "../../../context/RightPanelProvider";
import SearchBar from "../../SearchBar";
import { getNPeople } from "../../../lib/actions";
import { BsArrowsExpandVertical } from "react-icons/bs";
import Person from "./search/Person";

export default function Searches() {
  const { toggleRightPanel, setToggleRightPanel } =
    useContext(RightPanelContext);
  const [query, setQuery] = useState<string>("");
  const people = getNPeople(10);
  const [peopleToDisplay, setPeopleToDisplay] = useState<any[]>([]);
  const [selected, setSelected] = useState<boolean>(false);

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
    <div className="flex flex-col gap-2 p-1">
      {toggleRightPanel ? (
        <BsArrowsExpandVertical
          className="text-2xl text-blue-950 cursor-pointer"
          onClick={() => setToggleRightPanel(false)}
        />
      ) : (
        <>
          <SearchBar query={query} setQuery={setQuery} />

          <div className="uppercase text-xs font-semibold flex flex-col gap-1">
            {peopleToDisplay.map((person, index) => (
              <Person key={index} person={person} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
