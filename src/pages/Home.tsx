import PanelLeft from "../components/sideBars/PanelLeft";
import PanelRight from "../components/sideBars/PanelRight";
import { Outlet, Route, Router, Routes } from "react-router-dom";
import Layout from "../components/home/Layout";

export default function Home() {
  return (
    <div className="flex w-full h-full p-1 gap-1 overflow-hidden">
      <PanelLeft />
      <Outlet />
      <PanelRight />
    </div>
  );
}
