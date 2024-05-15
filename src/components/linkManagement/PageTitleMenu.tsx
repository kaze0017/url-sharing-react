import { FiLink } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";

export default function PageTitleMenu() {
  const iconsClass = "text-indigo-600 text-xl font-bold ml-2";
  const MainWrapperClass = "flex gap-5 uppercase"
  return (
    <div className={MainWrapperClass}>
      <div className="flex flex-col items-center">
        <FiLink className={iconsClass} />
        <h2 className="text-sm">Links</h2>
      </div>
      <div className="flex flex-col items-center">
        <MdOutlineCategory className={iconsClass} />
        <h2 className="text-sm">Categories</h2>
      </div>
    </div>
  );
}
