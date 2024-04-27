import { FiLink } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import menuLinks from "../lib/menu-links";
import PageTitleMenu from "../components/linkManagement/PageTitleMenu";

import PageTitle from "../components/PageTitle";
import MainPanel from "../components/linkManagement/MainPanel";
import { Outlet } from "react-router-dom";
export default function LinkManagement() {
  const wrapperClass =
    "grow h-full transition-500 overflow-hidden panel-light p-1 flex flex-col";
  const headerWrapperClass =
    "p-2 mb-4 border-b border-indigo-600 flex w-full uppercase";
  return (
    <div className={wrapperClass}>
      <PageTitle menu={menuLinks[1]} component={PageTitleMenu} />
      <div className="flex flex-col flex-grow overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
