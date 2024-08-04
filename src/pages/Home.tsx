import PanelLeft from "../components/sideBars/PanelLeft";
import PanelRight from "../components/sideBars/PanelRight";
import { Outlet } from "react-router-dom";
import ActionBtns from "../components/home/mainPanel/ActionBtns";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import InitialProfile from "./InitialProfile";
import PanelTop from "../components/sideBars/PanelTop";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Home() {
  const { isNewUser } = useContext(AuthContext);

  const { toggleRightPanel } = useSelector(
    (state: RootState) => state.rightPanel
  );
  const { toggled: toggledLeftPanel } = useSelector(
    (state: RootState) => state.leftPanel
  );

  return (
    // <div className="flex  w-full h-full p-1 gap-1 overflow-hidden">
    <div>
      {isNewUser ? (
        <InitialProfile />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `${toggledLeftPanel ? "90px" : "260px"} 1fr ${
              toggleRightPanel ? "90px" : "260px"
            }`,
            columnGap: "2px",
            height: "100vh",
            width: "100vw",
          }}
        >
          <PanelLeft />
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "1fr 35px",
              rowGap: "2px",
              height: "100vh",
              width: "100%",

            }}
          >
            <Outlet />
            <ActionBtns />
          </Box>

          <PanelRight />
        </Box>
      )}
    </div>
  );
}
