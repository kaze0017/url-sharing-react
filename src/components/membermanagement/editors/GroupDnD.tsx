import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { UserProfileType } from "../../../lib/interfaces";
import DndPerson from "./DndPerson";
import { useDispatch, useSelector } from "react-redux";
import { addMember, removeMember } from "../../../state/networks/groupsSlice";
import { RootState } from "../../../state/store";
import Person from "../Person";

// interface GroupDnDProps {
//   members: UserProfileType[];
//   setMembers?: React.Dispatch<React.SetStateAction<UserProfileType[]>>;
// }

export default function GroupDnD() {
  const { selectedGroup, draggingMember } = useSelector(
    (state: RootState) => state.netWorkGroups
  );
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PERSON",
    drop: (item: { type: string; person: UserProfileType }) => {},
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    dispatch(addMember(JSON.parse(data)));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "lightblue" : "",
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex flex-wrap gap-2 w-full h-full overflow-y-auto overflow-x-hidden p-2 rounded-lg items-center justify-center"
    >
      {selectedGroup.members.map((person: UserProfileType) => {
        return <Person person={person} key={person.user_id} />;
      })}
    </div>
  );
}
