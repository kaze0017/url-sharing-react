import PanelMenu from "../PanelMenu";
import { settingsMenuLinks } from "../../../lib/SettingMenus";

export default function InAppPurchase() {
  return <PanelMenu menu={settingsMenuLinks[10]} />;
}
