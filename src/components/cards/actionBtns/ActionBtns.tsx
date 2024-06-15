import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthProvider";
import LinkManagementContext from "../../../context/LinkManagementProvider";
import { FiTrendingUp } from "react-icons/fi";
import { PiShareFatThin } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { updateLink } from "../../../api/postUpdateLink";
import { SharedLinkType } from "../../../lib/interfaces";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  rank: number;
  shared: number;
  saved: number;
  link?: SharedLinkType;
}

export default function ActionBtns(props: Props) {
  const { auth } = useContext(AuthContext);
  const { selectedLinks, setSelectedLinks } = useContext(LinkManagementContext);
  const token = auth?.token || "";

  const [saved, setSaved] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [ranked, setRanked] = useState<boolean>(false);

  async function rankUp(event: any) {
    event.stopPropagation();

    try {
      setRanked(!ranked);
    } catch (error) {
      console.error(error);
    }
  }
  const navigate = useNavigate();
  async function share(event: any) {
    event.stopPropagation();

    try {
      if (selectedLinks !== undefined && props.link !== undefined) {
        setSelectedLinks([...selectedLinks, props.link]);
      } else if (props.link !== undefined) {
        setSelectedLinks([props.link]);
      }
    } catch (error) {
      console.error(error);
    }
    console.log(selectedLinks);
    navigate("/shareLinks");
  }

  async function save(event: any) {
    event.stopPropagation();
    try {
      setSaved(!saved);
    } catch (error) {
      console.error(error);
    }
  }

  const wrapperClass =
    "flex items-center justify-around px-2 uppercase text-center h-full w-full";
  const iconCol =
    "text-gray-600 flex flex-col gap-1 justify-center items-center";
  const iconStyle = "";

  return (
    <div className={wrapperClass}>
      <div className={iconCol}>
        <p>{props.rank}</p>
        <FiTrendingUp
          className={`${ranked ? "text-blue-500" : ""} ${iconStyle}`}
          onClick={(event) => rankUp(event)}
        />
      </div>
      <div className={iconCol}>
        <p>{props.shared}</p>
        <PiShareFatThin
          className={`${shared ? "text-blue-500" : ""} ${iconStyle}`}
          onClick={(event) => share(event)}
        />
      </div>
      <div className={iconCol}>
        <p>{props.saved}</p>
        <IoPricetagOutline
          className={`${saved ? "text-blue-500" : ""} ${iconStyle}`}
          onClick={(event) => save(event)}
        />
      </div>
    </div>
  );
}
