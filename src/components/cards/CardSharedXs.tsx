import React from "react";
import { SharedLinkType } from "../../lib/interfaces";
import CardDetailIcons from "./CardDetailIcons";

interface CardSharedXsProps {
  sharedLink: SharedLinkType;
}

export default function CardSharedXs({ sharedLink }: CardSharedXsProps) {
  if (!sharedLink) {
    return null;
  }

  const width = 120;
  const height = 64;


  const firstName = sharedLink.owner.firstName || "NA";
  const lastName = sharedLink.owner.lastName || "NA";
  const ownerFullName = `${firstName} ${lastName}`;

  const mainWrapperClass =
    "text-center text-2xs font-thin uppercase flex flex-col items-center p-1 panel-light border border-gray-300 rounded-sm";
    const mainWrapperStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };
  return (
    <div className={mainWrapperClass}
    style={mainWrapperStyle}
    >
      <div className="h-1/2 w-full">
        <p className="truncate w-full font-bold">{sharedLink.title}</p>
        <p className="truncate w-full ">{ownerFullName}</p>
      </div>
      <div className="h-1/2 w-full overflow-hidden">
        <CardDetailIcons
          rank={sharedLink.rankCount || 0}
          shared={sharedLink.sharedCount || 0}
          saved={sharedLink.savedCount || 0}
        />
      </div>
    </div>
  );
}
