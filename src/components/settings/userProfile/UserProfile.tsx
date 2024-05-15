import PanelMenu from "../PanelMenu";
import { settingsMenuLinks } from "../../../lib/SettingMenus";

export default function UserProfile() {
  return <PanelMenu menu={settingsMenuLinks[0]} />;
}
