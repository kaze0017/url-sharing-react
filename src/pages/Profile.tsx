"use client";
import { getPersonById } from "../lib/actions";
import { Person } from "../lib/interfaces";
import ProfilePicture from "../components/ProfilePicture";
import { PiChartLineUp } from "react-icons/pi";
import { RiShareForwardLine } from "react-icons/ri";
import SharedLinkCard from "../components/cards/SharedLinkCard";
import { getSharedLinks } from "../lib/actions";
import { useState } from "react";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { FiList } from "react-icons/fi";
import { SlMagnifier } from "react-icons/sl";
import { FiVideo } from "react-icons/fi";
import { FiImage } from "react-icons/fi";
import { GrDocumentConfig } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { stringify } from "querystring";

export default function Profile() {
 const params = useParams();
 const { userId } = params as { userId: string };

//  const userIdString = stringify(userId);
  const person = regenerateUser({ userId });
  const rankShareClass = "flex flex-col items-center ";
  const iconTextClass =
    "text-xs text-gray-500 flex items-center justify-center gap-1 border-t-2 border-indigo-500";
  const subscribeWrapperClass = "flex flex-col items-center";

  const sharedLinks = getSharedLinks();
  const [linksToDisplay, setLinksToDisplay] = useState(sharedLinks);
  const [displayStyle, setDisplayStyle] = useState<"grid" | "list">("grid");
  const [activeType, setActiveType] = useState("all");

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = event.target.value;
    const filteredLinks = sharedLinks.filter((sharedLink) =>
      sharedLink.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setLinksToDisplay(filteredLinks);
  }

  function handleType(type: string) {
    if (type === "all") {
      setLinksToDisplay(sharedLinks);
      return;
    }
    const filteredLinks = sharedLinks.filter((sharedLink) =>
      sharedLink.type.includes(type)
    );
    setLinksToDisplay(filteredLinks);
  }

  return (
    <div className="flex flex-col gap-2 h-full grow">
      <div className="panel-light p-2">
        <div className="flex items-center">
          <ProfilePicture
            imageUrl={person?.photo}
            alt={person?.name}
            size={64}
          />
          <div className="flex flex-col ml-2">
            <h1 className="text-2xl font-bold">{person?.name}</h1>
            <p>{person?.title}</p>
          </div>
          <div className="flex grow"></div>
          <div className="flex gap-2">
            <div className={rankShareClass}>
              <p>{person?.rankCount}</p>
              <div className={iconTextClass}>
                <PiChartLineUp />
                <p>Rank</p>
              </div>
            </div>
            <div className={subscribeWrapperClass}>
              <p>{person?.subscribersCount}</p>
              <p>Subscribe</p>
            </div>
            <div className={rankShareClass}>
              <p>{person?.sharesCount}</p>
              <div className={iconTextClass}>
                <p>Shares</p>
                <RiShareForwardLine />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="panel-light w-full grow p-2">
        {/* Controllers */}
        <div className="controller border-b-2 p-2 border-gray-500 flex items-center justify-center text-gray-900 gap-10">
          {/* Display */}
          <div className="">
            <button
              className="text-ms text-gray-900"
              onClick={() => setDisplayStyle("grid")}
            >
              <TfiLayoutGrid3 />
            </button>
            <button
              className="text-ms text-gray-900"
              onClick={() => setDisplayStyle("list")}
            >
              <FiList />
            </button>
          </div>
          {/* Category */}
          <div className="flex gap-2">
            <ControlsBtn
              onClick={() => handleType("all")}
              icon={<GrDocumentConfig />}
              value="all"
              activeType={activeType}
              setActiveType={setActiveType}
            />
            <ControlsBtn
              onClick={() => handleType("video")}
              icon={<FiVideo />}
              value="video"
              activeType={activeType}
              setActiveType={setActiveType}
            />
            <ControlsBtn
              onClick={() => handleType("image")}
              icon={<FiImage />}
              value="image"
              activeType={activeType}
              setActiveType={setActiveType}
            />
          </div>
          {/* Flex Grow */}
          <div className="flex grow"></div>
          {/* Search */}
          <div className="flex gap-2 items-center justify-center">
            <div className="flex text-lg items-center justify-center h-full">
              <SlMagnifier />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="rounded-md panel-light p-1 focus:outline-none text-sm"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1 justify-center p-2">
          {linksToDisplay.map((sharedLink, index) => (
            <SharedLinkCard
              key={index}
              // width="w-1/3"
              variant={displayStyle}
              size="medium"
              sharedLink={sharedLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function regenerateUser({ userId }: { userId: string }): Person {
  const person = getPersonById(parseInt(userId));
  const regeneratedPerson: Person = {
    ...person,
    name: person?.name || "NA",
    photo: person?.photo || "/images/defaults/personDefaultImage.png",
    id: person?.id || 0,
    title: person?.title || "NA",
    rankCount: person?.rankCount || 0,
    sharesCount: person?.sharesCount || 0,
    subscribersCount: person?.subscribersCount || 0,
    followers: person?.followers || 0,
    publications: person?.publications || {
      links: [],
      categories: [],
    },
  };
  return regeneratedPerson;
}

// ControlBtns Interface
interface ControlBtnsProps {
  onClick: () => void;
  icon: React.ReactNode;
  value: string;
  setActiveType: (type: string) => void;
  activeType: string;
}

function ControlsBtn({
  onClick,
  icon,
  activeType,
  setActiveType,
  value,
}: ControlBtnsProps) {
  return (
    <div
      className={`flex p-1 text-ms text-gray-900 ${
        activeType === value ? "bg-gray-500" : ""
      }`}
      onClick={() => {
        onClick();
        setActiveType(value);
      }}
    >
      {icon}
    </div>
  );
}
