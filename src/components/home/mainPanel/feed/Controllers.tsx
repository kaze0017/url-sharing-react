import React from "react";
import Search from "./controllers/Search";
import Actions from "./controllers/Actions";
import Sort from "./controllers/Sort";

interface ControlsProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function Controllers({ query, setQuery }: ControlsProps) {
  return (
    <div className="w-full flex flex-col  align-center justify-between">
      <div className="w-full flex align-center justify-between">
        <Actions />
        <div className="flex grow"></div>
        <Search query={query} setQuery={setQuery} />
      </div>
      <Sort />
    </div>
  );
}
