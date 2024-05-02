import React from "react";
import { SharedLinkType } from "../../lib/interfaces";
import { IoIosLink } from "react-icons/io";
import ProfilePicture from "../ProfilePicture";
import CardDetailIcons from "./CardDetailIcons";
import GradientIcon from "../customIcons/GradientIcon";
import { CiPlay1 } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";
// import Link from "../home/mainPanel/feed/Link";
import { Link } from "react-router-dom";

interface CardSharedMdProps {
  sharedLink: SharedLinkType;
  width: number;
}

export default function CardSharedMd({ sharedLink, width }: CardSharedMdProps) {
  if (!sharedLink) {
    return null;
  }
  const imgUrl =
    sharedLink.type === "image"
      ? "/images/defaults/imageDefaultThumbnail.jpg"
      : "/images/defaults/videoDefaultThumbnail.jpg";
  const mainWrapperClass = `flex flex-col gap-1 p-2 panel-light border border-gray-300 rounded-sm`;
  return (
    <div
      className={mainWrapperClass}
      style={{ width: `${width}px`, height: `${width}px` }}
    >
      <Link to={`/sharedLink/${sharedLink.id}`}>
        <div className="relative flex w-full aspect-video">
          <div className="absolute top-0 left-0 w-full h-full">
            <GradientIcon
              icon={sharedLink.type === "image" ? CiCamera : CiPlay1}
              size={80}
            />
          </div>
          <img
            src={imgUrl}
            className="object-cover rounded-md"
            alt={sharedLink.title}
          />
        </div>
      </Link>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-col">
          <h2 className="font-bold text-md uppercase ">{sharedLink.title}</h2>
          <p className="text-sm">{sharedLink.description}</p>
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
    </div>
  );
}
