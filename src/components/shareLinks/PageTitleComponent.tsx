import { HiOutlineLink } from "react-icons/hi2";
import { useContext } from "react";
import LinkManagementContext from "../../context/LinkManagementProvider";
import { useNavigate } from "react-router-dom";

export default function PageTitleComponent() {
  const navigate = useNavigate();
  const { selectedLinks } = useContext(LinkManagementContext);
  const MainWrapperClass = "flex gap-5 uppercase";
  const iconsClass = "text-indigo-600 text-4xl font-bold ml-2";
  function handelClick() {
    navigate("/linkmanagement");
  }
  return (
    <div className={MainWrapperClass} onClick={handelClick}>
      <div className="flex flex-col items-center relative ">
        <div className="absolute top-0 left-0 text-xs ">
          {selectedLinks.length}
        </div>
        <HiOutlineLink className={iconsClass} />
      </div>
    </div>
  );
}
