import ProfilePictureLg from "../../profilePictures/ProfilePictureLg";
import InfoReport from "../../InfoReport";
import { UserProfileType } from "../../../lib/interfaces";
import { GoDotFill } from "react-icons/go";
import { useContext } from "react";
import { UserProfileContext } from "../../../context/UserProfileProvider";
import AuthContext from "../../../context/AuthProvider";
import { getUserProfile } from "../../../api/gets/getUserProfile";
import { Avatar } from "@mui/material";

interface Props {
  user: UserProfileType;
  toggledCollapse: boolean;
}

export default function UserInfo({ user, toggledCollapse }: Props) {
  const { auth } = useContext(AuthContext);
  const { userProfile } = useContext(UserProfileContext);

  let person: UserProfileType = {
    user_id: userProfile.user_id || 0,
    first_name: userProfile.first_name || "NA",
    last_name: userProfile.last_name || "NA",
    email: userProfile.email || "NA",
    profile_picture:
      userProfile.profile_picture || "images/defaults/personDefaultImage.png",
    title: userProfile.title || "NA",
    subscribers: userProfile.subscribers || [],
    publications: userProfile.publications || {
      links: [],
      categories: "",
    },
  };

  const fullName = person.first_name + " " + person.last_name;
  const publishedCategories = person.publications?.categories || [];
  const publishedLinks = person.publications?.links || [];

  return (
    <div className="flex flex-col gap-2 items-center justify-center uppercase">
      <Avatar src={person.profile_picture} alt={fullName}>
        {person.first_name[0].toUpperCase()}
        {person.last_name[0].toUpperCase()}
      </Avatar>
      <InfoReport title="subscribers" data={person.subscribers?.length || 0} />
      {!toggledCollapse && (
        <>
          <p>{fullName}</p>
          <p>{person.title}</p>
          <GoDotFill />

          <p className="text-xs font-bold">Publications</p>
        </>
      )}
      <div className={`flex gap-2 ${toggledCollapse && "flex-col mt-4"}`}>
        <InfoReport title="Categories" data={publishedCategories.length} />
        <InfoReport title="Links" data={publishedLinks.length} />
      </div>
    </div>
  );
}
