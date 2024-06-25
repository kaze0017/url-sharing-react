import CardPerson from "./CardPerson";
import GroupSm from "./GroupSm";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

interface selectedPanelProps {
  title: string;
  name: "users" | "groups" | "selectedUsers" | "selectedGroups";
}

export default function SelectionPanel({ title, name }: selectedPanelProps) {
  const { selectedPeople, selectedGroups, groupsToDisplay, peopleToDisplay } =
    useSelector((state: RootState) => state.share);

  return (
    <div className="flex flex-col gap-2 w-full uppercase text-xs">
      <p>{title}</p>
      <div className="flex flex-wrap gap-2">
        {name === "users" &&
          peopleToDisplay.map((person) => (
            <CardPerson key={person.user_id} person={person} selected={false} />
          ))}
        {name === "groups" &&
          groupsToDisplay.map((group) => (
            <GroupSm key={group.group_id} group={group} selected={false} />
          ))}
        {name === "selectedUsers" &&
          selectedPeople.map((person) => (
            <CardPerson key={person.user_id} person={person} selected={true} />
          ))}
        {name === "selectedGroups" &&
          selectedGroups.map((group) => (
            <GroupSm key={group.group_id} group={group} selected={true} />
          ))}
      </div>
    </div>
  );
}
