import { UserProfileType } from "../../../../lib/interfaces";
import ProfilePicture from "../../../profilePictures/ProfilePicture";
import { RxDotFilled } from "react-icons/rx";

export interface SubscribeSuggestionProps {
  person: UserProfileType;
  variant: "expanded" | "collapsed";
}

export default function SubscribeSuggestion({
  person,
  variant,
}: SubscribeSuggestionProps) {
  const fullName = `${person.first_name} ${person.last_name}`;
  return (variant === "expanded" && person) ? (
    <div className="text-xs h-20 p-1 w-full border border-gray-800 flex flex-col gap-1 justify-center rounded">
      <div className="flex items-center justify-between gap-1 text-center">
        <ProfilePicture person={person} />
        <h3 className="w-1/4">{fullName}</h3>
        <RxDotFilled />
        {/* <p className="w-1/4">{person.subscribers}</p> */}
        <RxDotFilled />
        <p className="w-1/4">Subscribe</p>
      </div>
      <div className="flex items-center text-center">
        <p className="w-1/2">
          Public Categories: {person.publications?.categories?.length}
        </p>
        <p className="w-1/2">
          Public Links: {person.publications?.links?.length}
        </p>
      </div>
    </div>
  ) : (
    <ProfilePicture person={person} />
  );
}
