import React from "react";
import { getNPeople } from "../../lib/actions";
import Person from "./Person";
import { PersonType } from "../../lib/interfaces";



export default function Search() {
  const people = getNPeople(10);
  return (
    <div>
      {people.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
}
