import { useEffect, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { PiGraphLight } from "react-icons/pi";
import { TbWorldUpload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { setType } from "../../state/networks/networksSlice";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import StreamOutlinedIcon from "@mui/icons-material/StreamOutlined";
import Diversity2OutlinedIcon from "@mui/icons-material/Diversity2Outlined";

export default function PageTitleComponent() {
  const navigate = useNavigate();
  const { type } = useSelector((state: RootState) => state.networks);
  const dispatch = useDispatch();

  const [page, setPage] = useState<"groups" | "graphs" | "relations" | "connections">();
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "groups" | "graphs" | "relations" | "connections"
  ) => {
    setPage(newValue);
    navigate(`/networks/${newValue}`);
  };

 
  return (
    <BottomNavigation
      value={page}
      onChange={handleChange}
      showLabels
      sx={{
        backgroundColor: "transparent",
      }}
    >
      <BottomNavigationAction
        label="Groups"
        icon={<Groups2OutlinedIcon />}
        value="groups"
        sx={{ minWidth: 80, padding: 0 }}
      />
      <BottomNavigationAction
        label="Graphs"
        icon={<HubOutlinedIcon />}
        value="graphs"
        sx={{ minWidth: 80, padding: 0 }}
      />
      <BottomNavigationAction
        label="Relations"
        icon={<StreamOutlinedIcon />}
        value="relations"
        sx={{ minWidth: 80, padding: 0 }}
      />
      <BottomNavigationAction
        label="Connections"
        icon={<Diversity2OutlinedIcon />}
        value="connections"
        sx={{ minWidth: 80, padding: 0 }}
      />
    </BottomNavigation>
  );
}

// <div className={wrapperClass}>
//   {/* {type !== "none" && (
//     <> */}
//       <HiOutlineUserGroup
//         // onClick={() => dispatch(setType("groups"))}
//         className={iconsClass}
//       />
//       <PiGraphLight
//         // onClick={() => dispatch(setType("graphs"))}
//         className={iconsClass}
//       />
//       <TbWorldUpload
//         // onClick={() => dispatch(setType("relations"))}
//         className={iconsClass}
//       />
//     {/* </>
//   )} */}
// </div>