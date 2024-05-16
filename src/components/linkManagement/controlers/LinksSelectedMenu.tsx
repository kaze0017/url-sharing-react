import React from "react";
import { useNavigate } from "react-router-dom";

export default function LinksSelectedMenu() {
  const mainBtnClass =
    "p-2 px-2 flex items-center justify-center text-xs bg-gray-300 h-10 rounded-xl min-w-24 max-w-24 uppercase hover:bg-gray-600 text-xs text-black hover:text-white";

  const navigate = useNavigate();

  function handelShareBtnClick() {
    navigate("/sharelinks");
  }

  return (
    <div className="left flex gap-2 z-20 p-4">
      <button className={mainBtnClass}>Move to a category</button>
      <button className={mainBtnClass} onClick={handelShareBtnClick}>
        Share
      </button>
      <button className={mainBtnClass}>Move to trash</button>
    </div>
  );
}
