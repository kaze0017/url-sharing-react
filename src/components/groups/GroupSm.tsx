import React from "react";

import { groupType } from "../../lib/interfaces";
import ProfilePictureMd from "../ProfilePictureMd";

export default function GroupSm({ group }: { group: groupType }) {
  const wrapperClass =
    "relative flex flex-wrap gap-1 items-center panel-light max-w-64 p-2 pt-4 px-4 rounded-lg shadow-md light-panel";
  return (
    <div
      className={wrapperClass}
      style={{ boxShadow: `0 0 0 1px ${group.color}` }}
    >
      <h3 className="text-2xs absolute top-0 left-0 px-1 uppercase">
        {group.name}
      </h3>
      {group.members.map((member, index) => (
        <ProfilePictureMd
          key={index}
          imageUrl={member.photo}
          alt={member.name}
        />
      ))}
    </div>
  );
}
