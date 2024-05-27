import { Outlet } from "react-router-dom";
import PanelLeft from "../sideBars/PanelLeft";
import PanelRight from "../sideBars/PanelRight";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

export default function Layout() {
  // const { auth } = useContext(AuthContext);
  // console.log("hi");
  return (
    <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden scrollbar-hide">
      <PanelLeft />
      <Outlet />
      <PanelRight />
    </div>
  );
}
