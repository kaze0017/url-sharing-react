import { useState } from "react";
import { UserProfileType } from "../../../../lib/interfaces";
import { AiOutlineMessage } from "react-icons/ai";
import { SlUserFollow } from "react-icons/sl";
import { GrOverview } from "react-icons/gr";

export default function Person({ person }: { person: UserProfileType }) {
  const [selected, setSelected] = useState(false);
  return (
    <div
      className="flex flex-col p-1 bg-gray-100 items-center gap-2 border border-gray-500 rounded-md"
      onClick={() => setSelected(!selected)}
    >
      <div className="flex flex-col w-full gap-1">
        <div className="flex w-full gap-2 items-center">
          <img
            src={person.profile_picture}
            alt=""
            width={30}
            className="rounded-full aspect-square"
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
        <div className="flex items-center p-1 px-2 justify-between w-full gap-2">
          <AiOutlineMessage className="text-lg text-blue-950 cursor-pointer" />
          <SlUserFollow className="text-lg text-blue-950 cursor-pointer" />
          <GrOverview className="text-lg text-blue-950 cursor-pointer" />
        </div>
      )}
    </div>
  );
}
