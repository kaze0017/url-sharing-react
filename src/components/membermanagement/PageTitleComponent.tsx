import { useEffect, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { PiGraphLight } from "react-icons/pi";
import { TbWorldUpload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { setType } from "../../state/networks/networksSlice";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

export default function PageTitleComponent() {
  const navigate = useNavigate();
  const { type } = useSelector((state: RootState) => state.networks);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   navigate("/networks");
  // }, [type, navigate]);
  const [page, setPage] = useState<"groups" | "graphs" | "relations" | "connections">();
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "groups" | "graphs" | "relations" | "connections"
  ) => {
    setPage(newValue);
    navigate(`/networks/${newValue}`);
  };

  const wrapperClass = "flex gap-2 text-5xl font-bold ml-2 uppercase";
  const iconsClass = "cursor-pointer text-indigo-500 hover:text-blue-800 ";
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
        icon={<HiOutlineUserGroup />}
        value="groups"
        sx={{ minWidth: 80, padding: 0 }}
      />
      <BottomNavigationAction
        label="Graphs"
        icon={<PiGraphLight />}
        value="graphs"
        sx={{ minWidth: 80, padding: 0 }}
      />
      <BottomNavigationAction
        label="Relations"
        icon={<TbWorldUpload />}
        value="relations"
        sx={{ minWidth: 80, padding: 0 }}
      />
      <BottomNavigationAction
        label="Connections"
        icon={<TbWorldUpload />}
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