import { useContext } from "react";
import LinkManagementContext from "../../context/LinkManagementProvider";
import ShareWithGroupsContext from "../../context/ShareWithGroupsProvider";
import { useNavigate } from "react-router-dom";
import MenuBtnCard from "../menus/btns/MenuBtnCard";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiGraphLight } from "react-icons/pi";
import { TbWorldUpload } from "react-icons/tb";
import ProgressBarComp from "../ProgressBarComp";

export default function Controller() {
  const { selectedLinks } = useContext(LinkManagementContext);
  const { setStatus } = useContext(ShareWithGroupsContext);
  const navigate = useNavigate();

  function shareWithGroup() {
    setStatus("selectingRecipients");
    navigate("/shareLinks/shareWithGroups");
  }
  function goToLinkManagement() {
    setStatus("sharingOptions");
    navigate("/linkmanagement");
  }

  const btnClass =
    "font-bold font-blue-950 bg-gray-200 text-center justify-center uppercase flex items-center gap-1 p-2 hover:bg-indigo-100 cursor-pointer h-[150px] w-[150px] rounded-lg border border-gray-300";
  return (
    <div className="flex flex-wrap flex-grow overflow-hidden w-full h-full items-center gap-3 justify-center p-4">
      {selectedLinks.length > 0 ? (
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
              callBacFunc={() => {}}
            />
            <MenuBtnCard
              icon={TbWorldUpload}
              title="By a network"
              callBacFunc={() => {}}
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
