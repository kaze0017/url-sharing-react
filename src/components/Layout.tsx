import { Outlet } from "react-router-dom";
import React from "react";
import PanelLeft from "./sideBars/PanelLeft";
import PanelRight from "./sideBars/PanelRight";

export default function Layout() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden scrollbar-hide">
      <Outlet />
    </div>
  );
}
