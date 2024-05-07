import React from "react";
import ProfilePictureLg from "../../ProfilePictureLg";
import InfoReport from "../../InfoReport";
import { Person } from "../../../lib/interfaces";
import { GoDotFill } from "react-icons/go";

interface Props {
  user: Person;
  toggledCollapse: boolean;
}

export default function UserInfo({ user, toggledCollapse }: Props) {
  const publishedCategories = user.publications.categories || [];
  const publishedLinks = user.publications.links || [];

  const publicationsCount =
    publishedCategories?.length + publishedLinks?.length;
  return (
    <div className="flex flex-col gap-2 items-center justify-center uppercase">
      <ProfilePictureLg imageUrl={user.photo} alt={user.name} />
      <InfoReport title="subscribers" data={user.subscribersCount || 0} />
      {!toggledCollapse && (
        <>
          <p>{user.name}</p>
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
