import React from "react";
import { SharedLinkType } from "../../lib/interfaces";
import { IoIosLink } from "react-icons/io";
import ProfilePictureSm from "../profilePictures/ProfilePictureSm";
import CardDetailIcons from "./CardDetailIcons";
import FeaturedImage from "./featuredImages/FeaturedImage";

interface CardSharedSmProps {
  sharedLink: SharedLinkType;
}

export default function CardSharedSm({ sharedLink }: CardSharedSmProps) {
  if (!sharedLink) {
    return null;
  }
  const height = 128;
  const width = 250;

  const firstName = sharedLink.owner.firstName || "NA";
  const lastName = sharedLink.owner.lastName || "NA";

  const imgUrl = sharedLink.thumbnail || "";
  const mainWrapperClass = `text-center flex flex-col gap-1 p-1 panel-light  border border-gray-300 rounded-sm`;
  const mainWrapperStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };
  return (
    <div className={mainWrapperClass} style={mainWrapperStyle}>
      <div className="flex w-full gap-1 h-3/5">
        <FeaturedImage sharedLink={sharedLink} twClass="h-full w-[110px] " />

        <div className="flex flex-col flex-grow overflow-hidden">
          <h2 className="truncate  font-bold text-xs uppercase ">
            {sharedLink.title}
          </h2>
          <p className="truncate  text-xs">{sharedLink.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 h-1/3 text-2xs">
        <IoIosLink />
        <ProfilePictureSm person={sharedLink.owner} />
        <div className="flex flex-col">
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
        <div className="flex grow"></div>
        <div className="w-1/2">
          <CardDetailIcons
            rank={sharedLink.rankCount || 0}
            shared={sharedLink.sharedCount || 0}
            saved={sharedLink.savedCount || 0}
          />
        </div>
      </div>
    </div>
  );
}
