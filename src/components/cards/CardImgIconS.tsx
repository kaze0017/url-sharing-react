import React from "react";
import { SharedLinkType } from "../../lib/interfaces";

interface CardImgIconSProps {
  sharedLink: SharedLinkType;
  cardSize?: "small" | "medium" | "large" | "xlarge";
}

export default function CardImgIconS({
  sharedLink,
  cardSize,
}: CardImgIconSProps) {
  // css Classes

  const cardWrapper = `border-solid border-1 border-gray-600 flex w-[150] aspect-video bg-white shadow-md rounded-md`;
  const imgUrl =
    sharedLink.type === "video"
      ? "/images/defaults/videoDefaultThumbnail.jpg"
      : "/images/defaults/imageDefaultThumbnail.jpg";
  return (
    <a href={`/category/${sharedLink.id}`}>
      <div className="w-[200px] aspect-video">
        <img
          src={imgUrl}
          alt={sharedLink.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      {/* {icon} */}
      {/* <p className="text-xs w-2/5">{sharedLink.owner.title}</p> */}
    </a>
  );
}
