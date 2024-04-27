import React from "react";
import { Person } from "../../lib/interfaces";
import InfoReport from "../InfoReport";
import ProfilePicture from "../ProfilePicture";

import { CategoryType } from "../../lib/interfaces";

interface CategoryHotProps {
  link: CategoryType;
  variant: "small" | "medium" | "large" | "xlarge";
}

export default function CategoryHot({ link, variant }: CategoryHotProps) {
  // css classes
  const categoryHotWrapperClass = `flex flex-row items-center w-1/4  flex-shrink-0 min-w-48 max-w-72`;

  // const categoryHotWrapperClass = `hotCategoryWrapper`;
  const categoryHotPicClass = `translate-x-2 aspect-square`;
  const categoryHotInfoClass = `flex flex-row grow items-center w-3/5 border border-gray-500 rounded-md p-1 pl-2 text-center`;
  return (
    <div className={categoryHotWrapperClass}>
      <ProfilePicture
        size={40}
        imageUrl={link.owner.photo}
        alt={link.owner.name}
        className={categoryHotPicClass}
      />
      <div className={categoryHotInfoClass}>
        <p className="text-xs w-2/5">{link.owner.name}</p>
        {/* <InfoReport title={title} data={data} className="truncate w-3/5" /> */}
      </div>
    </div>
  );
}
