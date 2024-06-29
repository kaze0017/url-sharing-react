import { SharedLinkType } from "../../lib/interfaces";
import FeaturedImage from "./featuredImages/FeaturedImage";
import { Link } from "react-router-dom";

interface CardImgIconSProps {
  sharedLink: SharedLinkType;
  cardSize?: "small" | "medium" | "large" | "xlarge";
}

export default function CardImgIconS({ sharedLink }: CardImgIconSProps) {
  return (
    <div className="w-[200px] aspect-video">
      <FeaturedImage sharedLink={sharedLink} twClass="w-full h-full" />
    </div>
  );
}
