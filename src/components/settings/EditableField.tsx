import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";

interface EditableFieldProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function EditableField({
  title,
  value,
  setValue,
}: EditableFieldProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  //label class
  const labelClass = editMode
    ? "text-sm font-semibold w-20"
    : "text-sm font-semibold w-20";
  // input editable mode class
  const inputEditable = editMode
    ? "border-b border-gray-300  flex flex-grow items-center"
    : "bg-transparent border-none flex flex-grow items-center";
  // textarea for bio
  const textareaClass = editMode
    ? "border-b border-gray-300 flex flex-grow"
    : "bg-transparent border-none flex flex-grow";

  return (
    <div className="flex gap-2 w-full items-center">
      <label htmlFor={title} className={labelClass}>
        {title}:
      </label>
      <div className="flex items-center gap-2 flex-grow">
        {title.toLowerCase() === "bio" ? (
          <textarea
            id={title}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={textareaClass}
            readOnly={!editMode}
          />
        ) : (
          <input
            id={title}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={inputEditable}
            readOnly={!editMode}
          />
        )}
        {
          // save button
          editMode ? (
            <IoSaveOutline
              className="cursor-pointer text-green-500"
              onClick={() => setEditMode(!editMode)}
            />
          ) : (
            <CiEdit
              className="text-gray-400 cursor-pointer z-10"
              onClick={() => setEditMode(!editMode)}
            />
          )
        }
      </div>
    </div>
  );
}
