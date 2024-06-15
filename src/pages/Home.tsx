import PanelLeft from "../components/sideBars/PanelLeft";
import PanelRight from "../components/sideBars/PanelRight";
import { Outlet } from "react-router-dom";
import ActionBtns from "../components/home/mainPanel/ActionBtns";
import HomeProvider from "../context/HomeProvider";
import { LinkManagementProvider } from "../context/LinkManagementProvider";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import InitialProfile from "./InitialProfile";

export default function Home() {
  const { auth, isNewUser } = useContext(AuthContext);

  return (
    // <UserProfileProvider>
    <div className="flex w-full h-full p-1 gap-1 overflow-hidden">
      {isNewUser ? (
        <InitialProfile />
      ) : (
        <>
          <PanelLeft />
          <HomeProvider>
            <LinkManagementProvider>
              <div className="flex flex-col w-full h-full gap-1">
                <Outlet />
                <ActionBtns />
              </div>
            </LinkManagementProvider>
          </HomeProvider>
          <PanelRight />
        </>
      )}
    </div>
    // </UserProfileProvider>
  );
}
