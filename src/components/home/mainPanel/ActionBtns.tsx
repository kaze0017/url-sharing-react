import { useContext } from "react";
import { FiEye } from "react-icons/fi";
import { FiCompass } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { HomeContext } from "../../../context/HomeProvider";
import { useLocation, useNavigate } from "react-router-dom";

// interface Props {
//   setMode: (a: string) => void;
//   panelMainMode: string;
// }

export default function ActionBtns() {
  const active = "text-blue-500 text-2xl";
  const inactive = "text-gray-600 text-2xl";
  const { mode, setMode } = useContext(HomeContext);
  let location = useLocation();
  const navigate = useNavigate();

  type ModeType = "saved" | "public" | "trend";

  function handleModeChange(mode: ModeType) {
    // check Url
    if (location.pathname !== "/") {
      navigate("/");
    }

    setMode(mode);
  }

  const iconWrapperClasses = "flex flex-col items-center cursor-pointer";

  return (
    <div className="flex flex-row w-full gap-4 p-1 items-center justify-center text-gray-600 panel-light">
      <div className="flex  w-[25%] ml-2 border border-gray-600 "></div>
      <div className={iconWrapperClasses} title="Saved Links">
        <FiEye
          onClick={() => handleModeChange("saved")}
          className={mode === "saved" ? active : inactive}
        />
      </div>
      <div className={iconWrapperClasses} title="Public Links">
        <FiCompass
          className={mode === "public" ? active : inactive}
          onClick={() => handleModeChange("public")}
        />
      </div>
      <div className={iconWrapperClasses} title="Trending Links">
        <FiTrendingUp
          className={mode === "trend" ? active : inactive}
          onClick={() => handleModeChange("trend")}
        />
      </div>
      <div className="flex w-[25%] mr-2 border border-gray-600 "></div>
    </div>
  );
}
