import menuLinks from "../lib/menu-links";
import PageTitle from "../components/PageTitle";
import { Outlet } from "react-router-dom";
import MainPanelWrapper from "../components/MainPanelWrapper";
import { ChartDragAndDropProvider } from "../context/ChartDragAndDropProvider";
import PageTitleComponent from "../components/membermanagement/PageTitleComponent";
import { useDispatch } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { setPageTitle } from "../state/topPanel/topPanelSlice";

export default function MemberManagement() {
  const dispatch = useDispatch();
  dispatch(setPageTitle("Networks"));
  return (
    <MainPanelWrapper>
      <ChartDragAndDropProvider>
        <PageTitle menu={menuLinks[2]} component={PageTitleComponent} />
        <DndProvider backend={HTML5Backend}>
          <Outlet />
        </DndProvider>
      </ChartDragAndDropProvider>
    </MainPanelWrapper>
  );
}
