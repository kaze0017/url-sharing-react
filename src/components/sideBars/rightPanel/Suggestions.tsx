import { getSuggestions } from "../../../lib/actions"
import SubscribeSuggestion from "./suggestion/SubscribeSuggestion";

interface SuggestionsProps {
  variant: "expanded" | "collapsed";
}

export default function Suggestions(props: SuggestionsProps) {
  const subscribeSuggestions = getSuggestions();

  return (
    <div className="flex flex-col gap-1 p-1">
      {subscribeSuggestions.map((person, index) => {
        return (
          <SubscribeSuggestion
            key={index}
            variant={props.variant}
            person={person}
          />
        );
      })}
    </div>
  );
}
