import React from "react";
import { UserProfileType } from "../../../lib/interfaces";
import ProfilePicture from "../../profilePictures/ProfilePicture";
import { IoLogoTux } from "react-icons/io";
import { BsExclamationLg } from "react-icons/bs";



export default function cardSm(person: UserProfileType) {
  const mainWrapperClass = "flex items-center h-[80px]";
  const textPanelClass =
    "relative flex items-center justify-between px-2 pr-6 panel-light w-[220px] h-[60px]  uppercase text-xs";
  return (
    <div className={mainWrapperClass}>
      <div className={textPanelClass}>
        <ProfilePicture user={person} size="small" clickable={false} />
        {person.connections ? (
          <div className="absolute top-0 right-0 flex items-center justify-center w-6 h-8 bg-indigo-300 rounded-full">
            {person.connections.length}
          </div>
        ) : (
          <div className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 rounded-full text-slg">
            <BsExclamationLg />
          </div>
        )}
        {person.first_name} {person.last_name}
        {person.org_picture ? (
          <img
            src={person.org_picture}
            alt="org"
            className="absolute bottom-0 right-0 w-6 h-6"
          />
        ) : (
          <IoLogoTux className="absolute bottom-0 right-0 w-6 h-6 text-blue-950" />
        )}
      </div>
    </div>
  );
}
