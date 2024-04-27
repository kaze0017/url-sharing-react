import { FiLink } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";

export default function PageTitleMenu() {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <FiLink className="text-indigo-600 text-2xl font-bold ml-2" />
        <h2>Links</h2>
      </div>
      <div className="flex flex-col items-center">
        <MdOutlineCategory className="text-indigo-600 text-2xl font-bold ml-2" />
        <h2>Categories</h2>
      </div>
    </div>
  );
}
