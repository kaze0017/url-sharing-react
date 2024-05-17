import { useContext, useEffect } from "react";
import LinkManagementContext from "../../context/LinkManagementProvider";
import ShareWithGroupsContext from "../../context/ShareWithGroupsProvider";
import MainPanelWrapper from "../MainPanelWrapper";
import { GiWingedEmblem } from "react-icons/gi";
import { set } from "react-hook-form";

export default function Approval() {
  const { selectedLinks, setSelectedLinks } = useContext(LinkManagementContext);
  const {
    selectedPeople,
    selectedGroups,
    status,
    setStatus,
    setSelectedGroups,
    setSelectedPeople,
  } = useContext(ShareWithGroupsContext);

  function shareNow(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setSelectedLinks([]);
    setSelectedPeople([]);
    setSelectedGroups([]);
    setStatus("success");
  }


  useEffect(() => {
    setStatus("approval");
  }, []);

  return (
    <MainPanelWrapper>
      <div className="uppercase w-full h-full flex flex-col gap-2 items-center justify-center">
        {status === "approval" ? (
          <>
            <div className="flex gap-4 items-center justify-center ">
              <div className="">
                <p className="text-2xl text-blue-950">
                  {selectedLinks.length} links
                </p>
              </div>
              <div className="">
                <p className="text-2xl text-blue-950">with</p>
              </div>
              <div className="flex gap-2  p-4 ">
                <p className="text-2xl text-blue-950">
                  {selectedPeople.length} people
                </p>
                <p className="text-2xl text-blue-950">
                  {selectedGroups.length} Groups
                </p>
              </div>
            </div>
            <div className="flex text-xl gap-4 uppercase">
              <button
                className="uppercase bg-indigo-500 text-white p-2 rounded-lg w-[150px]"
                onClick={(e) => shareNow(e)}
              >
                Share Now
              </button>
              <button className="uppercase bg-gray-500 text-white p-2 rounded-lg w-[150px]">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 items-center text-4xl text-blue-950">
            <GiWingedEmblem className="text-6xl" />
            <p>Congradulation</p>
          </div>
        )}
      </div>
    </MainPanelWrapper>
  );
}
