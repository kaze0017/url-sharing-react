import { useState } from "react";
import { FiLink } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { BottomNavigationAction, BottomNavigation } from "@mui/material";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { setClass } from "../../state/linkManagement/linkManagementSlice";

export default function PageTitleMenu() {

  const { contentClass } = useSelector(
    (state: RootState) => state.linkManagement
  );
  const dispatch = useDispatch();
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "all" | "category" | "link"
  ) => {
    dispatch(setClass(newValue));
  };

  return (
    <BottomNavigation
      value={contentClass}
      onChange={handleChange}
      showLabels
      sx={{
        backgroundColor: "transparent",
      }}
    >
      <BottomNavigationAction
        label="All"
        icon={<PublicOutlinedIcon />}
        value="all"
        sx={{ minWidth: 80, padding: 0 }}
      />
      <BottomNavigationAction
        label="Links"
        icon={<InsertLinkOutlinedIcon />}
        value="link"
        sx={{ minWidth: 80, padding: 0 }}
      />
      <BottomNavigationAction
        label="Categories"
        icon={<CategoryOutlinedIcon />}
        value="category"
        sx={{ minWidth: 80, padding: 0 }}
      />
    </BottomNavigation>
  );
}
// <div className={MainWrapperClass}>
//   <div className="flex flex-col items-center">
//     <FiLink className={iconsClass} />
//     <h2 className="text-sm">Links</h2>
//   </div>
//   <div className="flex flex-col items-center">
//     <MdOutlineCategory className={iconsClass} />
//     <h2 className="text-sm">Categories</h2>
//   </div>
// </div>
