import { createElement, useContext } from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../state/store";
import { setMode } from "../../../state/share/shareSlice";

interface TabBtnProps {
  selectedCount?: number;
  name: "users" | "groups" | "selected";
}
export default function TabBtnText({ selectedCount, name }: TabBtnProps) {
  const navigate = useNavigate();

  // const { mode, setMode } = useContext(ShareWithGroupsContext);
  const mode = useSelector((state: RootState) => state.share.mode);
  const dispatch = useDispatch();
  return (
    <div
      className={`uppercase text-xs relative cursor-pointer ${
        name === mode ? "text-indigo-500" : "text-gray-500"
      }`}
      onClick={() => {
        // setMode(name);
        dispatch(setMode(name));
        // navigate("/shareLinks");
      }}
    >
      <p>
        {name} ({selectedCount})
      </p>
    </div>
  );
}
