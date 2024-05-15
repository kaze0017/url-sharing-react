import React, { useState, useRef, useEffect } from "react";
import { getNPeople } from "../../lib/actions";
import ProfilePicture from "../profilePictures/ProfilePicture";
import Draggable from "./Draggable";
import { useDraggable } from "react-use-draggable-scroll";
import DndPerson from "./editors/DnDPersonName";
import SearchBar from "../SearchBar";

import { PersonType } from "../../lib/interfaces";

export default function SearchPeople() {
  const [query, setQuery] = useState<string>("");
  const people = getNPeople(7);
  const [peopleToDisplay, setPeopleToDisplay] = useState<PersonType[]>([]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;
    if (search === "" || search === null) {
      setPeopleToDisplay([]);
      return;
    }
    const filteredPeople = people.filter((person) =>
      (person.firstName + person.lastName)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setPeopleToDisplay(filteredPeople);
  }
  useEffect(() => {
    if (query === "") {
      setPeopleToDisplay(people);
      return;
    }
    const filteredPeople = people.filter((person) =>
      (person.firstName + person.lastName)
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setPeopleToDisplay(filteredPeople);
  }, [query]);

  // const ref =
  //   useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  // const { events } = useDraggable(ref);
  const mainWrapperClass =
    "relative p-2 max-h-full row flex flex-wrap gap-x-2 gap-y-2 overflow-x-scroll overflow-y-scroll scrollbar-hide min-w-full ";

  return (
    <div className="flex panel-light p-2 h-full w-[250px] items-center flex-col gap-2">
      {/* <div className="flex panel-light p-2 h-full w-[250px] items-center flex-col gap-2 "> */}
      {/* search box */}
      {/* <input
        type="text"
        placeholder="Search people"
        onChange={handleSearch}
        className="w-[225] rounded-sm"
      /> */}
      <SearchBar query={query} setQuery={setQuery} />

      {/* display people */}
      {/* <div className={mainWrapperClass} {...events} ref={ref}> */}
      <div className={mainWrapperClass}>
        {peopleToDisplay?.map((person, index) => (
          // <Draggable dragObject={person} key={index}>
          //   <div className="flex p-1 w-full items-center gap-1 border border-indigo-200">
          //     <ProfilePicture
          //       size={32}
          //       imageUrl={person.photo}
          //       alt={person.name}
          //       id={person.id}
          //     />
          //     <p>{person.name}</p>
          //   </div>
          // </Draggable>
          <DndPerson person={person} key={index} />
        ))}
      </div>
    </div>
  );
}
