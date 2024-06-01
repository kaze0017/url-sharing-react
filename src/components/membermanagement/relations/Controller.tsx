import React, { useContext } from "react";
import { RelationsContext } from "../../../context/RelationsProvider";
import SearchBar from "../../SearchBar";
import { BsUiChecksGrid } from "react-icons/bs";
import { FcInvite } from "react-icons/fc";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineTable } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { CgUserList } from "react-icons/cg";

export default function Controller() {
  const { view, setView, setShowFilter, showFilter } =
    useContext(RelationsContext);
  const [query, setQuery] = React.useState("");

  function changeView() {
    if (view === "small") {
      setView("medium");
    } else if (view === "medium") {
      setView("table");
    } else {
      setView("small");
    }
  }

  function handelShowFilter() {
    if (setShowFilter) {
      setShowFilter(!showFilter);
    }
  }
  const btnClass = "cursor-pointer text-2xl text-gray-800";

  return (
    <div className="flex gap-4">
      <div className="flex gap-4">
        <button className={btnClass} title="Invite a new member">
          <FcInvite />
        </button>
        <button className={btnClass} title="Filter">
          <AiOutlineFilter className="text-2xl" />
        </button>
        <button className={btnClass} onClick={changeView} title={view.toUpperCase()}>
          {view.toLocaleLowerCase() === "table" && <AiOutlineTable />}
          {view.toLocaleLowerCase() === "small" && <CgUserList />}
          {view.toLocaleLowerCase() === "medium" && <FaRegAddressCard />}
        </button>
        {view === "table" && (
          <button className={btnClass} onClick={handelShowFilter} title="Select Columns">
            <BsUiChecksGrid />
          </button>
        )}
      </div>
      <SearchBar query={query} setQuery={setQuery} />
    </div>
  );
}
