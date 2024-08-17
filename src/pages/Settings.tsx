import SidebarNav from "../components/settings/SidebarNav";
import PageTitle from "../components/PageTitle";
import menuLinks from "../lib/menu-links";
import SettingProvider from "../context/SettingsProvider";
import MainPanel from "../components/settings/MainPanel";
import MainPanelWrapper from "../components/MainPanelWrapper";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../state/topPanel/topPanelSlice";



export default function Settings() {
  const dispatch = useDispatch();
  dispatch(setPageTitle("Settings"));
  return (
    <MainPanelWrapper>
      <PageTitle menu={menuLinks[3]} />
      <div className="flex flex-grow  gap-2 overflow-hidden px-2 pb-2">
        <SettingProvider>
          <SidebarNav />
          <MainPanel />
        </SettingProvider>
      </div>
    </MainPanelWrapper>
  );
}
