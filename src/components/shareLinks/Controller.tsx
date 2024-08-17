import { useNavigate } from "react-router-dom";
import MenuBtnCard from "../menus/btns/MenuBtnCard";
import { HiOutlineUserGroup } from "react-icons/hi";
import { PiGraphLight } from "react-icons/pi";
import { TbWorldUpload } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { setStatus } from "../../state/share/shareSlice";

export default function Controller() {
  const { selectedLinkIds } = useSelector((state: RootState) => state.link);
  const { selectedCategoriesIds } = useSelector(
    (state: RootState) => state.category
  );

  console.log("selected categories ids", selectedCategoriesIds);
  console.log("selected links ids", selectedLinkIds);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function shareWithGroup() {
    dispatch(setStatus("selectingRecipients"));
    console.log("shareByDiagram");
    navigate("/shareLinks/shareWithGroups");
  }
  function shareByDiagram() {
    dispatch(setStatus("selectingRecipients"));
    navigate("/shareLinks/shareByDiagram");
  }
  function shareOnInternet() {
    dispatch(setStatus("selectingRecipients"));
    navigate("/shareLinks/shareOnInternet");
  }
  function goToLinkManagement() {
    dispatch(setStatus("sharingOptions"));
    navigate("/linkmanagement");
  }

  const btnClass =
    "font-bold font-blue-950 bg-gray-200 text-center justify-center uppercase flex items-center gap-1 p-2 hover:bg-indigo-100 cursor-pointer h-[150px] w-[150px] rounded-lg border border-gray-300";
  return (
    <div className="flex flex-wrap flex-grow overflow-hidden w-full h-full items-center gap-3 justify-center p-4">
      {selectedLinkIds.length > 0 || selectedCategoriesIds.length > 0 ? (
        <div className="panel-light flex flex-col gap-5 p-5 w-10/12 h-full items-center justify-between">
          <div className="flex flex-wrap gap-5 flex-grow items-center">
            <MenuBtnCard
              icon={HiOutlineUserGroup}
              title="Share with group/people"
              callBacFunc={shareWithGroup}
            />
            <MenuBtnCard
              icon={PiGraphLight}
              title="By a diagram hierarchy"
              callBacFunc={shareByDiagram}
            />
            <MenuBtnCard
              icon={TbWorldUpload}
              title="Make Public"
              callBacFunc={shareOnInternet}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 panel-light p-4 items-center text-center font-bold text-blue-950 uppercase ">
          <p className="text-xl">No links selected</p>
          <button className={btnClass} onClick={goToLinkManagement}>
            Visit Link Management
          </button>
        </div>
      )}
    </div>
  );
}
