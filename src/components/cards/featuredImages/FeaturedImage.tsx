import { Link } from "react-router-dom";
import { SharedLinkType } from "../../../lib/interfaces";
import GradientIcon from "../../customIcons/GradientIcon";
import { CiPlay1, CiCamera } from "react-icons/ci";
import { IoDocumentOutline } from "react-icons/io5";
import { PiFileHtmlLight } from "react-icons/pi";

interface FeaturedImageProps {
  sharedLink: SharedLinkType;
  twClass?: string;
}
export default function FeaturedImage({
  sharedLink,
  twClass,
}: FeaturedImageProps) {
  const size = 20;

  const mainWrapperClass = `relative flex    items-center justify-center  overflow-hidden ${twClass} rounded-md`;
  return (
    // <Link to={`/sharedLink/${sharedLink.id}`}>
      <div className={mainWrapperClass}>
        <div className="absolute top-0 left-0 w-full h-full ">
          <GradientIcon
            icon={
              sharedLink.url_type === "image"
                ? CiCamera
                : sharedLink.url_type === "video"
                ? CiPlay1
                : sharedLink.url_type === "article"
                ? IoDocumentOutline
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
    // </Link>
  );
}
