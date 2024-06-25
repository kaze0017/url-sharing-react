import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { UserProfileType } from "../../../lib/interfaces";
import { FaRegTrashCan } from "react-icons/fa6";

interface DnDTrashCanProps {
  removeMember: (user: UserProfileType) => void;
}

export default function DnDTrashCan({ removeMember }: DnDTrashCanProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PERSON",
    drop: (item: { type: string; person: UserProfileType }) => {
      // Access the dropped person object
      const { person } = item;
      // Add the person to the deletedUsers array
      removeMember(person);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="p-1">
      <div
        ref={drop}
        style={{
          scale: isOver ? "1.1" : "1",
        }}
        className="p-2 rounded-lg"
      >
        {/* trashCan Icon */}
        <FaRegTrashCan className="text-5xl  text-indigo-800" />
      </div>
    </div>
  );
}
