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
import { ThemeProvider, createTheme } from "@mui/material/styles";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import AppBar from "../components/controllers/MainAppBar";

export default function Home() {
  const { isNewUser } = useContext(AuthContext);

  const { toggleRightPanel } = useSelector(
    (state: RootState) => state.rightPanel
  );
  const { toggled: toggledLeftPanel } = useSelector(
    (state: RootState) => state.leftPanel
  );
  const { theme } = useSelector((state: RootState) => state.theme);
  const customTheme = createTheme(theme);

  return (
    // <div className="flex  w-full h-full p-1 gap-1 overflow-hidden">
    <ThemeProvider theme={customTheme}>
      <div>
        {isNewUser ? (
          <InitialProfile />
        ) : (
          // <Box
          //   sx={{
          //     display: "grid",
          //     gridTemplateRows: "50px 1fr",
          //     height: "100vh",
          //   }}
          // >
          //   <AppBar />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `${
                toggledLeftPanel ? "90px" : "260px"
              } 1fr ${toggleRightPanel ? "90px" : "260px"}`,
              columnGap: "2px",
              width: "100vw",
              height: "100vh",
            }}
          >
            <PanelLeft />
            <Box
              sx={{
                display: "grid",
                gridTemplateRows: "1fr 35px",
                rowGap: "2px",
                width: "100%",
              }}
            >
              <Outlet />
              <ActionBtns />
            </Box>

            <PanelRight />
          </Box>
          // </Box>
        )}
      </div>
    </ThemeProvider>
  );
}
