import { CONNECT_TO_PERSON_URL } from "../constants";
import axiosInstance from "../axios";

interface functionInterface {
  token: string;
  people_id: string;
}

export async function postConnectToPerson({
  token,
  people_id,
}: functionInterface) {
  console.log("API: postConnectToPerson");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };
  
  const data = new URLSearchParams();
  data.append("people_id", people_id);

  console.log("API: postConnectToPerson id", people_id);
  console.log("API: postConnectToPerson token", token);
  try {
    const response = await axiosInstance.post(
      CONNECT_TO_PERSON_URL,
      data,
      config
    );
    console.log("postConnectToPerson", response);
    return response.data.result;
  } catch (error) {
    console.error(error);
    return "failed";
  }
}
