import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { Person } from "../../../lib/interfaces";
import { FaRegTrashCan } from "react-icons/fa6";
import { groupType } from "../../../lib/interfaces";
import { useNavigate } from "react-router-dom";

const group: groupType = {
  id: Math.floor(Math.random() * 1000),
  name: "Group Name",
  description: "Group Description",
  members: [],
  tags: [],
  color: "#000000",
};
interface DnDTrashCanProps {
  setNewTree: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function DnDTreeConstructor({ setNewTree }: DnDTrashCanProps) {
  const navigate = useNavigate();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PERSON",
    drop: (item: { type: string; person: Person }) => {
      // Access the dropped person object
      const { person } = item;
      // Add the person to the deletedUsers array
      handelCreateGroup(person);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function handelCreateGroup(person: Person) {
    setNewTree(true);
    navigate(`/networks/editor/t0`);
  }
  return (
    <div className="p-1 flex h-1/2 w-full panel-light items-center  justify-center">
      <div
        ref={drop}
        style={{
          scale: isOver ? "1.1" : "1",
        }}
        className="p-2 rounded-lg"
      >
        {/* trashCan Icon */}
        <h1>Drop To create a create a new Tree</h1>
      </div>
    </div>
  );
}