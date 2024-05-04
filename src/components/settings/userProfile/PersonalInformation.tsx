import { useRef, useState, useCallback } from "react";
import SubmenuTitle from "../SubmenuTitle";
import EditableField from "../EditableField";
import { IoCameraReverseOutline } from "react-icons/io5";
import FullScreenOverlay from "../../FullScreenOverlay";
import FadeInOut from "../../login/FadeInOut";
import ChangeProfilePicture from "./forms/ChangeProfilePicture";

export default function PersonalInformation() {
  const [name, setName] = useState<string>("John Doe");
  const [gender, setGender] = useState<string>("Male");
  const [userName, setUserName] = useState<string>("john_doe");
  const [bio, setBio] = useState<string>("Lorem ipsum dolor sit amet.");
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  return (
    <div className="relative flex w-full flex-col">
      <SubmenuTitle title="Personal Information" />
      <FullScreenOverlay display={showOverlay} setDisplay={setShowOverlay}>
        <ChangeProfilePicture />
      </FullScreenOverlay>

      <div className="flex gap-2">
        <div className="relative w-32 h-36">
          <picture className="absolute top-0 left-0 w-full h-full">
            <img
              className="object-cover w-full h-full rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile picture"
            />
          </picture>
          {/* shadow */}
          <div className="absolute left-0 -bottom-8 w-full h-8 rounded-full bg-[radial-gradient(50%_50%_at_50%_40%,rgba(0,0,0,0.40)_0%,rgba(255,255,255,0.00)_100%)]"></div>
          <IoCameraReverseOutline
            className="absolute right-0 bottom-0 text-white bg-blue-950 rounded-full p-1 cursor-pointer text-2xl"
            onClick={() => setShowOverlay(true)}
          />
        </div>
        <div className="flex flex-col">
          <EditableField title="Name" value={name} setValue={setName} />
          <EditableField title="gender" value={gender} setValue={setGender} />
          <EditableField
            title="Username"
            value={userName}
            setValue={setUserName}
          />
          <EditableField title="Bio" value={bio} setValue={setBio} />
        </div>
      </div>
    </div>
  );
}
