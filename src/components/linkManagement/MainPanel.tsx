import { useEffect, useContext } from "react";
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
import LinksSelectedMenu from "./controllers/LinksSelectedMenu";
import { UserProfileType } from "../../lib/interfaces";
import { createColumnHelper } from "@tanstack/react-table";
import GrabScroll from "../GrabScroll";
import FeederBtn from "../FeederBtn";
import ProfilePictureSm from "../profilePictures/ProfilePictureSm";
import Type from "../trash/body/Type";
import PublicationDate from "../trash/body/PublicationDate";
import ExpirationDate from "../trash/body/ExpirationDate";
import Count from "../trash/body/Count";
import QrCode from "../trash/body/QrCode";
import ShortLink from "../trash/body/ShortLink";
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

  function handelSetSelectedContents(links: ContentType[]) {
    storeDispatch(setSelectedContents(links));
  }
  function handelSetQuery(query: string) {
    storeDispatch(setQuery(query));
  }
  function handelSetClass(linkClass: "all" | "link" | "category") {
    storeDispatch(setClass(linkClass));
  }
  function handelSetType(
    type: "all" | "article" | "video" | "podcast" | "image" | "other"
  ) {
    storeDispatch(setType(type));
  }
  function handelSetTimeSensitive(
    timeSensitive: "all" | "scheduled" | "expiresSoon" | "comeSoon"
  ) {
    storeDispatch(setTimeSensitive(timeSensitive));
  }
  function handelSetViewSize(
    viewSize: "small" | "medium" | "large" | "details"
  ) {
    storeDispatch(setViewSize(viewSize));
  }
  function handelSetShowSelector(selector: string) {
    storeDispatch(setShowSelector(selector));
  }
  function handelSetShowFilter(show: boolean) {
    storeDispatch(setShowFilter(show));
  }

  useEffect(() => {
    storeDispatch(fetchUserContent());
    console.log("getSharedToUserAndUserLinks", contentsToDisplay);

  }, [fetchUserContent]);

  console.log("render");

  const mainBtnClass =
    "p-2 px-2 flex items-center justify-center text-xs bg-gray-300 h-10 rounded-xl min-w-24 max-w-24 uppercase hover:bg-gray-600 text-xs text-black hover:text-white";

  return (
    <MainPanelWrapper>
      {/* <div className={feedWrapperClass}> */}
      {selectedContents.length === 0 && <Controller />}
      {selectedContents.length !== 0 && <LinksSelectedMenu />}
      {/* {viewSize === "details" && ( */}
        <Table
          contentsToDisplay={contentsToDisplay}
          columns={createColumns()}
          setSelectedContents={handelSetSelectedContents}
          selectedContents={selectedContents}
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

function createColumns() {
  // const navigate = useNavigate();
  function navigateToEditLinkPage(id: any) {
    // navigate(`/editLink/${id}`);
  }
  interface ExpandedSharedLinkType extends SharedLinkType {
    select: boolean;
    status: boolean;
  }
  const columnHelper = createColumnHelper<ExpandedSharedLinkType>();

  let tableColumns = [
    columnHelper.accessor("select", {
      header: ({ table }) => (
        <div className="p-1">
          <input
            name="select-all"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            type="checkbox"
          />
        </div>
      ),
      enableColumnFilter: false,

      cell: ({ row }) => (
        <div className="p-1">
          <input
            name="select-row"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            type="checkbox"
          />
        </div>
      ),
    }),
    columnHelper.accessor("class_type", {
      header: "Class",
      cell: (info) => <h1>{info.row.original.class_type}</h1>,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("thumbnail", {
      header: "Thumbnail",
      cell: (info) => (
        <Link to={`/sharedLink/${info.row.original.id}`}>
          <img
            className="rounded-lg h-16 aspect-video mx-auto"
            src={info.getValue()}
            alt="thumbnail"
            onClick={() => navigateToEditLinkPage(info.row.original.id)}
          />
        </Link>
      ),
      enableColumnFilter: false,
    }),
    columnHelper.accessor("title", {
      header: "Title",
      enableColumnFilter: false,
      cell: (info) => (
        <Link to={`/sharedLink/${info.row.original.id}`}>
          <p className="p-1 text-xs">{info.getValue()}</p>
        </Link>
      ),

      // cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("contentDescription", {
      header: "Description",
      enableColumnFilter: false,
      cell: (info) => (
        <p className="p-1 text-3xs">{info.getValue() || "---"}</p>
      ),
    }),

    columnHelper.accessor("owner", {
      header: "Owner",
      enableColumnFilter: false,

      cell: (info) => (
        <>
          <div className="flex flex-col items-center justify-center">
            <ProfilePictureSm person={info.getValue()} />
            <p className="text-3xs">{info.getValue()?.first_name}</p>
            <p className="text-3xs">{info.getValue()?.last_name}</p>
          </div>
        </>
      ),
    }),
    columnHelper.accessor("suggestedby", {
      header: "Suggested By",
      enableColumnFilter: false,

      cell: (info) => (
        <>
          {info.getValue() !== (null || undefined) ? (
            <div className="flex flex-col items-center justify-center">
              <ProfilePictureSm person={info.getValue() as UserProfileType} />
              <p className="text-3xs">{info.getValue()?.first_name}</p>
              <p className="text-3xs">{info.getValue()?.last_name}</p>
            </div>
          ) : (
            <p>NA</p>
          )}
        </>
      ),
    }),
    columnHelper.accessor("sharedby", {
      header: "Shared By",
      enableColumnFilter: false,

      cell: (info) => (
        <>
          {info.getValue() !== (null || undefined) ? (
            <div className="flex flex-col items-center justify-center">
              <ProfilePictureSm person={info.getValue() as UserProfileType} />
              <p className="text-3xs">{info.getValue()?.first_name}</p>
              <p className="text-3xs">{info.getValue()?.last_name}</p>
            </div>
          ) : (
            <p>NA</p>
          )}
        </>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      enableColumnFilter: false,

      cell: (info) => (
        <p className="text-3xs">
          {info.getValue() === true ? "Active" : "Inactive"}
        </p>
      ),
    }),
    columnHelper.accessor("audience", {
      header: "Audience",
      enableColumnFilter: false,

      cell: (info) => (
        <p className="text-3xs">
          {info.getValue() === true ? "Public" : "Private"}
        </p>
      ),
    }),
    columnHelper.accessor("url_type", {
      header: "Type",
      enableColumnFilter: false,

      cell: (info) => <Type type={info.getValue()} />,
    }),
    columnHelper.accessor("publicationDate", {
      header: "Publication Date",
      enableColumnFilter: false,

      cell: (info) => (
        <PublicationDate publicationDate={info.getValue() || ""} />
      ),
    }),
    columnHelper.accessor("expirationDate", {
      header: "Expiration Date",
      enableColumnFilter: false,

      cell: (info) => <ExpirationDate expirationDate={info.getValue() || ""} />,
    }),
    columnHelper.accessor("rankCount", {
      header: () => <PiChartLineUp />,
      enableColumnFilter: false,

      cell: (info) => <Count count={info.getValue() || 0} />,
    }),
    columnHelper.accessor("sharedCount", {
      header: () => <RiShareForwardLine />,
      enableColumnFilter: false,
      cell: (info) => <Count count={info.getValue() || 0} />,
    }),
    columnHelper.accessor("savedCount", {
      header: () => <TfiTag />,
      enableColumnFilter: false,
      cell: (info) => <Count count={info.getValue() || 0} />,
    }),
    columnHelper.accessor("qr_code", {
      header: "QR Code",
      enableColumnFilter: false,
      cell: (info) => <QrCode />,
    }),
    columnHelper.accessor("short_url", {
      header: "Short Link",
      enableColumnFilter: false,

      cell: (info) => <ShortLink />,
    }),
  ];
  return tableColumns;
}
