import { useContext } from "react";
import { FiEye } from "react-icons/fi";
import { FiCompass } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { useDispatch } from "react-redux";
import { setMode } from "../../../state/home/homeSlice";

export default function ActionBtns() {
  const rMode = useSelector((state: RootState) => state.home.mode);
  const dispatch = useDispatch();

  const active = "text-blue-500 text-2xl";
  const inactive = "text-gray-600 text-2xl";
  let location = useLocation();
  const navigate = useNavigate();

  type ModeType = "saved" | "public" | "trend";

  function handleModeChange(mode: ModeType) {
    // check Url
    if (location.pathname !== "/") {
      navigate("/");
    }
    dispatch(setMode(mode));
    // setMode(mode);
  }

  const iconWrapperClasses = "flex flex-col items-center cursor-pointer";

  return (
    <div className="flex flex-row w-full gap-4 p-1 items-center justify-center text-gray-600 panel-light">
      <div className="flex  w-[25%] ml-2 border border-gray-600 "></div>
      <div className={iconWrapperClasses} title="Saved Links">
        <FiEye
          onClick={() => handleModeChange("saved")}
          className={rMode === "saved" ? active : inactive}
        />
      </div>
      <div className={iconWrapperClasses} title="Public Links">
        <FiCompass
          className={rMode === "public" ? active : inactive}
          onClick={() => handleModeChange("public")}
        />
      </div>
      <div className={iconWrapperClasses} title="Trending Links">
        <FiTrendingUp
          className={rMode === "trend" ? active : inactive}
          onClick={() => handleModeChange("trend")}
        />
      </div>
      <div className="flex w-[25%] mr-2 border border-gray-600 "></div>
    </div>
  );
}
