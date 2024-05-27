import React, { useContext } from "react";
import { RelationsContext } from "../../../context/RelationsProvider";
import SearchBar from "../../SearchBar";
import { BsUiChecksGrid } from "react-icons/bs";

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


  return (
    <div className="flex gap-2">
      <div className="flex gap-2 uppercase">
        <button className="uppercase text-sm px-2 w-16">invite</button>
        <button className="uppercase text-sm px-2 w-16">filter</button>
        <button className="uppercase text-sm px-2 w-16" onClick={changeView}>
          {view}
        </button>
        {view === "table" && (
          <button
            className="uppercase text-sm px-2 w-16"
            onClick={handelShowFilter}
          >
            <BsUiChecksGrid />
          </button>
        )}
      </div>
      <SearchBar query={query} setQuery={setQuery} />
    </div>
  );
}
