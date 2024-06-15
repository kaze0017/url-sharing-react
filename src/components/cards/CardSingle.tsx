import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { SharedLinkType } from "../../lib/interfaces";
// import { sharedLinks } from "../../lib/placeholder-data";
import ProfilePictureSm from "../profilePictures/ProfilePictureSm";
import { CiEdit } from "react-icons/ci";
import GradientIcon from "../customIcons/GradientIcon";
import { useNavigate } from "react-router-dom";

export default function CardSingle({
  sharedLink,
  editable,
}: {
  sharedLink: SharedLinkType;
  editable: boolean;
}) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  function navigateToEditLinkPage() {
    navigate(`/linkManagement/editLink/${sharedLink.id}`);
  }
  const ownerFullName =
    sharedLink.owner.first_name + " " + sharedLink.owner.last_name;
  return (
    <div className=" uppercase flex flex-col h-full gap-1 p-2 panel-light">
      <div className=" flex items-center justify-between h-12 p-1 border-b-2 border-indigo-700 ">
        <div className="flex gap-1 justify-center items-center h-full w-40">
          <ProfilePictureSm person={sharedLink.owner} />
          <h3 className="text-xs">{ownerFullName}</h3>
        </div>
        <div className="flex justify-center items-center h-full flex-grow text-center">
          <h3 className="text-md font-bold">{sharedLink.title}</h3>
        </div>
        <div className="flex gap-1 text-center text-2xs w-40">
          <div className="w-1/3 flex flex-col items-center">
            <p className="border-b-2 border-green-700 w-full">
              {sharedLink.rankCount}
            </p>
            <p>Rank</p>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <p className="border-b-2 border-green-700 w-full">
              {sharedLink.savedCount}
            </p>
            <p>Saved</p>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <p className="border-b-2 border-green-700 w-full">
              {sharedLink.sharedCount}
            </p>
            Shared
          </div>
        </div>
      </div>
      <div className="flex w-full flex-grow relative items-center justify-center">
        <img
          src={
            sharedLink.thumbnail || "/images/defaults/imageDefaultThumbnail.jpg"
          }
          className="absolute w-full h-full top-0 left-0 object-cover"
        />
        <div className="absolute w-full h-full flex flex-col justify-center items-center backdrop-blur-sm bg-white/30">
          {editable && (
            <div
              className="absolute top-0 right-0 flex  w-16 h-16"
              onClick={navigateToEditLinkPage}
            >
              <GradientIcon icon={CiEdit} size="100%" />
            </div>
          )}
          <p className="text-2xl font-bold bg-blue-950 p-2 text-white px-4">
            {sharedLink.title}
          </p>
          <p className="text-xl text-blue-950 font-bold">
            {sharedLink.contentDescription}
          </p>
          <a
            href={sharedLink.url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 text-blue-800"
          >
            Tap to open the link
          </a>
        </div>
      </div>
    </div>
  );
}
