import PanelLeft from "../components/sideBars/PanelLeft";
import PanelRight from "../components/sideBars/PanelRight";
import { Outlet } from "react-router-dom";
import ActionBtns from "../components/home/mainPanel/ActionBtns";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import InitialProfile from "./InitialProfile";

export default function Home() {
  const { isNewUser } = useContext(AuthContext);

  return (
    <div className="flex  w-full h-full p-1 gap-1 overflow-hidden">
      {isNewUser ? (
        <InitialProfile />
      ) : (
        <>
        {/* <PanelTop /> */}
        {/* <div className="flex gap-1"> */}
          <PanelLeft />
          <div className="flex flex-col w-full h-full gap-1">
            <Outlet />
            <ActionBtns />
          </div>
          <PanelRight />
        {/* </div> */}
        </>
      )}
    </div>
  );
}
