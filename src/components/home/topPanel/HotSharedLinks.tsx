"use client";
import React, { useEffect, useState, useContext } from "react";
import { getTopSharedLinks } from "../../../api/gets/getTopSharedLinks";
import CardLinkHot from "../../cards/CardLinkHot";
import SliderRow from "../../sliders/SliderRow";
import { SharedLinkType } from "../../../lib/interfaces";
import AuthContext from "../../../context/AuthProvider";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../state/store";
import { loadHotLinks } from "../../../state/home/topContentsSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface HotSharedLinksProps {
  mode: "wall" | "link";
}

export default function HotSharedLinks({ mode }: HotSharedLinksProps) {
  const { hotLinks } = useSelector((state: RootState) => state.hotContents);

  const wrapperClass = `w-[100%]`;

  const [isLoaded, setIsLoaded] = useState(true);



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
        {hotLinks.map((link, index) => (
          <SwiperSlide key={index}>
            <CardLinkHot link={link} variant="medium" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
