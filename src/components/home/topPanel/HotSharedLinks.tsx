"use client";
import React, { useEffect, useState } from "react";
import { getTopSharedLinks } from "../../../lib/actions";
import CardHot from "../../cards/CardHot";
import SliderRow from "../../sliders/SliderRow";

interface HotSharedLinksProps {
  mode: "wall" | "link";
}

export default function HotSharedLinks({ mode }: HotSharedLinksProps) {
  const [numberOfDisplayedImages, setNumberOfDisplayedImages] =
    React.useState(0);

  const [data, setData] = useState([]); // State to hold carousel data
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [hasMore, setHasMore] = useState(true); // State to track if there's more data to fetch

  const numberOfimagesOnEachCal = 7;

  // get top shared links
  const topSharedLinks = getTopSharedLinks();
  const wrapperClass = `w-[100%]`;
  const CARDS = CARDS_DETAILS();

  // Develope Pagination

  useEffect(() => {
    if (numberOfDisplayedImages === numberOfimagesOnEachCal) {
      setNumberOfDisplayedImages(0);
    }
  }, [numberOfDisplayedImages]);

  const fetchData = () => {
    setLoading(true);
    // setTimeout(() => {
    //   const newData = [];
    //   if (newData.length === 0) {
    //     setHasMore(false);
    //   }
    //   setData((prevData) => [...prevData, ...newData]);
    //   setLoading(false);
    // }, 1000);
  };

  const handleScroll = (event: any) => {
    const bottom =
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight;
    if (bottom && !loading && hasMore) {
      // If scrolled to bottom and not loading and there's more data, fetch more data
      fetchData();
    }
  };

  return (
    <div className={wrapperClass}>
      <SliderRow
        CardComponent={CardHot}
        getData={getTopSharedLinks}
        cardsSize="medium"
      />
    </div>
  );
}

function CARDS_DETAILS() {
  return [
    {
      image: "https://random.imagecdn.app/200/150",
      title: "A beautiful image",
      // description: "This is a beautiful image",
      url: "https://unsplash.com/photos/4",
    },
    {
      image: "https://random.imagecdn.app/200/150",
      title: "A beautiful image",
      // description: "This is a beautiful image",
      url: "https://unsplash.com/photos/4",
    },
    {
      image: "https://random.imagecdn.app/200/150",
      title: "A beautiful image",
      // description: "This is a beautiful image",
      url: "https://unsplash.com/photos/4",
    },
    {
      image: "https://random.imagecdn.app/200/150",
      title: "A beautiful image",
      // description: "This is a beautiful image",
      url: "https://unsplash.com/photos/4",
    },
    {
      image: "https://random.imagecdn.app/200/150",
      title: "A beautiful image",
      // description: "This is a beautiful image",
      url: "https://unsplash.com/photos/4",
    },
    {
      image: "https://random.imagecdn.app/200/150",
      title: "A beautiful image",
      // description: "This is a beautiful image",
      url: "https://unsplash.com/photos/4",
    },
    {
      image: "https://random.imagecdn.app/200/150",
      title: "A beautiful image",
      // description: "This is a beautiful image",
      url: "https://unsplash.com/photos/4",
    },
  ];
}
