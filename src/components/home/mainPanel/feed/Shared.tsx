"use client";
import React, { useEffect } from "react";
import CardSharedLg from "../../../cards/CardSharedLg";
import { getSharedLinks } from "../../../../lib/actions";
import Search from "./shared/Search";
import Sort from "./shared/Sort";
import GrabScroll from "../../../GrabScroll";

export default function Shared() {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState("saved");
  const [sharedLinksToDisplay, setSharedLinksToDisplay] =
    React.useState(getSharedLinks);

  useEffect(() => {
    // Filter the shared links based on the query

    const filteredLinks = sharedLinksToDisplay.filter((sharedLink) =>
      sharedLink.title.toLowerCase().includes(query.toLowerCase())
    );
    if (query === "") {
      setSharedLinksToDisplay(getSharedLinks);
    } else setSharedLinksToDisplay(filteredLinks);
  }, [query]);

  useEffect(() => {
    console.log(sort);
    // Sort the shared links based on the query
    const sortedLinks = [...sharedLinksToDisplay].sort((a, b) => {
      if (sort === "saved") {
        return b.savedCount - a.savedCount;
      } else if (sort === "shared") {
        return b.sharedCount - a.sharedCount;
      } else {
        return b.rankCount - a.rankCount;
      }
    });
    setSharedLinksToDisplay(sortedLinks);
  }, [sort]);

  return (
    <div className="w-full flex flex-col gap-2 p-2">
      <Search query={query} setQuery={setQuery} />
      <Sort setSort={setSort} />
      {/* <SliderGrid
        CardComponent={CardSharedLg}
        getData={getSharedLinks}
        cardSize="large"
        cardType="link"
        query={query}
        sort={sort}
      /> */}
      <GrabScroll
        sharedLinks={sharedLinksToDisplay}
        Component={CardSharedLg}
        width={600}
      />
    </div>
  );
}
