import React, { useState, useContext } from "react";
import ChartDragAndDropContext from "../../context/ChartDragAndDropProvider";
import { UserProfileType } from "../../lib/interfaces";
import { useDrag } from "react-dnd";
import ProfilePictureSm from "../profilePictures/ProfilePictureSm";

interface PersonProps {
  person: UserProfileType;
}

export default function Person({ person }: PersonProps) {
  const { setDraggedPerson, draggedPerson , treeData} = useContext(
    ChartDragAndDropContext
  );

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

  return (
    // <div ref={dragRef} style={{ opacity }}>
    <div
      ref={dragRef}
      draggable={true}
      onDragStart={(e) => {
        console.log("perv", draggedPerson);
        console.log("dragging", person);

        setDraggedPerson(person);
        console.log("teep", treeData);
      }}
    >
      <ProfilePictureSm person={person} />
    </div>
  );
}
