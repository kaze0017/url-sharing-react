import { useContext } from "react";
import { UserProfileContext } from "../../../context/UserProfileProvider";
import ProfilePictureLg from "../../profilePictures/ProfilePictureLg";
import InfoReport from "../../InfoReport";
import { PersonType } from "../../../lib/interfaces";
import { GoDotFill } from "react-icons/go";

interface Props {
  user: PersonType;
  toggledCollapse: boolean;
}

export default function UserInfo({ user, toggledCollapse }: Props) {
  const { userProfile } = useContext(UserProfileContext);
  console.log("userProfile:", userProfile);

  let person: PersonType = {
    id: 0,
    firstName: userProfile.first_name || "",
    lastName: userProfile.last_name || "",
    photo:
      userProfile.profile_picture === "null"
        ? "images/defaults/personDefaultImage.png"
        : userProfile.profile_picture || "",
    title: userProfile.user_name || "",
    subscribersCount: 0,
    publications: {
      categories: [],
      links: [],
    },
  };
  console.log("person:", person);

  const fullName = person.firstName + " " + person.lastName;
  const publishedCategories = person.publications.categories || [];
  const publishedLinks = person.publications.links || [];

  const publicationsCount =
    publishedCategories?.length + publishedLinks?.length;
  return (
    <div className="flex flex-col gap-2 items-center justify-center uppercase">
      <ProfilePictureLg person={person} />
      <InfoReport title="subscribers" data={person.subscribersCount || 0} />
      {!toggledCollapse && (
        <>
          <p>{fullName}</p>
          <p>{user.title}</p>
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
