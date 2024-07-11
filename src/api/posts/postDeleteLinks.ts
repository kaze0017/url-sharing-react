import axiosInstance from "../axios";
import { DELETE_LINK_URL } from "../constants";

export async function deleteLinks({
  token,
  ids,
}: {
  ids: number[];
  token: string;
}) {
  console.log("API: DeleteLink");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };
  const formData = new URLSearchParams();
  formData.append("link_ids", ids.join(","));

  try {
    const response = await axiosInstance.post(
      DELETE_LINK_URL,
      formData.toString(),
      config
    );
    return response;
  } catch (error) {
    console.error("Error deleting links:", error);
    throw error;
  }
}
