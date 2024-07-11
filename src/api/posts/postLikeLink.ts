import axiosInstance from "../axios";
import { LIKE_LINK_URL } from "../constants";

export async function likeLink({ token, id }: { id: number; token: string }) {
  console.log("API: LikeLink");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      auth: token,
    },
  };
  const formData = new URLSearchParams();
  formData.append("link_ids", id.toString());

  try {
    const response = await axiosInstance.post(
      LIKE_LINK_URL,
      {
        link_ids: id.toString(),
      },
      config
    );
    return response;
  } catch (error) {
    console.error("Error deleting links:", error);
    throw error;
  }
}
