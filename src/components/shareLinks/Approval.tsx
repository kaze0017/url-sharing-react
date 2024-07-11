import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import MainPanelWrapper from "../MainPanelWrapper";
import { GiWingedEmblem } from "react-icons/gi";
import Dates from "./approval/Dates";
import Description from "./approval/Description";
// import { shareLinks } from "../../api/postShareLinks";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { setSelectedContents } from "../../state/linkManagement/linkManagementSlice";
import {
  setStatus,
  initState,
  shareWithGroups,
} from "../../state/share/shareSlice";

export default function Approval() {
  const [responseMessage, setResponseMessage] = useState("");
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const { selectedLinks } = useSelector(
    (state: RootState) => state.linkManagement
  );
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPeople, selectedGroups, status } = useSelector(
    (state: RootState) => state.share
  );

  async function shareNow(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    dispatch(shareWithGroups(token));
    dispatch(setSelectedContents([]));
    dispatch(initState());
    dispatch(setStatus("success"));
  }

  useEffect(() => {
    setStatus("approval");
  }, [setStatus]);

  return (
    <MainPanelWrapper>
      <div className="uppercase w-full h-full flex flex-col gap-2 items-center justify-center">
        {status === "approval" ? (
          <>
            <div className="flex flex-col gap-4 items-center justify-center ">
              <Dates />
              <Description />
              <div className="flex items-center gap-1">
                <div className="">
                  <p className="text-2xl text-blue-950">
                    {selectedLinks.length} links
                  </p>
                </div>
                <div className="">
                  <p className="text-2xl text-blue-950"> with</p>
                </div>
                <div className="flex gap-2  p-4 ">
                  <p className="text-2xl text-blue-950">
                    {selectedPeople.length}{" "}
                    {selectedPeople.length > 1 ? "People" : "Person"} &
                  </p>
                  <p className="text-2xl text-blue-950">
                    {selectedGroups.length} Groups
                  </p>
                </div>
              </div>
            </div>
            <div className="flex text-xl gap-4 uppercase">
              <button
                className="uppercase bg-blue-950 text-white p-2 rounded-lg w-[150px]"
                onClick={(e) => shareNow(e)}
              >
                Confirm
              </button>
              <button className="uppercase bg-gray-500 text-white p-2 rounded-lg w-[150px]">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 items-center text-4xl text-blue-950">
            <GiWingedEmblem className="text-6xl" />
            <p>{responseMessage}</p>
          </div>
        )}
      </div>
    </MainPanelWrapper>
  );
}
