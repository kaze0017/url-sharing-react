import { createElement, useContext } from "react";
import { IconType } from "react-icons";
import ShareWithGroupsContext from "../../../context/ShareWithGroupsProvider";
import { useNavigate } from "react-router-dom";

interface TabBtnProps {
  selectedCount?: number;
  name: "users" | "groups" | "selected";
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
      <p>
        {name} ({selectedCount})
      </p>
    </div>
  );
}
