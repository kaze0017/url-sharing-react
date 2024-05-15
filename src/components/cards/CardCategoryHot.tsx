import ProfilePicture from "../profilePictures/ProfilePicture";
import InfoReport from "../InfoReport";

import { CategoryType } from "../../lib/interfaces";

interface CategoryHotProps {
  link: CategoryType;
}

export default function CategoryHot({ link }: CategoryHotProps) {
  const firstName = link.owner.first_name || "NA";
  const lastName = link.owner.last_name || "NA";
  const ownerFullName = `${firstName} ${lastName}`;
  // css classes
  const categoryHotWrapperClass = `flex flex-row items-center w-1/4 h-10 flex-shrink-0 min-w-48 max-w-72`;
  const categoryHotInfoClass = `flex flex-row grow items-center w-3/5 h-10  border border-gray-500 rounded-md p-1 pl-2 text-center`;
  return (
    <div className={categoryHotWrapperClass}>
      <ProfilePicture person={link.owner} />
      <div className={categoryHotInfoClass}>
        <div className="flex flex-col text-2xs uppercase font-bold w-1/2">
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
        <InfoReport title={link.title} data={0} className="truncate w-1/2" />
      </div>
    </div>
  );
}
