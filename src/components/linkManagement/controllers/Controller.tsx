import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropDownBtn from "./DropDownBtn";
import SingleBtn from "./SingleBtn";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../state/store";
import LinksSelectedMenu from "./LinksSelectedMenu";

import Create from "./controllerBtns/Create";
import SearchBar from "../../SearchBar";
import { setQuery } from "../../../state/linkManagement/linkManagementSlice";
import { TextField } from "@mui/material";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SelectClass from "./controllerBtns/SelectClass";
import FieldsSelector from "./controllerBtns/FieldsSelector";
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

export default function Controller() {
  const { selectedContents } = useSelector(
    (state: RootState) => state.linkManagement
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { query } = useSelector((state: RootState) => state.linkManagement);

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
        <Create />
        <SelectClass />
        <FieldsSelector />
      </ButtonGroup>
    </Box>
  );

  return (
    <div className="flex w-full items-center uppercase p-4 gap-4">
      {selectedContents.length === 0 ? (
        <>
          {/* <Create />
          <SelectClass />
          <FieldsSelector />
          <div className="flex flex-grow"></div>
          <div className="max-w-md flex-grow">
            <SearchBar query={query} setQuery={handleSetQuery} />
          </div> */}
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
                  <Create />
                  <SelectClass />
                  <FieldsSelector />
                </div>
              </Box>
              <Search
                query={query}
                setQuery={(query: any) => dispatch(setQuery(query))}
              />
            </Toolbar>
          </AppBar>
          <nav>
            <Drawer
              // container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
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
      ) : (
        <LinksSelectedMenu />
      )}
    </div>
  );
}

{
  /* <div className="left flex gap-2 z-20"> */
}
{
  /* Create Link Menu */
}
{
  /* <div className="w-20 h-8 flex items-center justify-center relative text-xs uppercase">
        <div
          className="text-lg select-none w-full h-full hover:bg-gray-300 flex items-center justify-center border border-gray-900 cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          +
        </div>
        <div
          className={`absolute top-full right-0 w-20 flex flex-col items-center bg-white border border-gray-900 mt-1 transition-all-300 ${
            collapsed ? "hidden" : "block"
          }`}
        >
          <div
            className="select-none	w-full text-center cursor-pointer hover:bg-slate-300"
            onClick={handelCreateLink}
          >
            Link
          </div>
          <div
            className="w-full text-center select-none	 cursor-pointer hover:bg-slate-300"
            onClick={handelCreateGroup}
          >
            Category
          </div>
        </div>
      </div> */
}

{
  /* <Link to={"/linkmanagement/createlink"} className={mainBtnClass}>
          Create a link
        </Link> */
}
{
  /* View Menu */
}
{
  /* <div className="relative">
          <FeederBtn
            title="View"
            onClick={() => handelSetShowSelector("viewSize")}
          />
          <FadeInOut show={showSelector === "viewSize"} duration={500}>
            <SelectorMenu
              selection={viewSelection}
              setSelected={handelSetViewSize}
              setShow={handelSetShowSelector}
            />
          </FadeInOut>
        </div> */
}
{
  /* Class Menu */
}
{
  /* <div className="relative"> */
}
{
  /* <FeederBtn
            title={`Class: ${linkClass}`}
            onClick={() => handelSetShowSelector("linkClass")}
          />
          <FadeInOut show={showSelector === "linkClass"} duration={500}>
            <SelectorMenu
              selection={linkClassSelection}
              setSelected={handelSetLinkClass}
              setShow={handelSetShowSelector}
            />
          </FadeInOut>
        </div> */
}
{
  /* Type Menu */
}
{
  /* <div className="relative">
          <FeederBtn
            title={`Type: ${linkType}`}
            onClick={() => handelSetShowSelector("linkType")}
          />
          <FadeInOut show={showSelector === "linkType"} duration={500}>
            <SelectorMenu
              selection={linkTypeSelection}
              setSelected={handelSetLinkType}
              setShow={handelSetShowSelector}
            />
          </FadeInOut>
        </div> */
}
{
  /* 
        <div className="relative">
          <FeederBtn
            title={`Time: ${timeSensitive}`}
            onClick={() => handelSetShowSelector("timeSensitive")}
          />
          <FadeInOut show={showSelector === "timeSensitive"} duration={500}>
            <SelectorMenu
              selection={timeSensitiveSelection}
              setSelected={handelSetTimeSensitive}
              setShow={handelSetShowSelector}
            />
          </FadeInOut>
        </div> */
}
{
  /* 
        {viewSize === "details" && (
          <FeederBtn
            title="Columns"
            onClick={() => {
              handelSetShowFilter(!showFilter);
              // setShowSelector("");
            }}
          />
        )} */
}
{
  /* </div> */
}
{
  /* <div className="uppercase flex-grow">
        <SearchBar query={query} setQuery={handelSetQuery} />
      </div> */
}
