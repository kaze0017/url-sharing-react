import { useContext } from "react";
import LinkManagementContext from "../../context/LinkManagementProvider";
import { useNavigate } from "react-router-dom";

export default function Controller() {
  const { selectedLinks } = useContext(LinkManagementContext);
  const navigate = useNavigate();

  function shareWithGroup() {
    navigate("/shareLinks/shareWithGroups");
  }
  function goToLinkManagement() {
    navigate("/linkmanagement");
  } 

  const btnClass =
    "font-bold font-blue-950 bg-gray-200 text-center justify-center uppercase flex items-center gap-1 p-2 hover:bg-indigo-100 cursor-pointer h-[150px] w-[150px] rounded-lg border border-gray-300";
  return (
    <div className="flex flex-wrap flex-grow overflow-hidden w-full h-full items-center gap-3 justify-center">
      {selectedLinks.length > 0 ? (
        <>
          <button className={btnClass} onClick={shareWithGroup}>
            Share with group/people
          </button>
          <button className={btnClass}>Share with Graph</button>
          <button className={btnClass}>Share with ....</button>
        </>
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
