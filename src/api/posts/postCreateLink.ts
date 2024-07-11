import { CREATE_URL } from "../constants";
import axiosInstance from "../axios";

interface postCreateLinkInterface {
  token: string;
  data: {
    title: string;
    url: string;
    contentDescription: string;
    category: string;
    url_username: string;
    url_pass: string;
    sharingDeptLevel: string;
    back_up_link_1st: string;
    back_up_link_2nd: string;
    url_type: string;
    thumbnail: string;
    tags: Array<string>;
  };
}

export async function postCreateLink({ token, data }: postCreateLinkInterface) {
  const formData = new URLSearchParams();
  formData.append("title", data.title);
  formData.append("url", data.url);
  formData.append("content_description", data.contentDescription);
  formData.append("category", data.category);
  formData.append("thumbnail", data.thumbnail);
  formData.append("tags", data.tags.join(","));
  formData.append("url_username", data.url_username);
  formData.append("url_pass", data.url_pass);
  formData.append("sharing_dept_level", data.sharingDeptLevel);
  formData.append("back_up_link_1st", data.back_up_link_1st);
  formData.append("back_up_link_2nd", data.back_up_link_2nd);
  formData.append("class_type", "link");
  formData.append("url_type", data.url_type);

  try {
    const response = await axiosInstance.post(CREATE_URL, formData.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        auth: token,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
