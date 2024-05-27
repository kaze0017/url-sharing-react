import Controller from "./groups/Controller";
import { groupOne, groupTwo, groupThree } from "../../lib/placeholder-data";
import { Link } from "react-router-dom";
import GroupSm from "../groups/GroupSm";



export default function Groups() {
  const groupsToDisplay = [groupOne, groupTwo, groupThree];
  return (
    <div>
      <Controller />
      <div className="flex flex-wrap gap-2 w-full h-full">
        {groupsToDisplay.map((group) => {
          return (
            <Link to={`/networks/editor/${"g" + group.id}`} key={group.id}>
              <GroupSm group={group} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
