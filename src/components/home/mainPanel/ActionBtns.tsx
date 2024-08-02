import { useContext } from "react";
import { FiEye } from "react-icons/fi";
import { FiCompass } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { useDispatch } from "react-redux";
import { setMode } from "../../../state/home/homeSlice";
import { Tabs, Tab } from "@mui/material";

export default function ActionBtns() {
  const rMode = useSelector((state: RootState) => state.home.mode);
  const dispatch = useDispatch();

  const active = "text-2xl active-primary hover-primary";
  const inactive = "text-2xl inactive-primary hover-primary";
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
        <Tabs
          value={rMode}
          onChange={(e, newValue) => handleModeChange(newValue)}
          aria-label="simple tabs example"
          sx={{ padding: 0, margin: 0, minHeight: 0 }}
          TabIndicatorProps={{
            style: { display: "none" },
          }}
        >
          <Tab
            value="saved"
            className={rMode === "saved" ? active : inactive}
            icon={
              <FiEye
                onClick={() => handleModeChange("saved")}
                className="text-2xl"
                // className={rMode === "saved" ? active : inactive}
              />
            }
            sx={{ minWidth: 50, padding: 0, margin: 0, minHeight: 0 }}
          />

          <Tab
            value="public"
            className={rMode === "public" ? active : inactive}
            icon={
              <FiCompass
                className="text-2xl"
                onClick={() => handleModeChange("public")}
              />
            }
            sx={{ minWidth: 50, padding: 0, margin: 0, minHeight: 0 }}
          />
          <Tab
            value="trend"
            className={rMode === "trend" ? active : inactive}
            icon={
              <FiTrendingUp
                className="text-2xl"
                onClick={() => handleModeChange("trend")}
              />
            }
            sx={{ minWidth: 50, padding: 0, margin: 0, minHeight: 0 }}
          />
        </Tabs>

        {/* <FiEye
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
        /> */}
      </div>
      <div className="flex w-[25%] mr-2 border border-gray-600 "></div>
    </div>
  );
}
