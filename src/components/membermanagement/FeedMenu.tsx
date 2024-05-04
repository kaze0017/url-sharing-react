import React, { useState, Dispatch, useContext } from "react";
import { NetworksContext } from "../../context/NetworksProvider";
import SearchBar from "../SearchBar";
import SelectorMenu from "../menus/SelectorMenu";
import { menuType } from "../../lib/NetworkMenu";
import { useNavigate } from "react-router-dom";
import { networkMenu } from "../../lib/NetworkMenu";

interface FeedMenuProps {
  query: string;
  setQuery: Dispatch<React.SetStateAction<string>>;
}

export default function FeedMenu({ query, setQuery }: FeedMenuProps) {
  const { type, view, setType, setView } = useContext(NetworksContext);


  const [showViewSelector, setShowViewSelector] = useState<string>("");
  const [showTypeSelector, setShowTypeSelector] = useState<string>("");

  const mainBtnClass =
    "p-2 px-4 text-xs text-white bg-indigo-500 rounded-xl w-24 uppercase hover:bg-indigo-600";

  const navigate = useNavigate();
  function handelNavigate(path: string | undefined) {
    if (path) {
      navigate(path);
    }
  }

  function handelViewSelector() {
    showViewSelector ? setShowViewSelector("") : setShowViewSelector("show");
    setShowTypeSelector("");
  }

  function handelTypeSelector() {
    showTypeSelector ? setShowTypeSelector("") : setShowTypeSelector("show");
    setShowViewSelector("");
  }

  return (
    <div className="flex w-full uppercase gap-2">
      <div className="flex gap-2 ">
        <button
          onClick={() => handelNavigate(networkMenu[0]?.path)}
          className={mainBtnClass}
        >
          {networkMenu[0]?.name}
        </button>
        <div className="flex relative z-10">
          <button onClick={() => handelViewSelector()} className={mainBtnClass}>
            View
          </button>
          {showViewSelector && (
            <SelectorMenu
              setSelected={setView}
              setShow={setShowViewSelector}
              selection={["card", "list"]}
            />
          )}
        </div>
        <div className="flex relative z-10">
          <button onClick={() => handelTypeSelector()} className={mainBtnClass}>
            Type
          </button>
          {showTypeSelector && (
            <SelectorMenu
              setSelected={setType}
              setShow={setShowTypeSelector}
              selection={["all", "graphs", "groups"]}
            />
          )}
        </div>
      </div>
      <SearchBar query={query} setQuery={setQuery} />
    </div>
  );
}
