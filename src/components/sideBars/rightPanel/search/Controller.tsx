import React from "react";

interface ControllerProps {
  mode: "all" | "people" | "tags" | "categories" | "links";
  setMode: React.Dispatch<
    React.SetStateAction<"all" | "people" | "tags" | "categories" | "links">
  >;
}
export default function Controller({ mode, setMode }: any) {
  const btnClass = "flex-grow text-center cursor-pointer text-gray-400";
  const activeClass = "flex-grow text-center cursor-pointer text-blue-950";
  return (
    <div className="flex w-full text-xs uppercase font-semibold">
      <div
        className={mode === "all" ? activeClass : btnClass}
        onClick={() => setMode("all")}
      >
        All
      </div>
      <div
        className={mode === "people" ? activeClass : btnClass}
        onClick={() => setMode("people")}
      >
        People
      </div>
      <div
        className={mode === "tags" ? activeClass : btnClass}
        onClick={() => setMode("tags")}
      >
        Tags
      </div>
      <div
        className={mode === "categories" ? activeClass : btnClass}
        onClick={() => setMode("categories")}
      >
        Categories
      </div>
      <div
        className={mode === "links" ? activeClass : btnClass}
        onClick={() => setMode("links")}
      >
        Links
      </div>
    </div>
  );
}
