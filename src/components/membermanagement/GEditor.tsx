import SearchPeople from "./SearchPeople";
import GroupEditor from "./editors/GroupEditor";

export default function MainGroupEditor() {
  return <div className="flex  gap-2 w-full h-full p-2">
    <SearchPeople />
    <GroupEditor />
  </div>;
}
