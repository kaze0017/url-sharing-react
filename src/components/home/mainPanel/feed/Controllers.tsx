import React from "react";
import Search from "./controllers/Search";
import Actions from "./controllers/Actions";
import Sort from "./controllers/Sort";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { setQuery } from "../../../../state/home/homeSlice";

export default function Controllers() {
  const query = useSelector((state: RootState) => state.home.query);
  const dispatch = useDispatch();
  const handleSetQuery = (newQuery: string) => {
    dispatch(setQuery(newQuery));
  };
  return (
    <div className="w-full flex flex-col  align-center justify-between">
      <div className="w-full flex align-center justify-between">
        <Actions />
        {/* <div className="flex grow"></div> */}
        {/* <Search query={query} setQuery={handleSetQuery} /> */}
      </div>
      <Sort />
    </div>
  );
}
