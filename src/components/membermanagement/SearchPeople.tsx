import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { getNPeople } from "../../lib/actions";
import SearchBar from "../SearchBar";
import Person from "./Person";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";

import { UserProfileType } from "../../lib/interfaces";
import {
  fetchSearchedUsers,
  fetchTopUsers,
  setPeopleQuery,
} from "../../state/networks/groupsSlice";

export default function SearchPeople() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";

  const { peopleQuery, peopleToDisplay } = useSelector(
    (state: RootState) => state.netWorkGroups
  );

  const dispatch = useDispatch<AppDispatch>();

  function initPeopleList() {
    dispatch(fetchTopUsers(token));
  }

  function handelSetQuery(query: string) {
    dispatch(setPeopleQuery(query));
  }

  // function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
  //   const search = e.target.value;
  //   if (search === "" || search === null) {
  //     // setPeopleToDisplay([]);
  //     return;
  //   }
  //   const filteredPeople = people.filter((person) =>
  //     (person.first_name + person.last_name)
  //       .toLowerCase()
  //       .includes(search.toLowerCase())
  //   );
  //   setPeopleToDisplay(filteredPeople);
  // }
  // useEffect(() => {
  //   if (query === "") {
  //     setPeopleToDisplay(people);
  //     return;
  //   }
  //   const filteredPeople = people.filter((person) =>
  //     (person.first_name + person.last_name)
  //       .toLowerCase()
  //       .includes(query.toLowerCase())
  //   );
  //   setPeopleToDisplay(filteredPeople);
  // }, [query]);

  useEffect(() => {
    initPeopleList();
  }, []);

  async function handelSearchPeople(query: string) {
    dispatch(fetchSearchedUsers({ token, query }));
  }
  useEffect(() => {
    handelSearchPeople(peopleQuery);
  }, [peopleQuery]);

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
      <SearchBar query={peopleQuery} setQuery={handelSetQuery} />

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
          // <DndPerson person={person} key={index} />
          <Person person={person} key={index} />
        ))}
      </div>
    </div>
  );
}
