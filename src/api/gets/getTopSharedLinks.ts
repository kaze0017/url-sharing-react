import axiosInstance from "../axios";
import { PUBLIC_URL } from "../constants";
import { SharedLinkType } from "../../lib/interfaces";

// Define the return type as Promise<SharedLinkType[]>
export async function getTopSharedLinks(
  token: string
): Promise<SharedLinkType[]> {
  console.log("API: getTopSharedLinks");

  try {
    const response = await axiosInstance.get(PUBLIC_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: token
      },
    });

    // Validate response.data and response.data.result
    if (response && response.data && response.data.result) {
      return checkData({ sharedLinks: response.data.result });
    } else {
      console.log("Invalid response structure");
      return []; // Ensure a value is returned
    }
  } catch (error) {
    console.error("Error fetching top shared links:", error);
    return []; // Ensure a value is returned
  }
}

interface CheckDataProps {
  sharedLinks: SharedLinkType[];
}

function checkData({ sharedLinks }: CheckDataProps): SharedLinkType[] {
  if (!sharedLinks || sharedLinks.length === 0) {
    console.log("No shared links found");
    return []; // Ensure a value is returned
  }

  // Set default thumbnails for shared links
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

  return sharedLinks; // Ensure a value is returned
}
