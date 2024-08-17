import { setShowFilter } from "../../../../state/linkManagement/linkManagementSlice";
import {
  Button,

} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
export default function FieldsSelector() {
  const dispatch = useDispatch();
    const { showFilter } = useSelector( (state: RootState) => state.linkManagement);

  return (
    <div>
      <Button
        id="composition-button"
        aria-haspopup="true"
        onClick={() => dispatch(setShowFilter(!showFilter))}
        startIcon={<SettingsSuggestOutlinedIcon />}
      >
        Columns
      </Button>
    </div>
  );
}
