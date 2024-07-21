import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../state/store";
import { addLinksToCategory } from "../../../state/linkManagement/categorySlice";

export default function AddLinksToCategoryController() {
  const [isDisabled, settIsDisabled] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  // async function handleAddLinksToCategory() {
  //   dispatch(addLinks)
  function handelAddLinksToCategory() {
    dispatch(addLinksToCategory());
  }
    

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        title={isDisabled ? "Onw Category should be selected" : "Move to a category"}
        onClick={handelAddLinksToCategory}
        disabled={isDisabled}
      >
        Add
      </button>
    </div>
  );
}
