import  { useContext, useEffect } from "react";
import { NetworksContext } from "../../context/NetworksProvider";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiGraphLight } from "react-icons/pi";
import { TbWorldUpload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function PageTitleComponent() {
  const navigate = useNavigate();
  const { type, setType } = useContext(NetworksContext);

  function handelSetToGroups() {
    setType("groups");
  }
  function handelSetToGraphs() {
    setType("graphs");
  }
  function handelSetToRelations() {
    setType("relations");
  }

  useEffect(() => {
    navigate("/networks");
  }, [type]);

  const wrapperClass = "flex gap-2 text-5xl font-bold ml-2 uppercase";
  const iconsClass = "cursor-pointer text-indigo-500 hover:text-blue-800 ";
  return (
    <div className={wrapperClass}>
      {type !== "none" && (
        <>
          <HiOutlineUserGroup
            onClick={() => setType("groups")}
            className={iconsClass}
          />
          <PiGraphLight
            onClick={() => setType("graphs")}
            className={iconsClass}
          />
          <TbWorldUpload
            onClick={() => setType("relations")}
            className={iconsClass}
          />
        </>
      )}
    </div>
  );
}
