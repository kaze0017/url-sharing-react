// axiosInstance.js
import axios from "axios";
import { SharedLinkType } from "../lib/interfaces";

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: "http://18.224.166.225:8000",
  withCredentials: true,
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
  },
});

export default axiosInstance;

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
  });
  return sharedLinks;
}
