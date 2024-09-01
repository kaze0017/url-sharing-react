import HotSharedLinks from "./topPanel/HotSharedLinks";
import HotCategories from "./topPanel/HotCategories";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { useEffect } from "react";
import { dispatch } from "d3";
import {
  loadHotLinks,
  loadHotCategories,
} from "../../state/home/topContentsSlice";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";

interface PanelTopProps {
  mode: "wall" | "link";
}

export default function PanelTop({ mode }: PanelTopProps) {
  const { loadingHotCategories, loadingHotLinks } = useSelector(
    (state: RootState) => state.hotContents
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadHotLinks());
    dispatch(loadHotCategories());
  }, []);

  return (
    <Paper>
      <div className="p-1 flex-col flex gap-1">
        {loadingHotLinks || loadingHotCategories ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <>
            <HotSharedLinks mode={mode} />
            <HotCategories />
          </>
        )}
      </div>
    </Paper>
  );
}
