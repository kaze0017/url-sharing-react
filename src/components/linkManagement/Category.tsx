import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { ContentType } from "../../lib/interfaces/contentType";
import { SharedLinkType } from "../../lib/interfaces";
import Table from "./table/Table";
import { setContentToDisplay, setSelectedContents } from "../../state/linkManagement/linkManagementSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { CategoryType } from "../../lib/interfaces/categoryType";
import mapLinkToContent from "../../lib/functions/mapLinkToContent";

export default function Category() {
  const { id } = useParams();
  const category_id = parseInt(id as string);

  const { userCategories } = useSelector((state: RootState) => state.category);
  const categoryToDisplay = userCategories.find(
    (category) => category.category_id === category_id
  );
  const contentsToDisplay = categoryToDisplay?.links.map((link) => {
    return mapLinkToContent(link);
  });

  

  const dispatch = useDispatch<AppDispatch>();
  console.log("category_id", categoryToDisplay);
  console.log("contentsToDisplay from category", contentsToDisplay);

  const {
    selectedContents,
    type,
    query,
    viewSize,
    timeSensitive,
    showSelector,
    showFilter,
    contentClass,
  } = useSelector((state: RootState) => state.linkManagement);
  useEffect(() => {
    dispatch(setContentToDisplay(contentsToDisplay || []));
  }, []);

  return (
    <div>
      <Table showFilter={showFilter} />
    </div>
  );
}
