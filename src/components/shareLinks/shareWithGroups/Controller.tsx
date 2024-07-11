import { useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthProvider";
import SearchBar from "../../SearchBar";
import TabBtnText from "./TabBtnText";

import { GroupType } from "../../../lib/interfaces/group";
import { groupsPH } from "../../../lib/placeholder-data";
import { getTopUsers } from "../../../api/gets/getTopUsers";
import { getUserByQuery } from "../../../api/gets/getUserByQuery";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { handelSearch } from "../../../state/share/shareSlice";

export default function Controller() {
  const { selectedPeople, selectedGroups, mode, query } = useSelector(
    (state: RootState) => state.share
  );

  const dispatch = useDispatch<AppDispatch>();

  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";

  // let topTenPeople;

  // async function getTopTenPeople() {
  //   topTenPeople = await getTopUsers(token);
  //   dispatch(setTopPeople(topTenPeople));
  //   dispatch(setPeopleToDisplay(topTenPeople));
  // }
  // async function searchForUsers(query: string, token: string) {
  //   const users = await getUserByQuery(token, query);
  //   dispatch(setSearchedPeople(users));
  // }

  // function handelSearch(query: string) {
  //   dispatch(setQuery(query));
  // }

  async function setQuery(query: string) {
    dispatch(handelSearch({ query, token }));
  }

  // useEffect(() => {
  //   getTopTenPeople();
  // }, []);

  // useEffect(() => {
  //   if (mode === "users") {
  //     if (query) {
  //       searchForUsers(query, token);
  //     }
  //   } else {
  //     let searchedGroups = groupsPH.filter(
  //       (group) =>
  //         group.name.toLowerCase().includes(query.toLowerCase()) ||
  //         group.description.toLowerCase().includes(query.toLowerCase())
  //     );
  //     searchedGroups.filter((group) => {
  //       selectedGroups.some((item) => item.group_id !== group.group_id);
  //     });
  //     dispatch(setGroupsToDisplay(searchedGroups));
  //   }
  // }, [query]);

  return (
    <div className="flex flex-col w-full items-center font-semibold">
      <div className="flex items-center justify-between h-[35px] w-full">
        <TabBtnText selectedCount={selectedPeople.length} name={"users"} />
        <TabBtnText selectedCount={selectedGroups.length} name={"groups"} />
        <TabBtnText
          selectedCount={selectedPeople.length + selectedGroups.length}
          name={"selected"}
        />
      </div>
      <SearchBar query={query} setQuery={setQuery} />
    </div>
  );
}
