import MainPanelWrapper from "../MainPanelWrapper";
import MenuBtnCard from "../menus/btns/MenuBtnCard";
import { HiOutlineUserGroup } from "react-icons/hi";
import { PiGraphLight } from "react-icons/pi";
import { TbWorldUpload } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setType } from "../../state/networks/networksSlice";
import { useNavigate } from "react-router-dom";
import { TbFriends } from "react-icons/tb";

export default function MainPanel() {
  const dispatch = useDispatch();
  dispatch(setType("none"));
  const navigate = useNavigate();
  return (
    <MainPanelWrapper>
      <div className="flex flex-wrap gap-5 flex-grow items-center justify-center">
        <MenuBtnCard
          icon={HiOutlineUserGroup}
          title="Groups"
          callBacFunc={() => navigate("/networks/groups")}
        />
        <MenuBtnCard
          icon={PiGraphLight}
          title="Graphs"
          callBacFunc={() => navigate("/networks/graphs")}
        />
        <MenuBtnCard
          icon={TbWorldUpload}
          title="Relations"
          callBacFunc={() => navigate("/networks/relations")}
        />
        <MenuBtnCard
          icon={TbFriends}
          title="Connections"
          callBacFunc={() => navigate("/networks/connections")}
        />
      </div>
    </MainPanelWrapper>
  );
}
