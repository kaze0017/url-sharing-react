import MainPanelWrapper from "../components/MainPanelWrapper";
import PageTitle from "../components/PageTitle";
import menuLinks from "../lib/menu-links";
import { Outlet } from "react-router-dom";
import PageTitleComponent from "../components/shareLinks/PageTitleComponent";
import FooterController from "../components/shareLinks/FooterController";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../state/topPanel/topPanelSlice";

export default function ShareLinks() {
  const dispatch = useDispatch();
  dispatch(setPageTitle("Share Links"));
  return (
      <MainPanelWrapper>
        <PageTitle menu={menuLinks[6]}  component={PageTitleComponent}  />
        <Outlet />
        <FooterController />
      </MainPanelWrapper>
  );
}
