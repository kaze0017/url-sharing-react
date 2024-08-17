import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state/store";
import { mapSelectedContentsToSelectedLinksIds } from "../../../../state/linkManagement/linkSlice";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";


export default function MoveToCategory() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { selectedContentsType } = useSelector(
    (state: RootState) => state.linkManagement
  );
   function handelAddLinksToCategory() {
     dispatch(mapSelectedContentsToSelectedLinksIds());
     navigate("/linkmanagement/addlinkstocategory");
   }
  return (
    <div>
      <Button
        id="composition-button"
        aria-haspopup="true"
        onClick={() => handelAddLinksToCategory()}
        startIcon={<DriveFileMoveOutlinedIcon />}
        disabled={selectedContentsType !== "link"}
        title={
          selectedContentsType !== "link"
            ? "Only links can be added to a category"
            : "Move selected links to a category"
        }
      >
        Move to Category
      </Button>
    </div>
  );
}
