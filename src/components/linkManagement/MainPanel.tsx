import { useEffect, useContext } from "react";
import { RiShareForwardLine } from "react-icons/ri";
import { PiChartLineUp } from "react-icons/pi";
import { TfiTag } from "react-icons/tfi";
import Table from "./table/Table";
import { Link } from "react-router-dom";
import { SharedLinkType } from "../../lib/interfaces";
import CardSharedSm from "../cards/CardSharedSm";
import CardSharedMd from "../cards/CardSharedMd";
import CardSharedLg from "../cards/CardSharedLg";
import MainPanelWrapper from "../MainPanelWrapper";
import LinksSelectedMenu from "./controllers/LinksSelectedMenu";
import { UserProfileType } from "../../lib/interfaces";
import { createColumnHelper } from "@tanstack/react-table";
import GrabScroll from "../GrabScroll";
import FeederBtn from "../FeederBtn";
import ProfilePictureSm from "../profilePictures/ProfilePictureSm";
import Type from "./table/body/Type";
import PublicationDate from "./table/body/PublicationDate";
import ExpirationDate from "./table/body/ExpirationDate";
import Count from "./table/body/Count";
import QrCode from "./table/body/QrCode";
import ShortLink from "./table/body/ShortLink";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {
  setClass,
  setType,
  setQuery,
  setSelectedContents,
  setViewSize,
  setTimeSensitive,
  fetchUserContent,
  setShowSelector,
  setShowFilter,
} from "../../state/linkManagement/linkManagementSlice";
import { ContentType } from "../../lib/interfaces/contentType";
import Controller from "./controllers/Controller";
import ClassIcon from "./table/body/ClassIcon";

export default function MainPanel() {
  // const { auth } = useContext(AuthContext);
  // const token = auth?.token || "";

  const {
    selectedContents,
    contentsToDisplay,
    type,
    query,
    viewSize,
    timeSensitive,
    showSelector,
    showFilter,
    contentClass,
  } = useSelector((state: RootState) => state.linkManagement);
  const storeDispatch = useDispatch<AppDispatch>();

  // const timeSensitiveSelection = [
  //   "all",
  //   "schedules",
  //   "expiresSoon",
  //   "comeSoon",
  // ];
  // const linkClassSelection = ["all", "link", "category"];
  // const viewSelection = ["small", "medium", "large", "details"];

  // const linkTypeSelection = [
  //   "all",
  //   "article",
  //   "video",
  //   "podcast",
  //   "image",
  //   "other",
  // ];

  // function handelSetSelectedContents(content: ContentType[]) {
  //   console.log("handelSetSelectedContents", content);
  //   storeDispatch(setSelectedContents(content));
  // }
  // function handelSetQuery(query: string) {
  //   storeDispatch(setQuery(query));
  // }
  // function handelSetClass(linkClass: "all" | "link" | "category") {
  //   storeDispatch(setClass(linkClass));
  // }
  // function handelSetType(
  //   type: "all" | "article" | "video" | "podcast" | "image" | "other"
  // ) {
  //   storeDispatch(setType(type));
  // }
  // function handelSetTimeSensitive(
  //   timeSensitive: "all" | "scheduled" | "expiresSoon" | "comeSoon"
  // ) {
  //   storeDispatch(setTimeSensitive(timeSensitive));
  // }
  // function handelSetViewSize(
  //   viewSize: "small" | "medium" | "large" | "details"
  // ) {
  //   storeDispatch(setViewSize(viewSize));
  // }
  // function handelSetShowSelector(selector: string) {
  //   storeDispatch(setShowSelector(selector));
  // }
  // function handelSetShowFilter(show: boolean) {
  //   storeDispatch(setShowFilter(show));
  // }

  
  console.log("render**");
  
  useEffect(() => {
    storeDispatch(fetchUserContent());
    console.log("getSharedToUserAndUserLinks", contentsToDisplay);
  }, []);

  const mainBtnClass =
    "p-2 px-2 flex items-center justify-center text-xs bg-gray-300 h-10 rounded-xl min-w-24 max-w-24 uppercase hover:bg-gray-600 text-xs text-black hover:text-white";

  return (
    <MainPanelWrapper>
      {/* <div className={feedWrapperClass}> */}
      <Controller />
      {/* {selectedContents.length !== 0 && <LinksSelectedMenu />} */}
      {/* {viewSize === "details" && ( */}
      <Table
        // columns={createColumns()}
        showFilter={showFilter}
      />
      {/* )} */}
      {/* {viewSize === "small" && (
        <GrabScroll
          Component={CardSharedSm}
          sharedLinks={linksToDisplay}
          width={320}
        />
      )} */}
      {/* {viewSize === "medium" && (
        <GrabScroll
          Component={CardSharedMd}
          sharedLinks={linksToDisplay}
          width={320}
        />
      )} */}
      {/* {viewSize === "large" && (
        <GrabScroll
          Component={CardSharedLg}
          sharedLinks={linksToDisplay}
          width={600}
        />
      )} */}
    </MainPanelWrapper>
  );
}

