import menuLinks from "../lib/menu-links";
import PageTitle from "../components/PageTitle";
import MainPanel from "../components/membermanagement/MainPanel";
import FeedMenu from "../components/membermanagement/FeedMenu";
import { Outlet } from "react-router-dom";
import NetworksProvider from "../context/NetworksProvider";
import MainPanelWrapper from "../components/MainPanelWrapper";
export default function MemberManagement() {
  return (
    <NetworksProvider>
      <MainPanelWrapper>
        <PageTitle menu={menuLinks[2]} />
        <Outlet />
      </MainPanelWrapper>
    </NetworksProvider>
  );
}
