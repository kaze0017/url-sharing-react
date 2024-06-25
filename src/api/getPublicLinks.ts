import axiosInstance from "./axios";
import { PUBLIC_URL } from "../constants";
import { SharedLinkType } from "../lib/interfaces";

export async function getPublicLinks(token: string) {
  try {
    const response = await axiosInstance.get(PUBLIC_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: token,
      },
    });
    console.log("getPublicLinks", response);
    return checkData({ sharedLinks: response.data.result });
  } catch (error) {
    console.error(error);
    return [];
  }
}

interface CheckDataProps {
  sharedLinks: SharedLinkType[];
}
function checkData({ sharedLinks }: CheckDataProps) {
  if (
    !sharedLinks ||
    sharedLinks.length === 0 ||
    sharedLinks === null ||
    sharedLinks === undefined
  ) {
    console.log("No shared links found");
    return [];
  }
  sharedLinks.forEach((sharedLink) => {
    if (!sharedLink.thumbnail) {
      switch (sharedLink.url_type) {
        case "image":
          sharedLink.thumbnail = "/images/defaults/imageDefaultThumbnail.jpg";
          break;
        case "video":
          sharedLink.thumbnail = "/images/defaults/videoDefaultThumbnail.jpg";
          break;
        default:
          sharedLink.thumbnail = "/images/defaults/generalDefaultThumbnail.jpg";
      }
    }
  });
  return sharedLinks;
}
