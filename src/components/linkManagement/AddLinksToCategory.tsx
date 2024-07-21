import React, { useEffect } from "react";
import Table from "./table/Table";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { CategoryType } from "../../lib/interfaces/categoryType";
import { ContentType } from "../../lib/interfaces/contentType";
import mapCategoryToContent from "../../lib/functions/mapCategoryToContent";
import { setContentToDisplay } from "../../state/linkManagement/linkManagementSlice";
import AddLinksToCategoryController from "./controllers/AddLinksToCategoryController";

export default function AddLinksTOCategoryController() {
  const { userCategories } = useSelector((state: RootState) => state.category);
  const { showFilter } = useSelector(
    (state: RootState) => state.linkManagement
  );
  const { selectedContents } = useSelector(
    (state: RootState) => state.linkManagement
  );

  const contentsToDisplay = userCategories.map((category: CategoryType) => {
    return mapCategoryToContent(category);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setContentToDisplay(contentsToDisplay));
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <AddLinksToCategoryController />
      <Table showFilter={showFilter} />
    </div>
  );
}
