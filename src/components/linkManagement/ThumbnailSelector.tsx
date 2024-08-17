import React, { useState, useEffect } from "react";
import Slider from "./Slider";
import { thumbnails } from "../../lib/placeholder-data";
import { FiUploadCloud } from "react-icons/fi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Backdrop } from "@mui/material";

interface ThumbnailSelectorProps {
  setSelectedImage: (image : string) => void;
  selectedImage?: string;
}

export default function ThumbnailSelector({
  setSelectedImage,
}: ThumbnailSelectorProps) {
  const [filteredThumbnails, setFilteredThumbnails] = useState(thumbnails);
  const [searchTerm, setSearchTerm] = useState("");

  function alertForUpload() {
    alert("Upload feature not implemented yet 😊");
  }

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredThumbnails(thumbnails);
    } else {
      setFilteredThumbnails(
        thumbnails.filter((thumbnail) =>
          // check if any tag includes the search term
          thumbnail.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    }
  }, [searchTerm]);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden p-2 z-50">
      <div className="w-full flex p-1 justify-between items-center">
        <p>Search for tags</p>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-2/3 p-2 border-b-2 border-gray-300 focus:outline-none "
        />
      </div>
      {/* <Slider
        thumbnails={filteredThumbnails}
        setSelectedImage={setSelectedImage}
      /> */}
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
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {filteredThumbnails.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="flex w-full justify-center">
                <img
                  src={img.url}
                  alt={img.tags.join(", ")}
                  className=" w-full object-cover aspect-video "
                  onClick={() => setSelectedImage(img.url)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex w-full justify-between items-center p-2 ">
        <p>Select from the gallery or upload a new one </p>
        <button onClick={alertForUpload}>
          <FiUploadCloud className="font-bold text-2xl" />
        </button>
      </div>
    </div>
  );
}
