import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import Controller from "./groups/Controller";
import { useNavigate } from "react-router-dom";
import GroupSm from "../groups/GroupSm";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {
  fetchUserGroups,
  initializeGroupSlice,
  setSelectedGroup,
} from "../../state/networks/groupsSlice";

export default function Groups() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const { userGroupsToDisplay } = useSelector(
    (state: RootState) => state.netWorkGroups
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("rendering groups")
    dispatch(initializeGroupSlice());
    dispatch(fetchUserGroups(token));
  }, []);

  return (
    <div className="flex flex-col gap-2 p-2">
      <Controller />
      <div className="flex flex-wrap gap-2 w-full h-full">
        {userGroupsToDisplay?.length > 0 ? (
          userGroupsToDisplay.map((group) => (
            <div
              key={group.group_id}
              onClick={() => {
                dispatch(setSelectedGroup(group));
                navigate(`/networks/groupEditor/`);
              }}
            >
              <GroupSm group={group} />
            </div>
          ))
        ) : (
          <div className="text-center">No groups to display</div>
        )}
      </div>
    </div>
  );
}
