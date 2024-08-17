import React from "react";
import { SharedLinkType } from "../../lib/interfaces";
import { IoIosLink } from "react-icons/io";
import ProfilePicture from "../profilePictures/ProfilePicture";
import CardDetailIcons from "./actionBtns/ActionBtns";
import FeaturedImage from "./featuredImages/FeaturedImage";
import ActionBtns from "./actionBtns/ActionBtns";

interface CardSharedSmProps {
  sharedLink: SharedLinkType;
}

export default function CardSharedSm({ sharedLink }: CardSharedSmProps) {
  if (!sharedLink) {
    return null;
  }
  const height = 128;
  const width = 250;

  const firstName = sharedLink.owner.first_name || "NA";
  const lastName = sharedLink.owner.last_name || "NA";

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
          <p className="truncate  text-xs">{sharedLink.contentDescription}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 h-1/3 text-2xs">
        <IoIosLink />
        <ProfilePicture user={sharedLink.owner} size="small" clickable={false} />
        <div className="flex flex-col">
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
        <div className="flex grow"></div>
        <div className="w-1/2">
          <ActionBtns
            rank={sharedLink.rankCount || 0}
            shared={sharedLink.sharedCount || 0}
            saved={sharedLink.savedCount || 0}
            id={sharedLink.id || 0}
            link={sharedLink}
          />
        </div>
      </div>
    </div>
  );
}
