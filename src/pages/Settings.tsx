import SidebarNav from "../components/settings/SidebarNav";
import PageTitle from "../components/PageTitle";
import menuLinks from "../lib/menu-links";
import SettingProvider from "../context/SettingsProvider";
import MainPanel from "../components/settings/MainPanel";
export default function Settings() {
  return (
    <div className="panel-light w-full h-full overflow-hidden flex flex-col">
      <PageTitle menu={menuLinks[3]} />
      <div className="flex flex-grow  gap-2 overflow-hidden px-2 pb-2">
        <SettingProvider>
          <SidebarNav />
          <MainPanel />
        </SettingProvider>
      </div>
    </div>
  );
}
