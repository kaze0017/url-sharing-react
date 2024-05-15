import { SharedLinkType } from "../../lib/interfaces";
import { Link } from "react-router-dom";
import FeaturedImage from "./featuredImages/FeaturedImage";

export interface CardLinkHotProps {
  link: SharedLinkType;
  variant: "small" | "medium" | "large" | "xlarge";
  placeholder?: boolean;
}

export default function CardLinkHot({
  link,
  variant,
  placeholder,
}: CardLinkHotProps) {
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

  const thumbnail = link.thumbnail || "";

  return (
    <div className={cardWrapper}>
      <FeaturedImage sharedLink={link} twClass="w-full h-full" />
    </div>
  );
}
