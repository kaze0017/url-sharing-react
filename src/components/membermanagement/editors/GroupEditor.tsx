import React, { useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthProvider";

import { CiEdit } from "react-icons/ci";
import { CiFloppyDisk } from "react-icons/ci";
import TagSelector from "../../TagSelector";
import GroupDnD from "./GroupDnD";
import DnDTrashCan from "./DnDTrashCan";
import { UserProfileType } from "../../../lib/interfaces";
import { postUserGroups } from "../../../api/posts/postUserGroups";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../state/store";
import {
  removeMember,
  setSelectedGroup,
} from "../../../state/networks/groupsSlice";

export default function GroupEditor() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const { selectedGroup } = useSelector(
    (state: RootState) => state.netWorkGroups
  );
  const dispatch = useDispatch();

  async function saveGroup() {
    const user_ids = selectedGroup.members.map((member) => member.user_id);
    const description = selectedGroup.description;
    const response = await postUserGroups({
      token,
      user_ids,
      description,
    });
  }

  function setName(name: string) {
    dispatch(setSelectedGroup({ ...selectedGroup, name }));
  }
  function setDescription(description: string) {
    dispatch(setSelectedGroup({ ...selectedGroup, description }));
  }
  function setTags(tags: string[]) {
    dispatch(setSelectedGroup({ ...selectedGroup, tags }));
  }
  function setColor(color: string) {
    dispatch(setSelectedGroup({ ...selectedGroup, color }));
  }

  const [editMode, setEditMode] = React.useState(false);

  function handelRemoveMember(user: UserProfileType) {
    dispatch(removeMember(user));
  }

  const labelClass = editMode
    ? " font-semibold w-20 min-w-20 uppercase text-xs "
    : " font-semibold w-20 min-w-20 uppercase text-xs ";
  // input editable mode class
  const inputEditable = editMode
    ? "border-b border-gray-300  flex flex-grow items-center uppercase text-xs"
    : "bg-transparent border-none flex flex-grow items-center uppercase text-xs";
  // textarea for bio
  const textareaClass = editMode
    ? "border-b border-gray-300 flex flex-grow uppercase text-xs"
    : "bg-transparent border-none flex flex-grow uppercase text-xs";

  const inputWrapperClass = "flex gap-1 items-center uppercase text-xs";

  return (
    <div className="relative flex flex-col w-full h-full  p-1 gap-1">
      <div className="panel-light flex gap-2 w-full h-52 uppercase p-2 ">
        <div className="flex items-center justify-center text-8xl  text-gray-500 border-r-2 border-gray-500 h-full w-52 ">
          {editMode ? (
            <CiFloppyDisk
              onClick={() => {
                saveGroup();
                setEditMode(false);
              }}
            />
          ) : (
            <CiEdit
              onClick={() => {
                setEditMode(true);
              }}
            />
          )}
        </div>
        <div className="flex flex-col gap-1 text-xs ">
          <div className={inputWrapperClass}>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input
              type="text"
              value={selectedGroup.name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              readOnly={!editMode}
              className={inputEditable}
            />
          </div>
          <div className={inputWrapperClass}>
            <label htmlFor="description" className={labelClass}>
              Description
            </label>
            <textarea
              value={selectedGroup.description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              readOnly={!editMode}
              className={textareaClass}
            />
          </div>
          <div className={inputWrapperClass}>
            <label htmlFor="tags" className={labelClass}>
              Tags
            </label>

            {/* <TagSelector
              selectedTags={selectedGroup.tags || []}
              setSelectedTags={setTags}
              editMode={editMode}
            /> */}
          </div>
          <div className={inputWrapperClass}>
            <label htmlFor="color" className={labelClass}>
              Color
            </label>
            <input
              type="color"
              value={selectedGroup.color}
              onChange={(e) => setColor(e.target.value)}
              name="color"
              readOnly={!editMode}
              className="bg-transparent border-none"
            />
          </div>
        </div>
      </div>
      <div className="relative flex flex-grow p-1 panel-light">
        <GroupDnD />
        <div className="absolute bottom-0 right-0">
          <DnDTrashCan removeMember={handelRemoveMember} />
        </div>
      </div>
    </div>
  );
}
