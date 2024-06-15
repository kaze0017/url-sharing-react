import { useState, useContext, useEffect } from "react";
import SubmenuTitle from "../SubmenuTitle";
import EditableField from "../EditableField";
import SubSettingContainer from "../SubSettingContainer";
import { UserProfileContext } from "../../../context/UserProfileProvider";
import AuthContext from "../../../context/AuthProvider";
import { postUserProfile } from "../../../api/postUserProfile";
import { IoPersonOutline } from "react-icons/io5";

export default function OrganizationInformation() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";

  const { userProfile, setUserProfile } = useContext(UserProfileContext);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [organizationName, setOrganizationName] =
    useState<string>("Organization Name");
  const [organizationType, setOrganizationType] =
    useState<string>("Organization Type");
  const [organizationField, setOrganizationField] =
    useState<string>("Organization Field");

  async function handelSubmit() {
    const response = await postUserProfile({ token, userProfile });
    setEditMode(false);
  }

  const labelClass = editMode
    ? "text-sm font-semibold w-20"
    : "text-sm font-semibold w-20";
  // input editable mode class
  const inputEditableClass = editMode
    ? "border-b border-gray-300  flex flex-grow items-center h-8"
    : "bg-transparent border-none flex flex-grow items-center h-8";
  // textarea for bio
  const textareaClass = editMode
    ? "border-b border-gray-300 flex flex-grow"
    : "bg-transparent border-none flex flex-grow";
  const btnClass = "bg-blue-950 text-white p-2 rounded-md w-20";

  return (
    <SubSettingContainer title="Organization Information">
      <div className="flex gap-2">
          <div className="relative w-32 h-36">
            <picture className="absolute top-0 left-0 w-full h-full">
              {userProfile.org_picture !== "null" &&
              userProfile.org_picture !== null &&
              userProfile.org_picture !== "" ? (
                <img
                  className="object-cover w-full h-full rounded-full"
                  src={userProfile.org_picture}
                  alt="profile picture"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <IoPersonOutline className="text-8xl text-gray-500" />
                </div>
              )}
            </picture>
            {/* shadow */}
            <div className="absolute left-0 -bottom-8 w-full h-8 rounded-full bg-[radial-gradient(50%_50%_at_50%_40%,rgba(0,0,0,0.40)_0%,rgba(255,255,255,0.00)_100%)]"></div>
          </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-grow">
            <label htmlFor="org_name" className="text-sm font-semibold w-20">
              Name
            </label>
            <input
              type="text"
              id="org_name"
              value={userProfile.org_name || ""}
              onChange={(e) =>
                setUserProfile({ ...userProfile, org_name: e.target.value })
              }
              className={inputEditableClass}
              readOnly={!editMode}
            />
          </div>
          <div className="flex items-center gap-2 flex-grow">
            <label htmlFor="org_email" className="text-sm font-semibold w-20">
              Email:
            </label>
            <input
              type="email"
              id="org_email"
              value={userProfile.org_email || ""}
              onChange={(e) =>
                setUserProfile({ ...userProfile, org_email: e.target.value })
              }
              className={inputEditableClass}
              readOnly={!editMode}
            />
          </div>
          <div className="flex items-center gap-2 flex-grow">
            <label htmlFor="org_foa" className="text-sm font-semibold w-20">
              Field:
            </label>
            <input
              type="text"
              id="org_foa"
              value={userProfile.org_foa || ""}
              onChange={(e) =>
                setUserProfile({ ...userProfile, org_foa: e.target.value })
              }
              className={inputEditableClass}
              readOnly={!editMode}
            />
          </div>
          <div className="flex gap-2">
            <button className={btnClass} onClick={() => setEditMode(!editMode)}>
              {editMode ? "Cancel" : "Edit"}
            </button>
            {editMode && (
              <button
                type="submit"
                className={btnClass}
                onClick={() => handelSubmit()}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </SubSettingContainer>
  );
}

// "Content-Type": "application/json",
// async function getSharedLinksFromServer() {
//   try {
//     const response = await axiosInstance.get(USER_PROFILE_URL, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         auth: auth?.token,
//       },
//     });
//     console.log("profile", response);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }
// async function updateProfile() {
//   const formData = new URLSearchParams();
//   formData.append("first_name", "ms");

//   const config = {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       auth: auth?.token,
//     },
//   };

//   try {
//     const response = await axiosInstance.post(
//       USER_PROFILE_URL,
//       formData.toString(),
//       config
//     );
//     console.log(response);
//     // Handle response
//   } catch (error) {
//     console.error(error);
//   }
// }
// updateProfile();
// getSharedLinksFromServer();
// useEffect(() => {
//   getSharedLinksFromServer();
// }, []);
