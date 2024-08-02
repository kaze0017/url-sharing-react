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

export default function Controller() {
  const { selectedContents } = useSelector(
    (state: RootState) => state.linkManagement
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { query } = useSelector((state: RootState) => state.linkManagement);

  function handleSetQuery(query: string) {
    dispatch(setQuery(query));
  }

  return (
    <div className="flex w-full items-center uppercase p-4 gap-4">
      {selectedContents.length === 0 ? (
        <>
          <Create />
          <SelectClass />
          <FieldsSelector />
          <div className="flex flex-grow"></div>
          <div className="max-w-md flex-grow">
            <SearchBar query={query} setQuery={handleSetQuery} />
          </div>
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
