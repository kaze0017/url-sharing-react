import { useState, useEffect, useContext } from "react";
import EditableField from "../EditableField";
import { IoCameraReverseOutline } from "react-icons/io5";
import FullScreenOverlay from "../../FullScreenOverlay";
import ChangeProfilePicture from "./forms/ChangeProfilePicture";
import SubSettingContainer from "../SubSettingContainer";
import { UserProfileContext } from "../../../context/UserProfileProvider";
import { postUserProfile } from "../../../api/axios";
import AuthContext from "../../../context/AuthProvider";
import { IoPersonOutline } from "react-icons/io5";

export default function PersonalInformation() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const { userProfile, setUserProfile } = useContext(UserProfileContext);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [mode, setMode] = useState<"camera" | "upload" | "select">("select");

  useEffect(() => {
    setMode("select");
  }, [showOverlay]);

  useEffect(() => {
    if (mode !== "camera") {
    }
  }, [mode]);

  async function handelSubmit() {
    const response = await postUserProfile({ token, userProfile });
    setEditMode(false);
  }

  const mainWrapperClass =
    "flex w-full h-full items-center justify-center uppercase";

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
    <SubSettingContainer title="Personal Information">
      <FullScreenOverlay display={showOverlay} setDisplay={setShowOverlay}>
        <ChangeProfilePicture
          mode={mode}
          setMode={setMode}
          showOverlay={showOverlay}
        />
      </FullScreenOverlay>

      <div className="flex gap-2">
        <div className="relative w-32 h-36">
          <picture className="absolute top-0 left-0 w-full h-full">
            {userProfile.profile_picture !== "null" &&
            userProfile.profile_picture !== null &&
            userProfile.profile_picture !== "" ? (
              <img
                className="object-cover w-full h-full rounded-full"
                src={userProfile.profile_picture}
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
          <IoCameraReverseOutline
            className="absolute right-0 bottom-0 text-white bg-blue-950 rounded-full p-1 cursor-pointer text-2xl"
            onClick={() => setShowOverlay(true)}
          />
        </div>
        <div className="flex flex-col">
          {/* <EditableField title="Name" value={name} setValue={setName} />
          <EditableField title="gender" value={gender} setValue={setGender} />
          <EditableField
            title="Username"
            value={userName}
            setValue={setUserName}
          />
          <EditableField title="Bio" value={bio} setValue={setBio} /> */}

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-grow">
              <label
                htmlFor="first_name"
                className="text-sm font-semibold w-20"
              >
                First Name:
              </label>
              <input
                type="text"
                id="first_name"
                value={userProfile.first_name || ""}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, first_name: e.target.value })
                }
                className={inputEditableClass}
                readOnly={!editMode}
              />
            </div>
            <div className="flex items-center gap-2 flex-grow">
              <label htmlFor="last_name" className="text-sm font-semibold w-20">
                Last Name:
              </label>
              <input
                type="text"
                id="last_name"
                value={userProfile.last_name || ""}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, last_name: e.target.value })
                }
                className={inputEditableClass}
                readOnly={!editMode}
              />
            </div>

            <div className="flex items-center gap-2 flex-grow">
              <label htmlFor="email" className="text-sm font-semibold w-20">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={userProfile.email || ""}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, email: e.target.value })
                }
                className={inputEditableClass}
                readOnly={!editMode}
              />
            </div>
            <div className="flex items-center gap-2 flex-grow">
              <label htmlFor="user_name" className="text-sm font-semibold w-20">
                User Name:
              </label>
              <input
                type="text"
                id="user_name"
                value={userProfile.user_name || ""}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, user_name: e.target.value })
                }
                className={inputEditableClass}
                readOnly={!editMode}
              />
            </div>
            <div className="flex  gap-2 flex-grow">
              <label htmlFor="bio" className="text-sm font-semibold w-20">
                Bio:
              </label>
              <textarea
                id="bio"
                value={"NA"}
                className={textareaClass}
                readOnly={!editMode}
              />
            </div>
            <div className="flex  gap-2 flex-grow items-center">
              <label htmlFor="photo" className="text-sm font-semibold w-20">
                Photo:
              </label>
              <input
                id="photo"
                value={userProfile.profile_picture || ""}
                className={inputEditableClass}
                readOnly={!editMode}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    profile_picture: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-2">
              <button
                className={btnClass}
                onClick={() => setEditMode(!editMode)}
              >
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
          <div className="flex"> </div>
        </div>
      </div>
    </SubSettingContainer>
  );
}
