import React from "react";
import { CiGrid41 } from "react-icons/ci";
import CardDetailIcons from "../cards/CardDetailIcons";
import ProfilePicture from "../ProfilePicture";

import { SharedLinkType } from "../../lib/interfaces";
// import { Shrikhand } from "../../lib/interfaces";
interface CardSharedLgProps {
  sharedLink: SharedLinkType;
  width?: number;
}

export default function CardSharedLg({ sharedLink, width }: CardSharedLgProps) {
  const mainWrapperClass = `flex flex-col gap-2 p-2 h-[200px] w-[600px] mx-auto panel-light`;
  const imgUrl =
    sharedLink.type === "image"
      ? "/images/defaults/imageDefaultThumbnail.jpg"
      : "/images/defaults/videoDefaultThumbnail.jpg";
  return (
    <div className={mainWrapperClass}>
      <div className="flex h-3/4 gap-2">
        <div className="w-[180px] aspect-video">
          <img
            src={imgUrl}
            alt={sharedLink.title}
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <div className="">
            <h2 className="font-bold">{sharedLink.title}</h2>
            <p>{sharedLink.description}</p>
          </div>
          <div className="flex grow"></div>
          <div className="">
            <p>{sharedLink.publicationDate}</p>
            <div className="text-xs flex w-full uppercase gap-1">
              {sharedLink.tags?.map((tag, index) => {
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
          <ProfilePicture size={32} imageUrl={sharedLink.owner.photo} alt="" />
          <h4>{sharedLink.owner.name}</h4>
        </div>
        <div className="flex grow"></div>
        <CardDetailIcons
          rank={sharedLink.rankCount}
          shared={sharedLink.sharedCount}
          saved={sharedLink.savedCount}
        />
      </div>
    </div>
  );
}
