import React from "react";
import { SharedLinkType } from "../../lib/interfaces";
import { IoIosLink } from "react-icons/io";
import ProfilePicture from "../ProfilePicture";
import CardDetailIcons from "./CardDetailIcons";

interface CardSharedXsProps {
  sharedLink: SharedLinkType;
  width: number;
}

export default function CardSharedXs({ sharedLink, width }: CardSharedXsProps) {
  if (!sharedLink) {
    return null;
  }
  const imgUrl =
    sharedLink.type === "image"
      ? "/images/defaults/imageDefaultThumbnail.jpg"
      : "/images/defaults/videoDefaultThumbnail.jpg";
  const mainWrapperClass =
    "text-center text-xs font-thin uppercase flex flex-col items-center p-1 panel-light border border-gray-300 rounded-sm";
  return (
    <div
      className={mainWrapperClass}
      style={{
        width: `${Math.floor(width / 2 - 4)}px`,
        height: `${Math.floor(width / 4 - 6)}px`,
      }}
    >
      <h5 className="truncate w-full">{sharedLink.owner.name}</h5>
      <p className="truncate w-full" style={{ fontSize: "6px" }}>
        {sharedLink.title}
      </p>

      <CardDetailIcons
        rank={sharedLink.rankCount || 0}
        shared={sharedLink.sharedCount || 0}
        saved={sharedLink.savedCount || 0}
      />
    </div>
  );
}
