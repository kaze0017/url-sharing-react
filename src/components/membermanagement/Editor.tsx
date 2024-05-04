import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchPeople from "./SearchPeople";
import GroupEditor from "./editors/GroupEditor";
import TreeEditor from "./editors/TreeEditor";
import NeutralEditor from "./editors/NeutralEditor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Editor() {
  let { id } = useParams<{ id: string }>();
  const [type, setType] = useState<"group" | "tree" | "neural">(() => {
    if (id) {
      if (id[0] === "g") {
        return "group";
      } else if (id[0] === "t") {
        return "tree";
      }
    }
    // Default value if id doesn't match any condition
    return "neural";
  });

  id = id?.substring(1) || "";

  const [newGroup, setNewGroup] = useState(false);
  const [newTree, setNewTree] = useState(false);

  useEffect(() => {
    if (newGroup){
      id="0";
      setType("group");
    }
    if (newTree){
      id="0";
      setType("tree");
    }
  }, [newGroup, newTree]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex  gap-2 w-full h-full p-2">
        <SearchPeople />
        {type === "group" && <GroupEditor groupId={id} />}
        {type === "tree" && <TreeEditor />}
        {type === "neural" && <NeutralEditor setNewGroup={setNewGroup} setNewTree={setNewTree} />}
      </div>
    </DndProvider>
  );
}
