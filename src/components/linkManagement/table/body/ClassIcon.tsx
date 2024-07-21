import { MdOutlineCategory } from "react-icons/md";
import { CiLink } from "react-icons/ci";

interface ClassIconProps {
  className: "category" | "link";
}

export default function ClassIcon({ className }: ClassIconProps) {
  return (
    <div className="flex w-full text-center items-center justify-center">
      {className === "category" ? (
        <MdOutlineCategory className="text-indigo-500 text-xl" />
      ) : (
        <CiLink className="text-indigo-500 text-xl" />
      )}
    </div>
  );
}
