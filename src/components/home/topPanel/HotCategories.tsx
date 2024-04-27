import CategoryHot from "../../cards/CategoryHot";
import { getTopCategories } from "../../../lib/actions";
import SliderRow from "../../sliders/SliderRow";

export default function HotCategories() {
  const categoryHotWrapperClass = `flex overflow-auto w-full p-2`;
  return (

    <SliderRow
      CardComponent={CategoryHot}
      getData={getTopCategories}
      cardsSize="medium"
      cardType="category"
    />
  );
}
