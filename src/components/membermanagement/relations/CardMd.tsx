import React from "react";
import { PersonType } from "../../../lib/interfaces";
import { IoLogoTux } from "react-icons/io";
import { BsExclamationLg } from "react-icons/bs";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";

export default function CardMd(person: PersonType) {
  const mainWrapperClass =
    "relative panel-light flex flex-col items-center h-[150px]  aspect-video text-sm";
  return (
    <div className={mainWrapperClass}>
      <div className="absolute bottom-0 right-0">
        {person.org_picture ? (
          <img src={person.org_picture} alt="" />
        ) : (
          <IoLogoTux className="w-20 h-20 text-blue-950 opacity-10" />
        )}
      </div>
      <div className="flex flex-row w-full justify-between p-4">
        <div className="w-[1/4]">
          <img
            src={person.profile_picture}
            alt="profile"
            className=" border-1 border-blue-950"
            width={70}
            height={70}
          />
        </div>
        <div className="flex flex-grow items-center text-center">
          <div className="flex flex-col w-full items-center ">
            <p>
              {person.first_name} {person.last_name}
            </p>
            <p>{person.title}</p>
            <p>{person.org_name}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full p-4">
        <div className="flex gap-1">
          {person.org_picture ? (
            <img src={person.org_picture} alt="org" className="w-6 h-6" />
          ) : (
            <IoLogoTux className="w-6 h-6 text-blue-950" />
          )}
          <p>{person.org_picture || "NA"}</p>
        </div>
        <div className="flex gap-1">
          <div className="flex flex-col">
            <BiSolidDownArrow />
            <p>12</p>
          </div>
          <div className="flex flex-col">
            <BiSolidUpArrow />
            <p>12</p>
          </div>
        </div>
      </div>
    </div>
  );
}
