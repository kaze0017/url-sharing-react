import { useEffect, useState } from "react";
import CardCategoryHot from "../../cards/CardCategoryHot";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../state/store";
import { loadHotCategories } from "../../../state/home/topContentsSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function CardHotCategories() {

  const { hotCategories } = useSelector(
    (state: RootState) => state.hotContents
  );

  const [controlledSwiper, setControlledSwiper] = useState(null);

  return (
    <div className="inline_container">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          400: {
            slidesPerView: 2,
          },
          639: {
            slidesPerView: 3,
          },
          1700: {
            slidesPerView: 4,
          },
        }}
        navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
      >
        {hotCategories.map((category, index) => (
          <SwiperSlide key={index}>
            <div className="flex w-full justify-center">
              <CardCategoryHot link={category} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

{
  /* <SliderRow
  CardComponent={CardCategoryHot}
  data={hotCategories}
  cardsSize="medium"
  cardType="category"
/> */
}
