import { Outlet } from "react-router-dom";
import PanelLeft from "../sideBars/PanelLeft";
import PanelRight from "../sideBars/PanelRight";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export default function Layout() {
  // const { auth } = useContext(AuthContext);
  // console.log("hi");
  const { toggleRightPanel } = useSelector(
    (state: RootState) => state.rightPanel
  );
  const { toggled: toggledLeftPanel } = useSelector((state: RootState) => state.leftPanel);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden scrollbar-hide">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `${toggledLeftPanel ? "80px" : "300px"} 1fr ${
            toggleRightPanel ? "80px" : "300px"
          }`,
          height: "100vh",
        }}
      >
        <Box>
          {/* <PanelLeft /> */}
        </Box>
        <Box>{/* <Outlet /> */}</Box>
        <Box>{/* <PanelRight /> */}</Box>
      </Box>
    </div>
  );
}
