import React from "react";
import { UserProfileType } from "../../lib/interfaces";
import { useDrag } from "react-dnd";
import ProfilePicture from "../profilePictures/ProfilePicture"

interface PersonProps {
  person: UserProfileType;
}

export default function Person({ person }: PersonProps) {

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "PERSON",
      item: { person },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(person));
  };

  return (
    <div ref={dragRef} draggable={true} onDragStart={handleDragStart}>
      <ProfilePicture user={person} size="small" clickable={false} />
    </div>
  );
}
