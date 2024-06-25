import React from "react";
import MainPanelWrapper from "../components/MainPanelWrapper";
import PageTitle from "../components/PageTitle";
import menuLinks from "../lib/menu-links";
import { Outlet, useNavigate } from "react-router-dom";
import PageTitleComponent from "../components/shareLinks/PageTitleComponent";
import FooterController from "../components/shareLinks/FooterController";

export default function ShareLinks() {
  return (
      <MainPanelWrapper>
        <PageTitle menu={menuLinks[6]}  component={PageTitleComponent}  />
        <Outlet />
        <FooterController />
      </MainPanelWrapper>
  );
}
