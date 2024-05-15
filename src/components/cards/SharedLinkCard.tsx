import React from "react";
import { SharedLinkType } from "../../lib/interfaces";
import { RiShareForwardLine } from "react-icons/ri";
import { PiChartLineUp } from "react-icons/pi";
import { FiEye } from "react-icons/fi";
import { TfiTag } from "react-icons/tfi";
import { BsInfoLg } from "react-icons/bs";
import ProfilePicture from "../profilePictures/ProfilePicture";
import { useState } from "react";

// Define prop interface for SharedLinkCard with parent width and variant
export interface SharedLinkCardProps {
  width?: string;
  variant: "list" | "grid";
  size: "small" | "medium" | "large" | "xlarge";
  sharedLink: SharedLinkType;
}

// Define prop interface for SharedLinkCardIcons
export interface SharedLinkCardIconsProps {
  title: string;
  value?: number;
  icon: React.ReactNode;
}

function SharedLinkCardIcons({ title, value, icon }: SharedLinkCardIconsProps) {
  const wrapperClass = "flex flex-col items-center gap w-[45px]";
  const valueClass =
    value || value === 0
      ? "text-blue-500 text-xs text-gray-500"
      : "opacity-0 text-xs";
  const iconClass =
    "border border-gray-300 rounded-md text-gray-500 flex justify-center items-center w-[25px] h-[20px]";
  const titleClass = "text-xs text-gray-500 text-xs";
  value = value || 0;

  return (
    <div className={wrapperClass}>
      <p className={valueClass}>{value}</p>
      <div className={iconClass}>{icon}</div>
      <p className={titleClass}>{title}</p>
    </div>
  );
}

export default function SharedLinkCard({
  width,
  variant,
  size,
  sharedLink,
}: SharedLinkCardProps) {
  const regeneratedSharedLink = {
    ...sharedLink,
    thumbnail: sharedLink.thumbnail || "",
    description: sharedLink.description || "No description available",
    title: sharedLink.title || "No title available",
    rankCount: sharedLink.rankCount || 0,
    sharedCount: sharedLink.sharedCount || 0,
    views: sharedLink.seenCount || 0,
    savedCount: sharedLink.savedCount || 0,
    publicationDate: sharedLink.publicationDate || "NA",
    expirationDate: sharedLink.expirationDate || "NA",
  };
  return (
    <>
      {variant === "list" ? (
        <SharedLinkCardList sharedLink={regeneratedSharedLink} />
      ) : (
        <SharedLinkCardGrid sharedLink={regeneratedSharedLink} />
      )}
    </>
  );
}

function SharedLinkCardGrid({ sharedLink }: { sharedLink: SharedLinkType }) {
  const [toggleOverlay, setToggleOverlay] = useState(false);
  return (
    <div className="w-[300px] h-[180px] flex flex-col border panel-light border-gray-400 p-1 relative">
      {toggleOverlay && <OverlayActions />}
      <ToggleBtn onClick={() => setToggleOverlay(!toggleOverlay)} />
      <div className="flex">
        <img
          src={sharedLink.thumbnail || "/defaults/generalDefaultThumbnail.jpg"}
          alt={sharedLink.title}
          className="object-cover  w-[200px] h-[110px] rounded-md border border-blue-300 overflow-hidden shadow-md"
        />
        <div className="flex flex-col justify-between gap-1 h-[100px] overflow-clip p-1 w-3/5">
          <h3 className="text-sm truncate">{sharedLink.title}</h3>
          <p className="overflow-hidden text-xs h-3/5 w-full">
            {sharedLink.description}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <SharedLinkCardIcons
            title="Rank"
            value={sharedLink.rankCount}
            icon={<PiChartLineUp />}
          />
          <SharedLinkCardIcons
            title="Shared"
            value={sharedLink.sharedCount}
            icon={<RiShareForwardLine />}
          />
          <SharedLinkCardIcons
            title="Seen"
            value={sharedLink.seenCount}
            icon={<FiEye />}
          />
          <SharedLinkCardIcons
            title="Saved"
            value={sharedLink.savedCount}
            icon={<TfiTag />}
          />
        </div>
        <div className="">
          <SharedLinkCardIcons title="Info" icon={<BsInfoLg />} />
        </div>
      </div>
    </div>
  );
}

function SharedLinkCardList({ sharedLink }: { sharedLink: SharedLinkType }) {
  const [toggleOverlay, setToggleOverlay] = useState(false);
  return (
    <div className="p-1 flex items-center gap-1 w-full h-[100px] border panel-light relative">
      <ToggleBtn onClick={() => setToggleOverlay(!toggleOverlay)} />
      {toggleOverlay && <OverlayActions />}
      <img
        src={sharedLink.thumbnail || "/defaults/generalDefaultThumbnail.jpg"}
        alt={sharedLink.title}
        className="shrink-0	 object-cover w-3/12 max-w-32 aspect-video rounded-md border border-blue-300 overflow-hidden shadow-md"
      />
      <h3 className="text-xs truncate w-4/12 max-w-32">{sharedLink.title}</h3>
      <p className="text-ellipsis overflow-hidden text-xs max-w-32 w-4/12 h-max-full">
        {sharedLink.description}
      </p>
      <ProfilePicture person={sharedLink.owner} />
      <p className="text-xs text-gray-500 p-1 w-[60px] justify-center items-center">
        {sharedLink.seenCount}
      </p>
      <div className="flex flex-col items-center w-[90px]">
        <h3 className="text-xs">Published On</h3>
        <p className="text-xs">{sharedLink.publicationDate}</p>
      </div>
      <div className="flex flex-col items-center w-[90px]">
        <h3 className="text-xs">Expires On</h3>
        <p className="text-xs">{sharedLink.expirationDate}</p>
      </div>
      {/* Growing Box */}
      <div className="flex flex-grow"></div>
      {/* Icons */}
      <div className="flex justify-between">
        <div className="flex">
          <SharedLinkCardIcons
            title="Rank"
            value={sharedLink.rankCount}
            icon={<PiChartLineUp />}
          />
          <SharedLinkCardIcons
            title="Shared"
            value={sharedLink.sharedCount}
            icon={<RiShareForwardLine />}
          />
          <SharedLinkCardIcons
            title="Seen"
            value={sharedLink.seenCount}
            icon={<FiEye />}
          />
          <SharedLinkCardIcons
            title="Saved"
            value={sharedLink.savedCount}
            icon={<TfiTag />}
          />
        </div>
        <div className="">
          <SharedLinkCardIcons title="Info" icon={<BsInfoLg />} />
        </div>
      </div>
    </div>
  );
}

function OverlayActions() {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center rounded-md">
      {/* <ToggleBtn onClick={() => {}} /> */}
      <div className="flex flex-wrap gap-2 items-center justify-center ">
        <p className="bg-blue-500 text-white p-2 rounded-md">Edit</p>
        <p className="bg-blue-500 text-white p-2 rounded-md">Trash</p>
        <p className="bg-blue-500 text-white p-2 rounded-md">Report</p>
        <p className="bg-blue-500 text-white p-2 rounded-md">Not Interested</p>
        <p className="bg-blue-500 text-white p-2 rounded-md">Date</p>
      </div>
    </div>
  );
}

function ToggleBtn({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="flex justify-center items-center w-[30px] h-[10px] rounded-md text-black absolute top-0 right-0 z-10 cursor-pointer "
      onClick={onClick}
    >
      <p>...</p>
    </div>
  );
}
