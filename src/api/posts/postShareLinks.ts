import Description from "../../components/shareLinks/approval/Description";
import axiosInstance from "../axios";
import { SHARE_LINKS_TO_USERs_URL } from "../constants";

interface ShareLinkToUsersInterface {
  token: string;
  data: {
    message: string;
    description: string;
    link_ids: number[];
    user_ids?: number[];
    group_ids?: number[];
    expirationDate?: string;
    publicationDate?: string;
  };
}

export async function postShareLinks({
  token,
  data,
}: ShareLinkToUsersInterface) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };

  const formData = new URLSearchParams();
  formData.append("message", data.message);
  formData.append("description", data.description);
  formData.append("links", data.link_ids.join(","));
  if (data.user_ids) {
    formData.append("people", data.user_ids.join(","));
  }
  if (data.group_ids) {
    formData.append("group_ids", data.group_ids.join(","));
  }
  if (data.expirationDate) {
    formData.append("expirationDate", data.expirationDate);
  }
  if (data.publicationDate) {
    formData.append("publicationDate", data.publicationDate);
  }




  const body = {
    message: data.message,
    description: "dfgdfg",
    user_ids: "217",
    people: data.user_ids?.join(","),
    group_id: data.group_ids?.join(","),
    expirationDate: data.expirationDate,
    publicationDate: data.publicationDate,
  };
  console.log("API: postShareLinks", data);
  console.log("API: postShareLinks", token);

  try {
    const response = await axiosInstance.post(
      SHARE_LINKS_TO_USERs_URL,
      formData.toString(),
      config
    );
    console.log("postShareLinks response", response);  
    return response;
  } catch (error) {
    console.error(error);
  }
}
