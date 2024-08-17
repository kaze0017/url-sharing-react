import ProfilePicture from "../../profilePictures/ProfilePicture";
import InfoReport from "../../InfoReport";
import { UserProfileType } from "../../../lib/interfaces";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";


interface Props {
  user: UserProfileType;
  toggledCollapse: boolean;
}

export default function UserInfo({ user, toggledCollapse }: Props) {


  const fullName = user.first_name + " " + user.last_name;
  const publishedCategories = user.publications?.categories || [];
  const publishedLinks = user.publications?.links || [];

  return (
    <div className="flex flex-col gap-2 items-center justify-center uppercase">
      <ProfilePicture user={user} size="large" clickable hoverAnimation />
      <InfoReport title="subscribers" data={user.subscribers?.length || 0} />
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
