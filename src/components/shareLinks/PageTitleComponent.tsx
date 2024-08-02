import { HiOutlineLink } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export default function PageTitleComponent() {
  const navigate = useNavigate();
  const selectedLinkIds = useSelector(
    (state: RootState) => state.link.selectedLinkIds
  );
  const MainWrapperClass = "flex gap-5 uppercase";
  const iconsClass = "text-indigo-600 text-4xl font-bold ml-2";
  function handelClick() {
    navigate("/linkmanagement");
  }
  return (
    <div className={MainWrapperClass} onClick={handelClick}>
      <div className="flex flex-col items-center relative ">
        <div className="absolute top-0 left-0 text-xs ">
          {selectedLinkIds.length}
        </div>
        <HiOutlineLink className={iconsClass} />
      </div>
    </div>
  );
}
