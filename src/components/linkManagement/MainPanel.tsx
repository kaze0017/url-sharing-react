"use client";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { RiShareForwardLine } from "react-icons/ri";
import { PiChartLineUp } from "react-icons/pi";
import { TfiTag } from "react-icons/tfi";
import SelectorMenu from "../menus/SelectorMenu";
import SearchBar from "../SearchBar";
import Table from "./table/Table";
import FadeInOut from "../login/FadeInOut";
import { Link } from "react-router-dom";
import { SharedLinkType } from "../../lib/interfaces";
import CardSharedSm from "../cards/CardSharedSm";
import CardSharedMd from "../cards/CardSharedMd";
import CardSharedLg from "../cards/CardSharedLg";
import MainPanelWrapper from "../MainPanelWrapper";
import { getSharedLinks } from "../../api/axios";

import GrabScroll from "../GrabScroll";
import FeederBtn from "../FeederBtn";

export default function MainPanel() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";

  const [searchQuery, setSearchQuery] = useState<string>("");
  const timeSensitiveSelection = [
    "all",
    "schedules",
    "expiresSoon",
    "comeSoon",
  ];
  const linkClassSelection = ["all", "link", "category"];
  const viewSelection = ["small", "medium", "large", "details"];

  const linkTypeSelection = [
    "all",
    "article",
    "video",
    "podcast",
    "image",
    "other",
  ];

  const [linkClass, setLinkClass] = useState<string>("all");
  const [linkType, setLinkType] = useState<string>("all");
  const [timeSensitive, setTimeSensitive] = useState<string>("all");
  const [viewSize, setViewSize] = useState<string>("details");

  const [sharedLinks, setSharedLinks] = useState<SharedLinkType[]>([]);

  const [showSelector, setShowSelector] = useState<string>("");
  const [showFilter, setShowFilter] = useState(false);
  // const [displayStyle, setDisplayStyle] = useState<"grid" | "list">("list");

  const [sharedLinksToDisplay, setSharedLinksToDisplay] = useState<
    SharedLinkType[]
  >([]);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = event.target.value;
    const filteredLinks = sharedLinks.filter((sharedLink) =>
      sharedLink.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSharedLinks(filteredLinks);
  }

  useEffect(() => {
    searchQuery === ""
      ? setSharedLinksToDisplay(sharedLinks)
      : setSharedLinksToDisplay(
          sharedLinks.filter((sharedLink) =>
            sharedLink.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
  }, [searchQuery]);

  useEffect(() => {
    getSharedLinks(token).then((response) => {
      setSharedLinks(response);
      setSharedLinksToDisplay(response);
    });
  }, []);

  const mainWrapperClass =
    "h-full flex flex-col gap-1 panel-light overflow-hidden";

  const feedWrapperClass =
    "relative h-full panel-light flex flex-col grow w-full justify-start overflow-hidden p-x-2";

  const displayWrapperClass = "flex flex-col overflow-y-auto";

  const nodes = sharedLinks.map((sharedLink) => sharedLink);

  const [selectedLinks, setSelectedLinks] = useState<SharedLinkType[]>([]);

  const [columns, setColumns] = useState(getColumns());

  const toggleColumnDisplay = (columnId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? { ...column, display: !column.display }
          : column
      )
    );
  };

  const btnConst = "uppercase p-2 text-2xs rounded-lg";
  // const mainBtnClass = `${btnConst} bg-gray-200 text-gray-800`;
  const selectedBtnClass = `${btnConst} bg-indigo-500 text-white`;

  useEffect(() => {
    const filteredLinks = sharedLinks.filter((link) => {
      // Filter based on linkClass
      if (linkClass !== "all" && link.class_type !== linkClass) {
        return false;
      }
      // Filter based on linkType
      if (linkType !== "all" && link.class_type !== linkType) {
        return false;
      }
      // Filter based on timeSensitive

      return true; // Include all links that pass the filters
    });

    setSharedLinksToDisplay(filteredLinks);
  }, [linkClass, linkType, timeSensitive]);

  const mainBtnClass =
    "p-2 px-2 flex items-center justify-center text-xs bg-gray-300 h-10 rounded-xl min-w-24 max-w-24 uppercase hover:bg-gray-600 text-xs text-black hover:text-white";

  return (
    <MainPanelWrapper>
      {/* <div className={feedWrapperClass}> */}
      {selectedLinks.length === 0 && (
        <div className="flex w-full items-center uppercase p-4 gap-4 ">
          <div className="left flex gap-2 z-20">
            {/* Create Link Menu */}

            <Link to={"/linkmanagement/createlink"} className={mainBtnClass}>
              Create a link
            </Link>
            {/* View Menu */}

            <div className="relative">
              <FeederBtn
                title="View"
                onClick={() => setShowSelector("viewSize")}
              />
              <FadeInOut show={showSelector === "viewSize"} duration={500}>
                <SelectorMenu
                  selection={viewSelection}
                  setSelected={setViewSize}
                  setShow={setShowSelector}
                />
              </FadeInOut>
            </div>

            {/* Class Menu */}

            <div className="relative">
              <FeederBtn
                title={`Class: ${linkClass}`}
                onClick={() => setShowSelector("linkClass")}
              />
              <FadeInOut show={showSelector === "linkClass"} duration={500}>
                <SelectorMenu
                  selection={linkClassSelection}
                  setSelected={setLinkClass}
                  setShow={setShowSelector}
                />
              </FadeInOut>
            </div>
            {/* Type Menu */}
            <div className="relative">
              <FeederBtn
                title={`Type: ${linkType}`}
                onClick={() => setShowSelector("linkType")}
              />
              <FadeInOut show={showSelector === "linkType"} duration={500}>
                <SelectorMenu
                  selection={linkTypeSelection}
                  setSelected={setLinkType}
                  setShow={setShowSelector}
                />
              </FadeInOut>
            </div>

            <div className="relative">
              <FeederBtn
                title={`Time: ${timeSensitive}`}
                onClick={() => setShowSelector("timeSensitive")}
              />
              <FadeInOut show={showSelector === "timeSensitive"} duration={500}>
                <SelectorMenu
                  selection={timeSensitiveSelection}
                  setSelected={setTimeSensitive}
                  setShow={setShowSelector}
                />
              </FadeInOut>
            </div>

            {viewSize === "details" && (
              // <button
              //   className={mainBtnClass}
              //   onClick={() => {
              //     setShowFilter(true);
              //     setShowSelector("");
              //   }}
              // >
              //   Columns
              // </button>
              <FeederBtn
                title="Columns"
                onClick={() => {
                  setShowFilter(true);
                  setShowSelector("");
                }}
              />
            )}
          </div>

          <div className="uppercase flex-grow">
            <SearchBar query={searchQuery} setQuery={setSearchQuery} />
          </div>
        </div>
      )}
      {selectedLinks.length !== 0 && (
        <div className="left flex gap-2 z-20 p-4">
          <button className={mainBtnClass}>Move to a category</button>
          <button className={mainBtnClass}>Share</button>
          <button className={mainBtnClass}>Move to trash</button>
        </div>
      )}
      {viewSize === "details" && (
        <Table
          sharedLinks={sharedLinksToDisplay}
          columns={columns}
          setSelectedLinks={setSelectedLinks}
          selectedLinks={selectedLinks}
        />
      )}
      {viewSize === "small" && (
        <GrabScroll
          Component={CardSharedSm}
          sharedLinks={sharedLinksToDisplay}
          width={320}
        />
      )}
      {viewSize === "medium" && (
        <GrabScroll
          Component={CardSharedMd}
          sharedLinks={sharedLinksToDisplay}
          width={320}
        />
      )}
      {viewSize === "large" && (
        <GrabScroll
          Component={CardSharedLg}
          sharedLinks={sharedLinksToDisplay}
          width={600}
        />
      )}

      <FadeInOut show={showFilter} duration={1000}>
        <div className="z-20	 p-5 uppercase  absolute h-full	w-full backdrop-blur-lg bg-white/20  top-0 left-1/2  -translate-x-1/2 flex flex-col gap-2 items-center justify-center gap-2 flex-grow overflow-hidden">
          <div className="flex flex-wrap gap-4 shadow-xl bg-white p-8 w-4/5 mx-auto rounded-2xl">
            {columns.map((column, index) => (
              <div
                className="text-xs w-32 overflow-hidden flex gap-2 p-1 items-center"
                key={index}
              >
                <input
                  className="rounded w-5 h-5"
                  id={column.id}
                  type="checkbox"
                  value={column.id}
                  checked={column.id === "NAME" ? true : column.display}
                  disabled={column.id === "NAME"}
                  onChange={() => toggleColumnDisplay(column.id)}
                  style={{
                    cursor: column.id === "NAME" ? "not-allowed" : "pointer",
                  }}
                />
                <label className="text-xs" htmlFor={column.id}>
                  {column.title}
                </label>
              </div>
            ))}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={() => setShowFilter(false)}
          >
            Done
          </button>
        </div>
      </FadeInOut>
      {/* </div> */}
    </MainPanelWrapper>
  );
}

