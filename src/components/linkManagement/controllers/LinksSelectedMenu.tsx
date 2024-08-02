import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { deleteSelectedContents } from "../../../state/linkManagement/linkManagementSlice";
import { AppDispatch } from "../../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { mapSelectedContentsToSelectedLinksIds } from "../../../state/linkManagement/linkSlice";

export default function LinksSelectedMenu() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";

  const { selectedContents } = useSelector(
    (state: RootState) => state.linkManagement
  );

  const [isCategorySelected, setIsCategorySelected] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("selectedContents: ", selectedContents);
    const hasCategoryClassType = selectedContents.some(
      (content) => content.contentClass === "category"
    );
    console.log("hasCategoryClassType: ", hasCategoryClassType);
    setIsCategorySelected(hasCategoryClassType);
  }, [selectedContents]);

  function handleDeleteBtnClick() {
    console.log("handleDeleteBtnClick");
    dispatch(deleteSelectedContents());
  }

  function handleShareBtnClick() {
    dispatch(mapSelectedContentsToSelectedLinksIds());
    navigate("/sharelinks");
  }

  const mainBtnClass =
    "p-2 px-2 flex items-center justify-center text-xs bg-gray-300 h-10 rounded-xl min-w-24 max-w-24 uppercase hover:bg-gray-600 text-xs text-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed";

  function handelAddLinksToCategory() {
    dispatch(mapSelectedContentsToSelectedLinksIds());
    navigate("/linkmanagement/addlinkstocategory");
  }

  return (
    <div className="left flex gap-2 z-20 p-4">
      <button
        className={mainBtnClass}
        disabled={isCategorySelected}
        title={isCategorySelected ? "Category selected!" : "Move to a category"}
        onClick={handelAddLinksToCategory}
      >
        Move to a category
      </button>
      <button className={mainBtnClass} onClick={handleShareBtnClick}>
        Share
      </button>
      <button className={mainBtnClass} onClick={handleDeleteBtnClick}>
        Delete selected
      </button>
    </div>
  );
}
