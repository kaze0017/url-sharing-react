import { useState } from "react";
import PanelTop from "../home/PanelTop";
import PanelMain from "../home/PanelMain";
import { Box, Container } from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import IconButton from "@mui/material/IconButton";
import { setToggledTopPanel } from "../../state/home/homeSlice";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

export default function PanelMiddle() {
  const [panelTopMode, setPanelTopMode] = useState<"wall" | "link">("wall");
  const [panelMainMode, setPanelMainMode] = useState("shared");
  const wrapperClass = "flex flex-col grow gap-2 w-full overflow-hidden";
  const { toggledTopPanel } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  return (
    <div className={wrapperClass}>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: toggledTopPanel ? "175px 1fr" : "1fr",
          rowGap: "2px",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => {
            dispatch(setToggledTopPanel());
          }}
          sx={{
            position: "absolute",
            top: "5px",
            right: "5px",
            zIndex: 1000,
          }}
        >
          <LocalFireDepartmentIcon
            color={!toggledTopPanel ? "error" : "inherit"}
          />
        </IconButton>
        {toggledTopPanel && <PanelTop mode={panelTopMode} />}
        <PanelMain mode={panelMainMode} />
      </Box>
    </div>
  );
}

{
  /* <ToggleButton
  value="check"
  selected={selected}
  onChange={() => {
    setSelected(!selected);
  }}
>
  <CheckIcon />
</ToggleButton>; */
}
