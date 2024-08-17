import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../state/store";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { deleteSelectedContents } from "../../../../state/linkManagement/linkManagementSlice";

export default function Delete() {
  const dispatch = useDispatch<AppDispatch>();
function handleDeleteBtnClick() {
  console.log("handleDeleteBtnClick");
  dispatch(deleteSelectedContents());
}
  return (
    <div>
      <Button
        id="composition-button"
        aria-haspopup="true"
        onClick={() => handleDeleteBtnClick()}
        startIcon={<DeleteOutlinedIcon />}
      >
        Delete
      </Button>
    </div>
  );
}
