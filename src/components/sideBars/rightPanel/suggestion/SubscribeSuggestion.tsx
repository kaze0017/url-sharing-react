import { Person } from "../../../../lib/interfaces";
import ProfilePicture from "../../../ProfilePicture";
import { RxDotFilled } from "react-icons/rx";

export interface SubscribeSuggestionProps {
  person: Person;
  variant: "expanded" | "collapsed";
}

export default function SubscribeSuggestion(props: SubscribeSuggestionProps) {
  return props.variant === "expanded" ? (
    <div className="text-xs h-20 p-1 w-full border border-gray-800 flex flex-col gap-1 justify-center rounded">
      <div className="flex items-center justify-between gap-1 text-center">
        <ProfilePicture
          size={32}
          imageUrl={props.person.photo}
          alt={props.person.name}
          className="inline-block"
        />
        <h3 className="w-1/4">{props.person.name}</h3>
        <RxDotFilled />
        <p className="w-1/4">{props.person.followers}</p>
        <RxDotFilled />
        <p className="w-1/4">Subscribe</p>
      </div>
      <div className="flex items-center text-center">
        <p className="w-1/2">
          Public Categories: {props.person.publications.categories?.length}
        </p>
        <p className="w-1/2">
          Public Links: {props.person.publications.links?.length}
        </p>
      </div>
    </div>
  ) : (
    <ProfilePicture
      size={32}
      imageUrl={props.person.photo}
      alt={props.person.name}
      className="inline-block"
    />
  );
}
