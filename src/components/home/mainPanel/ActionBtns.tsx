import { useContext } from "react";
import { FiEye } from "react-icons/fi";
import { FiCompass } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { ModeContext } from "../../../context/ModeProvider";
import { useLocation, useNavigate } from "react-router-dom";

// interface Props {
//   setMode: (a: string) => void;
//   panelMainMode: string;
// }

export default function ActionBtns() {
  const active = "text-blue-500 text-2xl";
  const inactive = "text-gray-600 text-2xl";
  const { mode, setMode } = useContext(ModeContext);
  let location = useLocation();
  const navigate = useNavigate();

 type ModeType = "wall" | "shared" | "trend";

 function handleModeChange(mode: ModeType) {
   // check Url
   if (location.pathname !== "/") {
     navigate("/");
   }

   setMode(mode);
 }

  return (
    <div className="flex flex-row w-full gap-4 p-1 items-center justify-center text-gray-600 panel-light">
      <div className="flex  w-[25%] ml-2 border border-gray-600 "></div>
      <div className="flex flex-col items-center">
        <FiEye
          onClick={() => handleModeChange("wall")}
          className={mode === "wall" ? active : inactive}
        />
      </div>
      <div className="flex flex-col items-center">
        <FiCompass
          className={mode === "shared" ? active : inactive}
          onClick={() => handleModeChange("shared")}
        />
      </div>
      <div className="flex flex-col items-center">
        <FiTrendingUp
          className={mode === "trend" ? active : inactive}
          onClick={() => handleModeChange("trend")}
        />
      </div>
      <div className="flex w-[25%] mr-2 border border-gray-600 "></div>
    </div>
  );
}
