import { SharedLinkType } from "../../lib/interfaces";
import { Link } from "react-router-dom";

export interface CardHotProps {
  link: SharedLinkType;
  variant: "small" | "medium" | "large" | "xlarge";
  placeholder?: boolean;
}

function CardHot({ link, variant, placeholder }: CardHotProps) {
  // CSS Classes
  let width;
  switch (variant) {
    case "small":
      width = "w-[100px]";
      break;
    case "medium":
      width = "w-[200px]";
      break;
    case "large":
      width = "w-[300px]";
      break;
    case "xlarge":
      width = "w-[400px]";
      break;
    default:
      width = "w-full";
  }

  const cardWrapper = `border-solid border-1 border-gray-600 flex ${width} aspect-video bg-white shadow-md rounded-md mx-auto	my-0`;
  const cardImgClass = `w-full h-full object-cover rounded-md`;

  const thumbnail =
    link.thumbnail ||
    (link.type == "image" && "/images/defaults/imageDefaultThumbnail.jpg") ||
    (link.type == "video" && "/images/defaults/videoDefaultThumbnail.jpg") ||
    "/images/defaults/generalDefaultThumbnail.jpg.jpg";

  return (
    <div className={cardWrapper}>
      <Link to={`/sharedLink/${link.id}`} className="w-full h-full">
        <img
          className={cardImgClass}
          src={thumbnail}
          alt={link.title}
          data-link={link.linkUrls.primary.url}
        />
      </Link>
    </div>
  );
}

export default CardHot;
