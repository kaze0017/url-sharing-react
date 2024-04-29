import React, { useState } from "react";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { FiList } from "react-icons/fi";
import { GrDocumentConfig } from "react-icons/gr";
import { FiVideo } from "react-icons/fi";
import { FiImage } from "react-icons/fi";
import ControlBtn from "./ControlBtn";
import SearchBar from "../SearchBar";

interface ControlsProps {
  setDisplayStyle: (style: "grid" | "list") => void;
  handleType: (type: string) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  activeType: string;
  setActiveType: (type: string) => void;
}

export default function Controls({
  setDisplayStyle,
  handleType,
  query,
  setQuery,
  activeType,
  setActiveType,
}: ControlsProps) {
  return (
    <div className="controller border-b-2 p-2 border-gray-500 flex items-center justify-center text-gray-900 gap-10">
      {/* Display */}
      <div className="flex gap-2">
        <button
          className="text-ms text-gray-900"
          onClick={() => setDisplayStyle("grid")}
        >
          <TfiLayoutGrid3 />
        </button>
        <button
          className="text-ms text-gray-900"
          onClick={() => setDisplayStyle("list")}
        >
          <FiList />
        </button>
      </div>
      {/* Category */}
      <div className="flex gap-2">
        <ControlBtn
          onClick={() => handleType("all")}
          icon={<GrDocumentConfig />}
          value="all"
          activeType={activeType}
          setActiveType={setActiveType}
        />
        <ControlBtn
          onClick={() => handleType("video")}
          icon={<FiVideo />}
          value="video"
          activeType={activeType}
          setActiveType={setActiveType}
        />
        <ControlBtn
          onClick={() => handleType("image")}
          icon={<FiImage />}
          value="image"
          activeType={activeType}
          setActiveType={setActiveType}
        />
      </div>
      <div className="flex flex-grow"></div>
      <SearchBar query={query} setQuery={setQuery} />
      <div className="flex gap-2 items-center justify-center"></div>
    </div>
  );
}
