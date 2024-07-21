import { MdOutlineSync } from "react-icons/md";
import { MdOutlineSyncProblem } from "react-icons/md";
import { MdOutlineSyncDisabled } from "react-icons/md";
import { MdOutlineSyncLock } from "react-icons/md";

interface StatusProps {
  linkUrls: {
    primary: {
      url: string;
      health?: "healthy" | "unhealthy" | "unknown";
    };
    secondary?: {
      url: string;
      health?: "healthy" | "unhealthy" | "unknown";
    };
    tertiary?: {
      url: string;
      health?: "healthy" | "unhealthy" | "unknown";
    };
  };
}

export default function Status({ linkUrls }: StatusProps) {
  const { primary, secondary, tertiary } = linkUrls;
  let numberOfLinks = 0;
  let numberOfHealthyLinks = 0;
  if (primary.url.length > 0) numberOfLinks++;
  if (primary.health === "healthy") numberOfHealthyLinks++;
  if (secondary?.url?.length) {
    if (secondary.url.length > 0) numberOfLinks++;
    if (secondary.health === "healthy") numberOfHealthyLinks++;
  }
  if (tertiary?.url?.length) {
    if (tertiary.url.length > 0) numberOfLinks++;
    if (tertiary.health === "healthy") numberOfHealthyLinks++;
  }

  return (
    <div className="flex flex-col text-indigo-500 items-center justify-center">
      {numberOfHealthyLinks === numberOfLinks && numberOfLinks > 0 ? (
        <MdOutlineSync className="text-green-500 text-xl" />
      ) : numberOfHealthyLinks === 0 && numberOfLinks > 0 ? (
        <MdOutlineSyncDisabled className="text-red-500 text-xl" />
      ) : numberOfHealthyLinks > 0 && numberOfHealthyLinks < numberOfLinks ? (
        <MdOutlineSyncProblem className="text-yellow-500 text-xl" />
      ) : (
        <MdOutlineSyncLock className="text-gray-500 text-xl" />
      )}
      <div className="text-2xs">
        {numberOfHealthyLinks} / {numberOfLinks}
      </div>
    </div>
  );
}