function getColumns() {
  return [
    {
      id: "THUMBNAIL",
      title: "thumbnail",
      icon: "",
      display: true,
      width: 0,
      grow: 1,
    },
    {
      id: "NAME",
      title: "name",
      icon: "",
      display: true,
      width: 0,
      grow: 2,
    },
    {
      id: "OWNER",
      title: "owner",
      icon: "",
      display: true,
      width: 55,
      grow: 0,
    },
    {
      id: "SUGGESTEDBY",
      title: "suggested by",
      icon: "",
      display: true,
      width: 55,
      grow: 0,
    },
    {
      id: "SHARED",
      title: "shared",
      icon: "",
      display: true,
      width: 55,
      grow: 0,
    },
    {
      id: "STATUS",
      title: "status",
      icon: "",
      display: true,
      width: 55,
      grow: 0,
    },
    {
      id: "AUDIENCE",
      title: "audience",
      icon: "",
      display: true,
      width: 55,
      grow: 0,
    },
    {
      id: "TYPE",
      title: "type",
      icon: "",
      display: true,
      width: 60,
      grow: 0,
    },
    {
      id: "PUBLICATIONDATE",
      title: "publication date",
      icon: "",
      display: true,
      width: 60,
      grow: 0,
    },
    {
      id: "EXPIRATIONDATE",
      title: "expiration date",
      icon: "",
      display: true,
      width: 60,
      grow: 0,
    },
    {
      id: "RANK",
      title: "rank",
      icon: <PiChartLineUp />,
      display: true,
      width: 50,
      grow: 0,
    },

    {
      id: "SHAREDCOUNT",
      title: "shared count",
      icon: <RiShareForwardLine />,
      display: true,
      width: 50,
      grow: 0,
    },
    {
      id: "SAVEDCOUNT",
      title: "saved count",
      icon: <TfiTag />,
      display: true,
      width: 50,
      grow: 0,
    },
    {
      id: "QRCODE",
      title: "qr code",
      icon: "",
      display: true,
      width: 50,
      grow: 0,
    },
    {
      id: "SHORTLINK",
      title: "short link",
      icon: "",
      display: true,
      width: 50,
      grow: 0,
    },
  ];
}
