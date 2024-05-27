import React from "react";
import { useDrop } from "react-dnd";
import { UserProfileType } from "../../../lib/interfaces";
import DndPerson from "./DndPerson";

interface GroupDnDProps {
  members: UserProfileType[];
  setMembers: React.Dispatch<React.SetStateAction<UserProfileType[]>>;
}

export default function GroupDnD({ members, setMembers }: GroupDnDProps) {
  console.log(members);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PERSON",
    drop: (item: { type: string; person: UserProfileType }) => {
      // Access the dropped person object
      const { person } = item;
      // Add the person to the deletedUsers array
      handelAddMember(person);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function handelAddMember(person: UserProfileType) {
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
      {members.map((person: UserProfileType) => {
        return <DndPerson person={person} />;
      })}
    </div>
  );
}
