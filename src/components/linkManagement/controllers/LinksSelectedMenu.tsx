import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { deleteSelectedContents } from "../../../state/linkManagement/linkManagementSlice";
import { AppDispatch } from "../../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { mapSelectedContentsToSelectedLinksIds } from "../../../state/linkManagement/linkSlice";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Search from "../../home/mainPanel/feed/controllers/Search";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ButtonGroup from "@mui/material/ButtonGroup";
import Share from "./controllerBtns/Share";
import Delete from "./controllerBtns/Delete";
import MoveToCategory from "./controllerBtns/MoveToCategory";

export default function LinksSelectedMenu() {
  const { selectedContents } = useSelector(
    (state: RootState) => state.linkManagement
  );

  const [isCategorySelected, setIsCategorySelected] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }} onClick={handleDrawerToggle}>
        <MenuOpenIcon color="primary" fontSize="large" />
      </Typography>
      <Divider />
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="Vertical button group"
        fullWidth
        variant="text"
      >
        <MoveToCategory />
        <Share />
        <Delete />
      </ButtonGroup>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" color="transparent" position="relative">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block", flexGrow: 1 } }}>
            <div className="flex">
              <MoveToCategory />
              <Share />
              <Delete />
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}
