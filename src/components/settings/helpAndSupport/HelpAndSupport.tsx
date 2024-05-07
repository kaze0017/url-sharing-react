import PanelMenu from "../PanelMenu";
import { settingsMenuLinks } from "../../../lib/SettingMenus";

export default function HelpAndSupport() {
  return <PanelMenu menu={settingsMenuLinks[7]} />;
}
