import React from "react";
import DnDGroupConstructor from "./DnDGroupConstructor";
import DnDTreeConstructor from "./DnDTreeConstructor";

interface NeutralEditorProps {
  setNewGroup: React.Dispatch<React.SetStateAction<boolean>>;
  setNewTree: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NeutralEditor({
  setNewGroup,
  setNewTree,
}: NeutralEditorProps) {
  return (
    <div className="flex flex-col w-full gap-2 uppercase text-blue-950 text-lg font-bold">
      <DnDGroupConstructor setNewGroup={setNewGroup} />
      <DnDTreeConstructor setNewTree={setNewTree} />
    </div>
  );
}
