import menuLinks from "../lib/menu-links";
import PageTitle from "../components/PageTitle";
import MainPanel from "../components/membermanagement/MainPanel";
import FeedMenu from "../components/membermanagement/FeedMenu";
import { Outlet } from "react-router-dom";
import NetworksProvider from "../context/NetworksProvider";
export default function MemberManagement() {
  return (
    <NetworksProvider>
      <div className="flex flex-col panel-light w-full  h-full overflow-hidden">
        <PageTitle menu={menuLinks[2]} />
        <Outlet />
      </div>
    </NetworksProvider>
  );
}
