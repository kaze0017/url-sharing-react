import { CiGrid41 } from "react-icons/ci";
import CardDetailIcons from "../cards/CardDetailIcons";
import ProfilePicture from "../profilePictures/ProfilePicture";

import { SharedLinkType } from "../../lib/interfaces";
import FeaturedImage from "./featuredImages/FeaturedImage";
// import { Shrikhand } from "../../lib/interfaces";
interface CardSharedLgProps {
  sharedLink: SharedLinkType;
}

export default function CardSharedLg({ sharedLink }: CardSharedLgProps) {
  const ownerFullName =
    sharedLink.owner.first_name + " " + sharedLink.owner.last_name;
  const mainWrapperClass = `flex flex-col gap-2 p-2 h-[200px] w-[600px] mx-auto panel-light`;
  const imgUrl = sharedLink.thumbnail || "";
  const tags =
    sharedLink.tags === null
      ? []
      : typeof sharedLink.tags === "string"
      ? sharedLink.tags.split(",")
      : sharedLink.tags;
  return (
    <div className={mainWrapperClass}>
      <div className="flex h-3/4 gap-2">
        <FeaturedImage sharedLink={sharedLink} twClass="w-[220px]" />
        <div className="flex flex-col">
          <div className="">
            <h2 className="font-bold">{sharedLink.title}</h2>
            <p>{sharedLink.description}</p>
          </div>
          <div className="flex grow"></div>
          <div className="">
            <p>{sharedLink.publicationDate}</p>
            <div className="text-xs flex w-full uppercase gap-1">
              {tags.map((tag: string, index: number) => {
                return (
                  <p
                    key={index}
                    className="flex items-center text-xs bg-gray-500 text-white rounded-md px-1"
                  >
                    {tag}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="">
          <CiGrid41 className="text-2xl" />
        </div>
        <div className="flex gap-2 items-center ">
          <ProfilePicture person={sharedLink.owner} />
          <h4>{ownerFullName}</h4>
        </div>
        <div className="flex grow"></div>
        <div className="w-1/3">
          <CardDetailIcons
            rank={sharedLink.rankCount}
            shared={sharedLink.sharedCount}
            saved={sharedLink.savedCount}
          />
        </div>
      </div>
    </div>
  );
}
