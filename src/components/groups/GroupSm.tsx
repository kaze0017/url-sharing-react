import { useContext } from "react";
import ShareWithGroupsContext from "../../context/ShareWithGroupsProvider";

import { groupType } from "../../lib/interfaces";
import ProfilePictureMd from "../profilePictures/ProfilePictureMd";

interface GroupSmProps {
  group: groupType;
  selected?: boolean;
}

export default function GroupSm({ group, selected }: GroupSmProps) {
  const { selectedGroups, setSelectedGroups, setGroupsToDisplay } = useContext(
    ShareWithGroupsContext
  );

  function toggle(group: groupType) {
    if (selectedGroups.some((item) => item.id === group.id)) {
      setSelectedGroups((prevGroupToDisplay) =>
        prevGroupToDisplay.filter((prevGroup) => prevGroup.id !== group.id)
      );

      setGroupsToDisplay((prevPeopleToDisplay) => [
        ...prevPeopleToDisplay,
        group,
      ]);
    } else {
      setSelectedGroups((prevGroupToDisplay) => [...prevGroupToDisplay, group]);
      setGroupsToDisplay((prevPeopleToDisplay) =>
        prevPeopleToDisplay.filter((prevGroup) => prevGroup.id !== group.id)
      );
    }
  }

  const wrapperClass = `relative flex flex-wrap gap-1 items-center max-w-64 p-2 pt-4 px-4 rounded-lg shadow-md
    ${selected ? "bg-indigo-200" : "bg-gray-200"}
    `;

  return (
    <div
      className={wrapperClass}
      onClick={() => {
        toggle(group);
      }}
      style={{ boxShadow: `0 0 0 1px ${group.color}` }}
    >
      <h3 className="text-2xs absolute top-0 left-0 px-1 uppercase">
        {group.name}
      </h3>
      {group.members.map((member, index) => (
        <ProfilePictureMd key={index} person={member} />
      ))}
    </div>
  );
}
