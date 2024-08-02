import axiosInstance from "../axios";
import { NOTIFICATION_URL } from "../constants";

interface AcceptRejectLinksInterface {
  token: string;
  data: {
    shared_accept?: number[];
    shared_reject?: number[];
    connection_accept?: number;
    connection_reject?: number;
  };
}

export async function postAcceptRejectEvents({
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
  if (data.connection_accept) {
    formData.append("connection_accept", data.connection_accept.toString());
  }
  if (data.connection_reject) {
    formData.append("connection_reject", data.connection_reject.toString());
  }
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };

  // formData.append("shared_accept", "154");

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
