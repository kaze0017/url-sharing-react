import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../../context/UserProfileProvider";
import ShareWithGroupsContext from "../../../context/ShareWithGroupsProvider";
// import { PersonType } from "../../../lib/interfaces";
import ProfilePictureMd from "../../profilePictures/ProfilePictureMd";
import { UserProfileType } from "../../../lib/interfaces";

interface CardPersonProps {
  person: UserProfileType;
  selected: boolean;
}

export default function CardPerson({ person, selected }: CardPersonProps) {
  const { selectedPeople, setSelectedPeople, setPeopleToDisplay } = useContext(
    ShareWithGroupsContext
  );
  const { userProfile, setUserProfile } = useContext(UserProfileContext);
  const [relationState, setRelationState] = useState<
    "connected" | "not-connected" | "pending"
  >("not-connected");

  function toggle(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    console.log(e.target);
    if (selectedPeople.some((item) => item.id === person.id)) {
      setSelectedPeople((prevSelectedPeople) =>
        prevSelectedPeople.filter((prevPerson) => prevPerson.id !== person.id)
      );

      setPeopleToDisplay((prevPeopleToDisplay) => [
        ...prevPeopleToDisplay,
        person,
      ]);
    } else {
      setSelectedPeople((prevSelectedPeople) => [
        ...prevSelectedPeople,
        person,
      ]);
      setPeopleToDisplay((prevPeopleToDisplay) =>
        prevPeopleToDisplay.filter((prevPerson) => prevPerson.id !== person.id)
      );
    }
  }

  function handleConnect(person: UserProfileType) {
    setUserProfile((prevUserProfile) => ({
      ...prevUserProfile,
      pendingConnections: [
        ...(prevUserProfile.pendingConnections || []),
        person,
      ],
    }));
  }
  useEffect(() => {
    if (
      userProfile.connections?.some((connection) => connection.id === person.id)
    ) {
      setRelationState("connected");
    } else if (
      userProfile.pendingConnections?.some(
        (connection) => connection.id === person.id
      )
    ) {
      setRelationState("pending");
    } else {
      setRelationState("not-connected");
    }
  }, [userProfile.connections, userProfile.pendingConnections]);

  const cardClass = `text-center text-xs w-[80px] h-28 flex flex-col items-center justify-center gap-1 p-1 rounded-lg cursor-pointer ${
    selected ? "bg-indigo-200" : "bg-gray-200"
  }`;

  return (
    <div
      onClick={(e) => {
        toggle(e);
      }}
      className={cardClass}
    >
      <ProfilePictureMd person={person} />
      <div className="flex w-full flex-grow flex-col items-center justify-center">
        <p className="text-center truncate w-full overflow-hidden">
          {person.first_name}
        </p>
        <p className="text-center">{person.last_name}</p>
      </div>
      {relationState === "connected" && (
        <button className="flex w-100 flex-grow">Connected</button>
      )}
      {relationState === "not-connected" && (
        <button onClick={() => handleConnect(person)}>Connect</button>
      )}
      {relationState === "pending" && <button>Pending</button>}
    </div>
  );
}
