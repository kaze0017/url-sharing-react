import React, {useContext} from "react";
import { RelationsContext } from "../../../context/RelationsProvider";
import SearchBar from "../../SearchBar";

export default function Controller() {
  const { view, setView } = useContext(RelationsContext);
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

  return (
    <div className="flex gap-2">
      <div className="flex gap-2 uppercase">
        <button className="uppercase text-sm px-2 w-16">invite</button>
        <button className="uppercase text-sm px-2 w-16">filter</button>
        <button className="uppercase text-sm px-2 w-16" onClick={changeView}>{view}</button>
      </div>
      <SearchBar query={query} setQuery={setQuery} />
    </div>
  );
}
