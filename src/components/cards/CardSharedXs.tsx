import React from "react";
import { SharedLinkType } from "../../lib/interfaces";
import CardDetailIcons from "./actionBtns/ActionBtns";
import ActionBtns from "./actionBtns/ActionBtns";

interface CardSharedXsProps {
  sharedLink: SharedLinkType;
}

export default function CardSharedXs({ sharedLink }: CardSharedXsProps) {
  if (!sharedLink) {
    return null;
  }

  const width = 120;
  const height = 64;

  const firstName = sharedLink.owner.first_name || "NA";
  const lastName = sharedLink.owner.last_name || "NA";
  const ownerFullName = `${firstName} ${lastName}`;

  const mainWrapperClass =
    "text-center text-2xs font-thin uppercase flex flex-col items-center p-1 panel-light border border-gray-300 rounded-sm";
  const mainWrapperStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };
  return (
    <div className={mainWrapperClass} style={mainWrapperStyle}>
      <div className="h-1/2 w-full">
        <p className="truncate w-full font-bold">{sharedLink.title}</p>
        <p className="truncate w-full ">{ownerFullName}</p>
      </div>
      <div className="h-1/2 w-full overflow-hidden">
        <ActionBtns
          rank={sharedLink.rankCount || 0}
          shared={sharedLink.sharedCount || 0}
          saved={sharedLink.savedCount || 0}
          id={sharedLink.id || 0}
        />
      </div>
    </div>
  );
}
