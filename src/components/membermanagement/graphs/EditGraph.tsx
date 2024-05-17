import React from "react";
import { getNPeople } from "../../../lib/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TreeChart from "../TreeChart";
import SearchPeople from "../SearchPeople";
const people = getNPeople(7);

const orgData = {
  id: 31,
  name: "John Doe",
  profile_picture: people[4].profile_picture,
  children: [
    {
      id: 32,
      name: "Jane Smith",
      profile_picture: people[2].profile_picture,
      children: [
        {
          id: 33,
          name: "John Smith",
          profile_picture: people[3].profile_picture,
          children: [
            {
              id: 34,
              name: "Jane Doe",
              profile_picture: people[4].profile_picture,
            },
            {
              id: 35,
              name: "Jane Doe",
              profile_picture: people[5].profile_picture,
            },
          ],
        },
      ],
    },
    {
      id: 36,
      name: "Jane Smith",
      profile_picture: people[6].profile_picture,
    },
    {
      id: 37,
      name: "Jane Smith",
      profile_picture: people[3].profile_picture,
      children: [
        {
          id: 38,
          name: "John Smith",
          profile_picture: people[6].profile_picture,
          children: [
            {
              id: 39,
              name: "Jane Doe",
              profile_picture: people[5].profile_picture,
            },
            {
              id: 40,
              name: "Jane Doe",
              profile_picture: people[4].profile_picture,
            },
          ],
        },
      ],
    },
  ],
};

export default function EditGraph() {
  const data = orgData;

  return (
      <div className="overflow-hidden flex flex-grow w-full p-2 gap-2">
        <SearchPeople />
        <TreeChart data={data} />
      </div>
  );
}
