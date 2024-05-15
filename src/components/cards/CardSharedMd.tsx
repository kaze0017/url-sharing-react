import { SharedLinkType } from "../../lib/interfaces";
import { IoIosLink } from "react-icons/io";
import ProfilePicture from "../profilePictures/ProfilePicture";
import CardDetailIcons from "./CardDetailIcons";
import GradientIcon from "../customIcons/GradientIcon";
import { CiPlay1 } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";
import { Link } from "react-router-dom";
import FeaturedImage from "./featuredImages/FeaturedImage";

interface CardSharedMdProps {
  sharedLink: SharedLinkType;
}

export default function CardSharedMd({ sharedLink }: CardSharedMdProps) {
  if (!sharedLink) {
    return null;
  }
  const height = 264;
  const width = 264;

  const firstName = sharedLink.owner.firstName || "NA";
  const lastName = sharedLink.owner.lastName || "NA";

  const imgUrl = sharedLink.thumbnail || "";
  const mainWrapperClass = `flex flex-col justify-between items-center p-2 panel-light border border-gray-300 rounded-sm my-0 `;
  const mainWrapperStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };
  return (
    <div className={mainWrapperClass} style={mainWrapperStyle}>
      <FeaturedImage sharedLink={sharedLink} twClass="h-[125px] w-full" />
      <div className="w-full flex flex-col">
        <h3 className="font-bold text-sm uppercase ">{sharedLink.title}</h3>
        <p className="text-sm">{sharedLink.description}</p>
      </div>

      <div className="w-full flex gap-1 items-center text-xs">
        <IoIosLink />
        <ProfilePicture person={sharedLink.owner} />
        <div className="flex-flex-col">
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
        <div className="flex flex-grow"></div>
        <CardDetailIcons
          rank={sharedLink.rankCount || 0}
          shared={sharedLink.sharedCount || 0}
          saved={sharedLink.savedCount || 0}
        />
      </div>
    </div>
  );
}
