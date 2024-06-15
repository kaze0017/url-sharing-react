import CardCategoryHot from "../../cards/CardCategoryHot";
import { getTopSharedCategories } from "../../../api/getTopSharedCategories";
import SliderRow from "../../sliders/SliderRow";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";

export default function CardHotCategories() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";

  return (
    <SliderRow
      CardComponent={CardCategoryHot}
      getData={getTopSharedCategories}
      token={token}
      cardsSize="medium"
      cardType="category"
    />
  );
}
