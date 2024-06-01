// axiosInstance.js
import { UserProfileType } from "../lib/interfaces";
import axios from "axios";
import { USER_PROFILE_URL } from "../constants";
import { PUBLIC_URL } from "../constants";
import { SharedLinkType } from "../lib/interfaces";
import { NotificationsType } from "../lib/interfaces/notifications";
import getMockNotifications from "../lib/mockData/notifications";

axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: "http://18.224.166.225:8000",
  withCredentials: true,
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
  },
});

export default axiosInstance;

interface UserProfileInterface {
  token: string;
  userProfile: UserProfileType;
}

export async function postUserProfile({
  token,
  userProfile,
}: UserProfileInterface) {
  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(userProfile)) {
    formData.append(key, String(value));
  }

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };

  try {
    const response = await axiosInstance.post(
      USER_PROFILE_URL,
      formData.toString(),
      config
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserProfile(token: string) {
  try {
    const response = await axiosInstance.get(USER_PROFILE_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: token,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
}

export async function getSharedLinks(token: string) {
  try {
    const response = await axiosInstance.get(PUBLIC_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: token,
      },
    });
    return checkData({ sharedLinks: response.data.result });
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getTopSharedLinks(token: string) {
  try {
    const response = await axiosInstance.get(PUBLIC_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: token,
      },
    });

    return checkData({ sharedLinks: response.data.result });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getTopSharedCategories(token: string) {
  try {
    const response = await axiosInstance.get(PUBLIC_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: token,
      },
    });

    return response.data.result;
  } catch (error) {
    console.error(error);
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

export function getNotifications(token: string) {
  // return axiosInstance.get("/notifications", {
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     auth: token,
  //   },
  // });
  return getMockNotifications();
}
