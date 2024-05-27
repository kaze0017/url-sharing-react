import React, { useEffect } from "react";
import { getGroup } from "../../../lib/placeholder-data";
import { CiEdit } from "react-icons/ci";
import { CiFloppyDisk } from "react-icons/ci";
import TagSelector from "../../TagSelector";
import GroupDnD from "./GroupDnD";
import DnDTrashCan from "./DnDTrashCan";
import { UserProfileType } from "../../../lib/interfaces";

interface GroupEditorProps {
  groupId: string;
}

export default function GroupEditor({ groupId }: GroupEditorProps) {
  const group = getGroup(groupId);
  const [userToDel, setUserToDel] = React.useState<UserProfileType[]>([]);

  const [name, setName] = React.useState(group?.name);
  const [description, setDescription] = React.useState(group?.description);
  const [members, setMembers] = React.useState(group?.members || []);
  const [tags, setTags] = React.useState(group?.tags || []);
  const [color, setColor] = React.useState(group?.color);

  const [editMode, setEditMode] = React.useState(false);

  useEffect(() => {
    // Delete the user from the members array
    setMembers((prev) => prev.filter((member) => !userToDel.includes(member)));
  }, [userToDel]);

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
            <CiFloppyDisk onClick={() => setEditMode(false)} />
          ) : (
            <CiEdit onClick={() => setEditMode(true)} />
          )}
        </div>
        <div className="flex flex-col gap-1 text-xs ">
          <div className={inputWrapperClass}>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input
              type="text"
              value={name}
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
              value={description}
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

            <TagSelector
              selectedTags={tags}
              setSelectedTags={setTags}
              editMode={editMode}
            />
          </div>
          <div className={inputWrapperClass}>
            <label htmlFor="color" className={labelClass}>
              Color
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              name="color"
              readOnly={!editMode}
              className="bg-transparent border-none"
            />
          </div>
        </div>
      </div>
      <div className="relative flex flex-grow p-1 panel-light">
        <GroupDnD members={members} setMembers={setMembers} />
        <div className="absolute bottom-0 right-0">
          <DnDTrashCan setUserToDel={setUserToDel} />
        </div>
      </div>
    </div>
  );
}
