import React, { useState, Dispatch, useContext } from "react";
import SearchBar from "../SearchBar";
import SelectorMenu from "../menus/SelectorMenu";
import { useNavigate } from "react-router-dom";
import { networkMenu } from "../../lib/NetworkMenu";
import FeederBtn from "../FeederBtn";
import { BsUiChecksGrid } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { setType, setView } from "../../state/networks/networksSlice";


interface FeedMenuProps {
  query: string;
  setQuery: Dispatch<React.SetStateAction<string>>;
}

export default function FeedMenu({ query, setQuery }: FeedMenuProps) {
  const { type, view} = useSelector((state: RootState) => state.networks);
  const dispatch = useDispatch();
  

  function handelSetType(type: "groups" | "graphs" | "relations" | "none") {
    dispatch(setType(type));
  }
  function handelSetView(view: "grid" | "list") {
    dispatch(setView(view));
  }

  const [showViewSelector, setShowViewSelector] = useState<string>("");
  const [showTypeSelector, setShowTypeSelector] = useState<string>("");

  const mainBtnClass =
    "p-2 px-2 flex items-center justify-center text-xs bg-gray-300 h-10 rounded-xl min-w-24 max-w-24 uppercase hover:bg-gray-600 text-xs text-black hover:text-white";

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
        <FeederBtn
          onClick={() => handelNavigate(networkMenu[0]?.path)}
          title={networkMenu[0]?.name}
        />
        <div className="flex relative z-10">
          <FeederBtn onClick={() => handelViewSelector()} title="View" />
          {showViewSelector && (
            <SelectorMenu
              setSelected={handelSetView}
              setShow={setShowViewSelector}
              selection={["card", "list"]}
            />
          )}
        </div>
        <div className="flex relative z-10">
          {showTypeSelector && (
            <SelectorMenu
              setSelected={handelSetType}
              setShow={setShowTypeSelector}
              selection={["all", "graphs", "groups"]}
            />
          )}
        </div>
        {view === "list" && <BsUiChecksGrid className="text-2xl" />}
      </div>
      <SearchBar query={query} setQuery={setQuery} />
    </div>
  );
}
