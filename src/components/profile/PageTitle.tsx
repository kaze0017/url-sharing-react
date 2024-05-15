import { PersonType } from "../../lib/interfaces";
import ProfilePicture from "../profilePictures/ProfilePicture";
import { PiChartLineUp } from "react-icons/pi";
import { RiShareForwardLine } from "react-icons/ri";

interface ProfilePageProps {
  person: PersonType;
}

export default function PageTitle({ person }: ProfilePageProps) {
  const fullName = person.firstName + " " + person.lastName;
  const rankShareClass = "flex flex-col items-center ";
  const iconTextClass =
    "text-xs text-gray-500 flex items-center justify-center gap-1 border-t-2 border-indigo-500";
  const subscribeWrapperClass = "flex flex-col items-center";
  return (
    <div className=" p-2">
      <div className="flex items-center">
        <ProfilePicture person={person} />
        <div className="flex flex-col ml-2">
          <h1 className="text-2xl font-bold">{fullName}</h1>
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
