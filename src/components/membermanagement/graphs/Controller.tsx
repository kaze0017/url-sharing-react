import React, { useState } from "react";
import SearchBar from "../../SearchBar";
import { useNavigate } from "react-router-dom";

export default function Controller() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  function handelCreate() {
    const newId = Math.floor(Math.random() * 1000).toString();
    navigate("/networks/editor/t" + newId);
  }

  return (
    <div className="flex gap-4">
      <div className="flex gap-2">
        <button onClick={handelCreate}>create</button>
        <button>filter</button>
        <button>view</button>
        <button>Auto Align</button>
      </div>
      <SearchBar query={query} setQuery={setQuery} />
    </div>
  );
}
