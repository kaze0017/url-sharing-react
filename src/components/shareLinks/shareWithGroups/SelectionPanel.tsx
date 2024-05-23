import { useContext } from "react";
import ShareWithGroupsContext from "../../../context/ShareWithGroupsProvider";
import CardPerson from "./CardPerson";
import GroupSm from "../../groups/GroupSm";

interface selectedPanelProps {
  title: string;
  name: "users" | "groups" | "selectedUsers" | "selectedGroups";
}

export default function SelectionPanel({ title, name }: selectedPanelProps) {
  const { selectedPeople, selectedGroups, groupsToDisplay, peopleToDisplay } =
    useContext(ShareWithGroupsContext);

  return (
    <div className="flex flex-col gap-2 w-full uppercase text-xs">
      <p>{title}</p>
      <div className="flex flex-wrap gap-2">
        {name === "users" &&
          peopleToDisplay.map((person) => (
            <CardPerson key={person.id} person={person} selected={false} />
          ))}
        {name === "groups" &&
          groupsToDisplay.map((group) => (
            <GroupSm key={group.id} group={group} selected={false} />
          ))}
        {name === "selectedUsers" &&
          selectedPeople.map((person) => (
            <CardPerson key={person.id} person={person} selected={true} />
          ))}
        {name === "selectedGroups" &&
          selectedGroups.map((group) => (
            <GroupSm key={group.id} group={group} selected={true} />
          ))}
      </div>
    </div>
  );
}
