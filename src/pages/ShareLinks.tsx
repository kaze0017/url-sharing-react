import React from "react";
import MainPanelWrapper from "../components/MainPanelWrapper";
import PageTitle from "../components/PageTitle";
import menuLinks from "../lib/menu-links";
import { Outlet, useNavigate } from "react-router-dom";
import { ShareWithGroupsProvider } from "../context/ShareWithGroupsProvider";
import PageTitleComponent from "../components/shareLinks/PageTitleComponent";

export default function ShareLinks() {
  return (
    <ShareWithGroupsProvider>
      <MainPanelWrapper>
        <PageTitle menu={menuLinks[6]}  component={PageTitleComponent}  />
        <Outlet />
      </MainPanelWrapper>
    </ShareWithGroupsProvider>
  );
}
