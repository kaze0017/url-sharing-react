import React, { useState } from "react";
import SearchBar from "../../SearchBar";
import { useNavigate } from "react-router-dom";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { TfiViewGrid } from "react-icons/tfi";
import { AiOutlineAlignLeft } from "react-icons/ai";

export default function Controller() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  function handelCreate() {
    const newId = Math.floor(Math.random() * 1000).toString();
    navigate("/networks/editor/g" + newId);
  }

  const btnClass = "cursor-pointer text-2xl text-gray-800";

  return (
    <div className="flex gap-4">
      <div className="flex gap-4">
        <button
          onClick={handelCreate}
          className={btnClass}
          title="Create a new group"
        >
          <AiOutlineUsergroupAdd className="text-2xl" />
        </button>
        <button className={btnClass} title="Filter">
          <AiOutlineFilter className="text-2xl" />
        </button>
        <button className={btnClass} title="View">
          <TfiViewGrid className="text-2xl" />
        </button>
        <button className={btnClass} title="Layout">
          <AiOutlineAlignLeft className="text-2xl" />
        </button>
      </div>
      <SearchBar query={query} setQuery={setQuery} />
    </div>
  );
}
