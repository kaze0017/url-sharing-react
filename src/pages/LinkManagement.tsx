import menuLinks from "../lib/menu-links";
import PageTitleMenu from "../components/linkManagement/PageTitleMenu";
import PageTitle from "../components/PageTitle";
import { Outlet } from "react-router-dom";
import MainPanelWrapper from "../components/MainPanelWrapper";
import { useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { setPageTitle } from "../state/topPanel/topPanelSlice";

export default function LinkManagement() {

const dispatch = useDispatch();

dispatch(setPageTitle("Link Management"));

  return (
    <MainPanelWrapper>
      <PageTitle menu={menuLinks[1]} component={PageTitleMenu} />
      <div className="flex flex-col flex-grow overflow-hidden">
        <Outlet />
      </div>
    </MainPanelWrapper>
  );
}
