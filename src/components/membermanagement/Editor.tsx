import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchPeople from "./SearchPeople";
import GroupEditor from "./editors/GroupEditor";
import TreeEditor from "./editors/TreeEditor";
import NeutralEditor from "./editors/NeutralEditor";

export default function Editor() {
  const params = useParams();
  let { id } = params as { id: string };
  let type = "neural";
  if (id === undefined) id = "0";
  if (id[0] === "g") {
    type = "group";
  } else if (id[0] === "t") {
    type = "tree";
  } else {
    type = "neural";
  }

  id = id?.substring(1) || "";


  const [newGroup, setNewGroup] = useState(false);
  const [newTree, setNewTree] = useState(false);


  return (
    <div className="flex  gap-2 w-full h-full p-2">
      <SearchPeople />
      {type === "tree" && <TreeEditor treeId={id} />}
      {type === "neural" && (
        <NeutralEditor setNewGroup={setNewGroup} setNewTree={setNewTree} />
      )}
    </div>
  );
}
