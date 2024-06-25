import { useEffect } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { PiGraphLight } from "react-icons/pi";
import { TbWorldUpload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { setType } from "../../state/networks/networksSlice";

export default function PageTitleComponent() {
  const navigate = useNavigate();
  const { type } = useSelector((state: RootState) => state.networks);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   navigate("/networks");
  // }, [type, navigate]);

  const wrapperClass = "flex gap-2 text-5xl font-bold ml-2 uppercase";
  const iconsClass = "cursor-pointer text-indigo-500 hover:text-blue-800 ";
  return (
    <div className={wrapperClass}>
      {/* {type !== "none" && (
        <> */}
          <HiOutlineUserGroup
            // onClick={() => dispatch(setType("groups"))}
            className={iconsClass}
          />
          <PiGraphLight
            // onClick={() => dispatch(setType("graphs"))}
            className={iconsClass}
          />
          <TbWorldUpload
            // onClick={() => dispatch(setType("relations"))}
            className={iconsClass}
          />
        {/* </>
      )} */}
    </div>
  );
}
