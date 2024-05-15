import React from "react";
import { useDrop, useDrag } from "react-dnd";
import { PersonType } from "../../../lib/interfaces";
import DndPerson from "./DndPerson";

interface GroupDnDProps {
  members: PersonType[];
  setMembers: React.Dispatch<React.SetStateAction<PersonType[]>>;
}

export default function GroupDnD({ members, setMembers }: GroupDnDProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PERSON",
    drop: (item: { type: string; person: PersonType }) => {
      // Access the dropped person object
      const { person } = item;
      // Add the person to the deletedUsers array
      handelAddMember(person);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function handelAddMember(person: PersonType) {
    // if exist
    if (members.find((member) => member.id === person.id)) {
      alert("Member already exists");
      return;
    }
    setMembers((prev) => [...prev, person]);
  }

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "lightblue" : "",
      }}
      className="flex flex-wrap gap-2 w-full h-full overflow-y-auto overflow-x-hidden p-2 rounded-lg items-center justify-center"
    >
      {members.map((person: PersonType) => {
        return <DndPerson person={person} />;
      })}
    </div>
  );
}
