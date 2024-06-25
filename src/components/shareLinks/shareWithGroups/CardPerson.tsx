import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../../../context/UserProfileProvider";
import { UserProfileType } from "../../../lib/interfaces";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../state/store";
import { setSelectedPeople } from "../../../state/share/shareSlice";

interface CardPersonProps {
  person: UserProfileType;
  selected: boolean;
}

export default function CardPerson({ person, selected }: CardPersonProps) {
  const { selectedPeople } = useSelector((state: RootState) => state.share);
  const dispatch = useDispatch();

  const { userProfile, setUserProfile } = useContext(UserProfileContext);
  const [relationState, setRelationState] = useState<
    "connected" | "not-connected" | "pending"
  >("not-connected");

  function toggle(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();

    if (selectedPeople.some((p) => p.user_id === person.user_id)) {
      dispatch(
        setSelectedPeople(
          selectedPeople.filter((p) => p.user_id !== person.user_id)
        )
      );
    } else {
      dispatch(setSelectedPeople([...selectedPeople, person]));
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
      userProfile.connections?.some(
        (connection) => connection.user_id === person.user_id
      )
    ) {
      setRelationState("connected");
    } else if (
      userProfile.pendingConnections?.some(
        (connection) => connection.user_id === person.user_id
      )
    ) {
      setRelationState("pending");
    } else {
      setRelationState("not-connected");
    }
  }, [userProfile.connections, userProfile.pendingConnections]);

  const cardClass = `hover:shadow-md text-center text-xs w-[80px] h-28 flex flex-col items-center justify-center gap-1 p-1 rounded-lg cursor-pointer ${
    selected ? "bg-indigo-200" : "bg-gray-200"
  }`;

  return (
    <div
      onClick={(e) => {
        toggle(e);
      }}
      className={cardClass}
    >
      <img
        src={
          person.profile_picture || "/images/defaults/personDefaultImage.png"
        }
        alt={person.first_name}
        className="rounded-full w-8 h-8 "
      />
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
