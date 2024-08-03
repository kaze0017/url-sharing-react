import { useState } from "react";
import { UserProfileType } from "../../../../lib/interfaces";
import { AiOutlineMessage } from "react-icons/ai";
import { SlUserFollow } from "react-icons/sl";
import { GrOverview } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../state/store";
import { connectToPerson } from "../../../../state/connections/connectionsSlice";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";

export default function Person({ person }: { person: UserProfileType }) {
  const { connections, requests } = useSelector(
    (state: RootState) => state.connections
  );
  const [selected, setSelected] = useState(false);
  const [connectionState, setConnectionState] = useState<
    "connected" | "pending" | "not connected" | "warning"
  >("not connected");

  const dispatch = useDispatch<AppDispatch>();
  async function connectUser() {
    const response = await dispatch(connectToPerson(person.user_id));
    console.log(response);
    if (response.meta.requestStatus === "fulfilled") {
      setConnectionState("pending");
    } else {
      setConnectionState("warning");
    }
  }
  return (
    <div
      className="flex flex-col p-1 bg-gray-100 items-center gap-2 border border-gray-500 rounded-md"
      onClick={() => setSelected(!selected)}
    >
      <div className="flex flex-col w-full gap-1">
        <div className="flex w-full gap-2 items-center">
          <Avatar
            src={person.profile_picture}
            alt={`${person.first_name} ${person.last_name}`}
          />

          <p className="flex">
            {person.first_name} {person.last_name}
          </p>
          <p className="flex flex-grow items-center justify-end px-2">
            {person.subscribers?.length || 0}
          </p>
        </div>
        <div className="flex justify-between w-full">
          <p>Categories: {person.categories?.length || 0}</p>
          <p>links: {person.publications?.links.length || 0}</p>
        </div>
      </div>
      {selected && (
        <div
          className="flex items-center p-1 px-2 justify-between w-full gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <AiOutlineMessage className="text-lg text-blue-950 cursor-pointer" />
          <button
            onClick={connectUser}
            className="flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              connectionState === "connected" ||
              connectionState === "pending" ||
              (person.relationStatus && person.relationStatus === "true")
                ? true
                : false
            }
          >
            <SlUserFollow className="text-lg text-blue-950" />
          </button>
          <Link to={`/profile/${person.user_id}`}>
            <GrOverview className="text-lg text-blue-950 cursor-pointer" />
          </Link>
        </div>
      )}
    </div>
  );
}
