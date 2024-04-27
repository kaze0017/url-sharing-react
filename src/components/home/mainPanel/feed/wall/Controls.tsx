import React from "react";
import Search from "./Search";
import Actions from "./Actions";


interface ControlsProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}


export default function Controls ({ query, setQuery }: ControlsProps) {



  return (
    <div className="w-full flex align-center justify-between">
      <Actions />
      <div className="flex grow"></div>
      <Search query={query} setQuery={setQuery} />
    </div>
  );
}
