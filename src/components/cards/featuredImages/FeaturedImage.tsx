import { SharedLinkType } from "../../../lib/interfaces";
import GradientIcon from "../../customIcons/GradientIcon";
import { CiPlay1, CiCamera } from "react-icons/ci";
import { PiFileHtmlLight } from "react-icons/pi";
import { CiFileOn } from "react-icons/ci";
import { Link } from "react-router-dom";

interface FeaturedImageProps {
  sharedLink: SharedLinkType;
  twClass?: string;
  hight?: number;
}
export default function FeaturedImage({
  sharedLink,
  twClass,
  hight,
}: FeaturedImageProps) {
  const mainWrapperClass = `relative flex    items-center justify-center  overflow-hidden ${twClass} rounded-md`;
  return (
    <Link to={`/sharedLink/${sharedLink.id}`}>
      <div className={mainWrapperClass}>
        <div className="absolute top-0 left-0 w-full h-full ">
          <GradientIcon
            icon={
              sharedLink.url_type === "image"
                ? CiCamera
                : sharedLink.url_type === "video"
                ? CiPlay1
                : sharedLink.url_type === "article"
                ? CiFileOn
                : PiFileHtmlLight
            }
            size="80%"
          />
        </div>
        <img
          src={sharedLink.thumbnail || ""}
          className="object-cover rounded-md aspect-video"
          alt={sharedLink.title}
        />
      </div>
    </Link>
  );
}
