import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { FiTrendingUp } from "react-icons/fi";
import { PiShareFatThin } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { SharedLinkType } from "../../../lib/interfaces";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../state/store";
import {
  likeTheLink,
  postQuickAccess,
  setSelectedLinks,
} from "../../../state/linkManagement/linkSlice";
import { Button } from "@mui/material";
import ActionButton from "./ActionButton";

interface Props {
  id: number;
  rank: number;
  shared: number;
  saved: number;
  link?: SharedLinkType;
}

export default function ActionBtns(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [saved, setSaved] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [ranked, setRanked] = useState<boolean>(false);

  async function rankUp(event: any) {
    event.stopPropagation();
    likeTheLink(props.id);

    try {
      setRanked(!ranked);
    } catch (error) {
      console.error(error);
    }
  }
  const navigate = useNavigate();
  async function share(event: any) {
    event.stopPropagation();
    setShared(!shared);

    try {
      dispatch(setSelectedLinks([props.link!]));
    } catch (error) {
      console.error(error);
    }
    navigate("/shareLinks");
  }

  async function save(event: any) {
    event.stopPropagation();
    dispatch(postQuickAccess(props.id as number));
  }

  const wrapperClass =
    "flex items-center justify-around px-2 uppercase text-center h-full w-full";
  const iconCol =
    "text-gray-600 flex flex-col gap-1 justify-center items-center";
  const iconStyle = "";

  return (
    <div className={wrapperClass}>
      <ActionButton
        count={props.rank}
        IconComponent={ThumbUpOutlinedIcon}
        isActive={ranked}
        onClick={rankUp}
      />
      <ActionButton
        count={props.shared}
        IconComponent={ShareOutlinedIcon}
        isActive={shared}
        onClick={share}
      />
      <ActionButton
        count={props.saved}
        IconComponent={TurnedInNotOutlinedIcon}
        isActive={saved}
        onClick={save}
      />
    </div>
  );
}
