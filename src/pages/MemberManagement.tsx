import menuLinks from "../lib/menu-links";
import PageTitle from "../components/PageTitle";
import MainPanel from "../components/membermanagement/MainPanel";
export default function MemberManagement() {
  return (
    <div className="flex flex-col panel-light w-full  h-full overflow-hidden">
      <PageTitle menu={menuLinks[2]} />
      <MainPanel />
    </div>
  );
}
