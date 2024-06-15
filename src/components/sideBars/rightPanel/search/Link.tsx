import React from "react";
import { SharedLinkType } from "../../../../lib/interfaces";

export default function Link({ link }: { link: SharedLinkType }) {
  return (
    <div className="flex flex-col w-full gap-1 bg-gray-100 border border-gray-950 rounded-md p-1">
      <div className="flex w-full gap-2 items-center justify-between p-1 text-2xs uppercase">
        <img
          src={link.owner.profile_picture}
          alt=""
          width={30}
          className="rounded-full aspect-square"
        />
        <p className="flex">
          {link.owner.first_name} {link.owner.last_name}
        </p>
        <p>{link.rankCount || 0}</p>
        <p>???</p>
      </div>
      <div className="flex uppercase w-full">
        <p className="flex w-1/3">{link.title}</p>
        <p className="flex w-1/3 items-center justify-center">
          {link.rankCount || 0}
        </p>
        <p className="flex w-1/3">Add to my view point</p>
      </div>
      <div className="capitalize w-full">
        <p>{link.contentDescription}</p>
      </div>
    </div>
  );
}
