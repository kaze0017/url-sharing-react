import React from "react";
import { SharedLinkType } from "../../lib/interfaces";
import { IoIosLink } from "react-icons/io";
import ProfilePicture from "../ProfilePicture";
import CardDetailIcons from "./CardDetailIcons";

interface CardSharedSmProps {
  sharedLink: SharedLinkType;
  width: number;
}

export default function CardSharedSm({ sharedLink, width }: CardSharedSmProps) {
  if (!sharedLink) {
    return null;
  }
  const imgUrl =
    sharedLink.type === "image"
      ? "/images/defaults/imageDefaultThumbnail.jpg"
      : "/images/defaults/videoDefaultThumbnail.jpg";
  const mainWrapperClass = `text-center flex flex-col gap-1 p-1 panel-light  border border-gray-300 rounded-sm`;
  return (
    <div
      className={mainWrapperClass}
      style={{ width: `${width}px`, height: `${Math.floor(width / 2 - 6)}px` }}
    >
      <div className="flex w-full">
        <div className="flex w-3/5 aspect-video">
          <img
            src={imgUrl}
            className="object-cover rounded-md"
            alt={sharedLink.title}
          />
        </div>
        <div className="flex flex-col w-2/5">
          <h2 className="truncate  font-bold text-xs uppercase ">
            {sharedLink.title}
          </h2>
          <p className="truncate  text-xs">{sharedLink.description}</p>
        </div>
      </div>

      <div className="flex gap-1 items-center">
        <IoIosLink />
        <ProfilePicture
          size={32}
          imageUrl={sharedLink.owner.photo}
          alt={sharedLink.owner.name}
        />
        <h5 className="text-xs">{sharedLink.owner.name}</h5>
        <div className="flex grow"></div>
        <CardDetailIcons
          rank={sharedLink.rankCount || 0}
          shared={sharedLink.sharedCount || 0}
          saved={sharedLink.savedCount || 0}
        />
      </div>
    </div>
  );
}
