import { HiOutlineLink } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { Badge, Grid } from "@mui/material";

export default function PageTitleComponent() {
  const navigate = useNavigate();
  const selectedLinkIds = useSelector(
    (state: RootState) => state.link.selectedLinkIds
  );
  const selectedCategoriesIds = useSelector(
    (state: RootState) => state.category.selectedCategoriesIds
  );
  // const MainWrapperClass = "flex gap-5 uppercase";
  const iconsClass = "text-indigo-600 text-4xl font-bold ml-2";
  function handelClick() {
    navigate("/linkmanagement");
  }
  return (
    // <div className={MainWrapperClass} onClick={handelClick}>
    <Grid container spacing={2} sx={{ width: "100px" }}>
      <Grid xs={6}>
        <Badge badgeContent={selectedLinkIds.length} color="success">
          <LinkOutlinedIcon color="action" />
        </Badge>
      </Grid>
      <Grid xs={6}>
        <Badge badgeContent={selectedCategoriesIds.length} color="success">
          <CategoryOutlinedIcon color="action" />
        </Badge>
      </Grid>
    </Grid>
    // </div>
  );
}
