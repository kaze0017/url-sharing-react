import React from "react";
import { Person } from "../../lib/interfaces";
import ProfilePicture from "../ProfilePicture";
import { PiChartLineUp } from "react-icons/pi";
import { RiShareForwardLine } from "react-icons/ri";

interface ProfilePageProps {
  person: Person;
}

export default function PageTitle({ person }: ProfilePageProps) {
  const rankShareClass = "flex flex-col items-center ";
  const iconTextClass =
    "text-xs text-gray-500 flex items-center justify-center gap-1 border-t-2 border-indigo-500";
  const subscribeWrapperClass = "flex flex-col items-center";
  return (
    <div className="panel-light p-2">
      <div className="flex items-center">
        <ProfilePicture imageUrl={person?.photo} alt={person?.name} size={64} />
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
  );
}
