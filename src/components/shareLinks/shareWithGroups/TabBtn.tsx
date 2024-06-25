import { createElement, useContext } from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../state/store";
import { setMode } from "../../../state/share/shareSlice";

interface TabBtnProps {
  icon: IconType;
  selectedCount?: number;
  name: "users" | "groups" |  "selected";
}
export default function TabBtn({ icon, selectedCount, name }: TabBtnProps) {
  const navigate = useNavigate();
  const { mode} = useSelector((state: RootState) => state.share);
  const dispatch = useDispatch();
  
  function handleTabClick() {
    dispatch(setMode(name));
  }
  return (
    <div
      className={`relative cursor-pointer ${
        name === mode ? "text-indigo-500" : "text-gray-500"
      }`}
      onClick={handleTabClick}
    >
      <div className="text-xs absolute top-0 left-0  text-blue-500 rounded-full w-6 h-6 flex items-center justify-center -translate-x-4 -translate-y-2">
        {selectedCount}
      </div>
      {createElement(icon, {
        className: "text-4xl",
      })}
    </div>
  );
}
