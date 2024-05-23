import { createElement, useContext } from "react";
import { IconType } from "react-icons";
import ShareWithGroupsContext from "../../../context/ShareWithGroupsProvider";
import { useNavigate } from "react-router-dom";

interface TabBtnProps {
  selectedCount?: number;
  name: "users" | "groups" | "search or invite" | "selected";
}
export default function TabBtnText({ selectedCount, name }: TabBtnProps) {
  const navigate = useNavigate();
  const { mode, setMode } = useContext(ShareWithGroupsContext);
  function handleTabClick() {
    setMode(name);
  }
  return (
    <div
      className={`uppercase text-xs relative cursor-pointer ${
        name === mode ? "text-indigo-500" : "text-gray-500"
      }`}
      onClick={handleTabClick}
    >
      {name === "search or invite" ? (
        <p>{name}</p>
      ) : (
        <p>
          {name} ({selectedCount})
        </p>
      )}
    </div>
  );
}
