import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../state/store";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { Badge } from "@mui/material";
import { setToggleRightPanel } from "../../../../state/rightPanel/rightPanelSlice";

export default function ToggledConnectionRequests() {
  const { requests } = useSelector((state: RootState) => state.connections);
  const dispatch = useDispatch();

  return (
    <div>
      {requests.length > 0 && (
        <Badge badgeContent={requests.length} color="success" >
          <PersonAddAltOutlinedIcon
            onClick={() => dispatch(setToggleRightPanel(false))}
            className="text-4xl cursor-pointer"
          />
        </Badge>
      )}
    </div>
  );
}
