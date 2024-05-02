import { SharedLinkType } from "../../lib/interfaces";
import { sharedLinks } from "../../lib/placeholder-data";
import ProfilePictureSm from "../ProfilePictureSm";

export default function CardSingle({ linkId }: { linkId: string }) {
  const link = sharedLinks.find(
    (link) => link.id.toString() === linkId
  ) as SharedLinkType;

  return (
    <div className="uppercase flex flex-col h-full gap-1 p-2 panel-light ">
      <div className="flex items-center justify-between h-12 p-1 border-b-2 border-indigo-700 ">
        <div className="flex gap-1 justify-center items-center h-full w-40">
          <ProfilePictureSm
            imageUrl={link.owner.photo}
            id={link.owner.id}
            alt="profile picture"
          />
          <h3 className="text-xs">{link.owner.name}</h3>
        </div>
        <div className="flex justify-center items-center h-full flex-grow text-center">
          <h3 className="text-md font-bold">{link.title}</h3>
        </div>
        <div className="flex gap-1 text-center text-2xs w-40">
          <div className="w-1/3 flex flex-col items-center">
            <p className="border-b-2 border-green-700 w-full">
              {link.rankCount}
            </p>
            <p>Rank</p>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <p className="border-b-2 border-green-700 w-full">
              {link.savedCount}
            </p>
            <p>Saved</p>
          </div>
          <div className="w-1/3 flex flex-col items-center">
            <p className="border-b-2 border-green-700 w-full">
              {link.sharedCount}
            </p>
            Shared
          </div>
        </div>
      </div>
      <div className="flex w-full flex-grow relative items-center justify-center ">
        <img
          src={link.thumbnail}
          className="absolute w-full h-full top-0 left-0 object-cover"
        />
        <div className="absolute w-full h-full flex flex-col justify-center items-center backdrop-blur-sm bg-white/30">
          <p className="text-2xl font-bold bg-blue-950 p-2 text-white px-4">
            {link.title}
          </p>
          <p className="text-xl text-blue-950 font-bold">{link.description}</p>
          <a
            href={link.linkUrls.primary.url}
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
