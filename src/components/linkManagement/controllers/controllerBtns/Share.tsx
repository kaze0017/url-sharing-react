import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state/store";
import { mapSelectedContentsToSelectedLinksIds } from "../../../../state/linkManagement/linkSlice";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

export default function Share() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {selectedContentsType} = useSelector((state: RootState) => state.linkManagement);
  function handleShareBtnClick() {
    dispatch(mapSelectedContentsToSelectedLinksIds());
    navigate("/sharelinks");
  }
  return (
    <div>
      <Button
        id="composition-button"
        aria-haspopup="true"
        onClick={() => handleShareBtnClick()}
        startIcon={<ShareOutlinedIcon />}
      >
        Share
      </Button>
    </div>
  );
}
