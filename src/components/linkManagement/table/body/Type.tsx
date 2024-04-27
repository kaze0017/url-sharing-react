import { PiArticleNyTimesDuotone } from "react-icons/pi";
import { PiVideoDuotone } from "react-icons/pi";
import { PiImageDuotone } from "react-icons/pi";
import { PiFileDuotone } from "react-icons/pi";
import { PiFileTextDuotone } from "react-icons/pi";

interface TypeProps {
  type: "article" | "video" | "podcast" | "image" | "other";
}
export default function Type({ type }: TypeProps) {
  return (
    <div>
      {type === "article" ? (
        <PiArticleNyTimesDuotone className="text-indigo-500 text-xl" />
      ) : type === "video" ? (
        <PiVideoDuotone className="text-indigo-500 text-xl" />
      ) : type === "podcast" ? (
        <PiFileDuotone className="text-indigo-500 text-xl" />
      ) : type === "image" ? (
        <PiImageDuotone className="text-indigo-500 text-xl" />
      ) : (
        <PiFileTextDuotone className="text-indigo-500 text-xl" />
      )}
    </div>
  );
}
