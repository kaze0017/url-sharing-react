"use client";
import React, { useEffect, useState, useContext } from "react";
import { getTopSharedLinks } from "../../../api/getTopSharedLinks";
import CardLinkHot from "../../cards/CardLinkHot";
import SliderRow from "../../sliders/SliderRow";
import { SharedLinkType } from "../../../lib/interfaces";
import AuthContext from "../../../context/AuthProvider";

interface HotSharedLinksProps {
  mode: "wall" | "link";
}

export default function HotSharedLinks({ mode }: HotSharedLinksProps) {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const [numberOfDisplayedImages, setNumberOfDisplayedImages] =
    React.useState(0);

  const [loading, setLoading] = useState(false); // State to manage loading state
  const [hasMore, setHasMore] = useState(false); // State to track if there's more data to fetch

  const numberOfimagesOnEachCal = 7;

  // get top shared links
  const [topSharedLinks, setTopSharedLinks] = useState<SharedLinkType[] | null>(
    []
  );

  useEffect(() => {
    getTopSharedLinks(token).then((data) => {
      setTopSharedLinks(data);
    });
  }, []);

  const wrapperClass = `w-[100%]`;

  // Develope Pagination

  useEffect(() => {
    if (numberOfDisplayedImages === numberOfimagesOnEachCal) {
      setNumberOfDisplayedImages(0);
    }
  }, [numberOfDisplayedImages]);

  const fetchData = () => {
    setLoading(true);
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
        CardComponent={CardLinkHot}
        getData={getTopSharedLinks}
        cardsSize="medium"
        token={token}
      />
    </div>
  );
}
