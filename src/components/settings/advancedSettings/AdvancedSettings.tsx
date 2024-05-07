import PanelMenu from "../PanelMenu";
import { settingsMenuLinks } from "../../../lib/SettingMenus";

export default function AdvancedSettings() {
  return <PanelMenu menu={settingsMenuLinks[6]} />;
}
