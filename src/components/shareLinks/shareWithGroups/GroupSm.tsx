import { GroupType } from "../../../lib/interfaces/group";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../state/store";
import { setSelectedGroups } from "../../../state/share/shareSlice";

interface GroupSmProps {
  group: GroupType;
  selected?: boolean;
}

export default function GroupSm({ group, selected }: GroupSmProps) {
  const { selectedGroups } = useSelector((state: RootState) => state.share);
  const dispatch = useDispatch();

  function toggle(group: GroupType) {
    dispatch(setSelectedGroups(group));
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
        {group.description}
      </h3>
      {group.members.map((member, index) => (
        <img
          key={index}
          src={
            member.profile_picture
              ? member.profile_picture
              : "/images/defaults/personDefaultImage.png"
          }
          alt={member.first_name}
          className="rounded-full w-8 h-8"
        />
      ))}
    </div>
  );
}

// <ProfilePictureMd key={index} person={member} />
