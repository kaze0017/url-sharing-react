import PanelLeft from "../components/sideBars/PanelLeft";
import PanelRight from "../components/sideBars/PanelRight";
import { Outlet } from "react-router-dom";
import ActionBtns from "../components/home/mainPanel/ActionBtns";
import ModeProvider from "../context/ModeProvider";

export default function Home() {
  return (
    <div className="flex w-full h-full p-1 gap-1 overflow-hidden">
      <PanelLeft />
      <ModeProvider>
        <div className="flex flex-col w-full h-full gap-1">
          <Outlet />
          <ActionBtns />
        </div>
      </ModeProvider>

      <PanelRight />
    </div>
  );
}
