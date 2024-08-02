import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { addLinksToCategory } from "../../../state/linkManagement/categorySlice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function AddLinksToCategoryController() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isDisabled, settIsDisabled] = React.useState(false);
  const { selectedContents } = useSelector(
    (state: RootState) => state.linkManagement
  );
  const dispatch = useDispatch<AppDispatch>();
  // async function handleAddLinksToCategory() {
  //   dispatch(addLinks)
  async function handelAddLinksToCategory() {
    const response = await dispatch(addLinksToCategory());
    console.log("responseXXXXX", response);
    const variant =
      response.payload.message ===
      "Links are added/removed to/from the Category successfully!"
        ? "success"
        : "error";
      const message =
        response.payload.message ===
        "Links are added/removed to/from the Category successfully!" 
        ? "Link Added Successfully"
        : "Some Error Occured";

    enqueueSnackbar(message, {
      variant: variant,
    });
    navigate("/linkmanagement");
  }

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        title={
          selectedContents.length > 1
            ? "Please select only one content"
            : selectedContents.length === 0
            ? "Please select a content"
            : "Move selected content to category"
        }
        onClick={handelAddLinksToCategory}
        disabled={selectedContents.length === 0 || selectedContents.length > 1}
      >
        Add
      </button>
    </div>
  );
}
