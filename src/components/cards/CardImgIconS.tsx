import React from "react";
import { SharedLinkType } from "../../lib/interfaces";
import FeaturedImage from "./featuredImages/FeaturedImage";

interface CardImgIconSProps {
  sharedLink: SharedLinkType;
  cardSize?: "small" | "medium" | "large" | "xlarge";
}

export default function CardImgIconS({ sharedLink }: CardImgIconSProps) {
  // css Classes

  const imgUrl = sharedLink.thumbnail || "";
  return (
    <a href={`/category/${sharedLink.id}`}>
      <div className="w-[200px] aspect-video">
        <FeaturedImage sharedLink={sharedLink} twClass="w-full h-full" />
      </div>
    </a>
  );
}
