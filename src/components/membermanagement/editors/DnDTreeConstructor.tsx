import React, { useContext, useEffect } from "react";
import { useDrop } from "react-dnd";
import { UserProfileType } from "../../../lib/interfaces";
import { groupType } from "../../../lib/interfaces";
import { useNavigate } from "react-router-dom";
import ChartDragAndDropContext from "../../../context/ChartDragAndDropProvider";
import { TreeNode, TreeData } from "../graphs/TreeData";

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
  const { draggedPerson, setTreeData, treeData } = useContext(ChartDragAndDropContext);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PERSON",
    drop: (item: { type: string; person: UserProfileType }) => {
      // Access the dropped person object
      const { person } = item;
      // Add the person to the deletedUsers array
      handelCreateGroup(person);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function handelCreateGroup(person: UserProfileType) {
    console.log("Drop eventsss", person);
    const newNode = new TreeNode(
      person.id || 1,
      person.first_name || "",
      person.profile_picture || ""
    );

    const newTreeData = new TreeData(newNode);

    setTreeData(newTreeData);

    setNewTree(true);
  }
  useEffect(() => {
    navigate(`/networks/editor/t0`);

  }, [treeData]);
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
