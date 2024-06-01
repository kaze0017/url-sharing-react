import { useContext } from "react";
import ShareWithGroupsContext from "../../../context/ShareWithGroupsProvider";

export default function Description() {
  const { description, setDescription } = useContext(ShareWithGroupsContext);
  return (
    <div>
      <textarea
        placeholder="Write a Description"
        className="min-w-[300px] h-32 p-2 border-2 border-blue-950 rounded-lg"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}
