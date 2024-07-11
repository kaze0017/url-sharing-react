import axiosInstance from "../axios";
import { NOTIFICATION_URL } from "../constants";

interface AcceptRejectLinksInterface {
  token: string;
  data: {
    shared_accept?: number[];
    shared_reject?: number[];
  };
}

export async function postAcceptRejectLinks({
  token,
  data,
}: AcceptRejectLinksInterface) {
  console.log("API: postAcceptRejectLinks");
  const formData = new URLSearchParams();

  if (data.shared_accept) {
    formData.append("shared_accept", data.shared_accept.join(","));
  }
  if (data.shared_reject) {
    formData.append("shared_reject", data.shared_reject.join(","));
  }
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };

  try {
    const response = await axiosInstance.post(
      NOTIFICATION_URL,
      formData.toString(),
      config
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
