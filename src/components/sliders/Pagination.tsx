import React, { useRef, useState, useEffect } from "react";
import { SharedLinkType } from "../../lib/interfaces";
import CardSharedLg from "../cards/CardSharedLg";

interface PaginationProps {
  sharedLinks: SharedLinkType[];
}

export default function Pagination({ sharedLinks }: PaginationProps) {
  const listInnerRef = useRef<HTMLDivElement>(null);

  const [currPage, setCurrPage] = useState(1); // storing current page number
  const [prevPage, setPrevPage] = useState(0); // storing prev page number
  const [links, setLinks] = useState<SharedLinkType[]>([]); // storing user list
  const [wasLastList, setWasLastList] = useState(false); // setting a flag to know the last list

  useEffect(() => {
    const fetchData = async () => {
      const response = sharedLinks.splice(0, 5);
      setLinks([...links, ...response]);
    };
    if (!wasLastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, wasLastList, prevPage]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  return (
    <div
      onScroll={onScroll}
      ref={listInnerRef}
      className="flex flex-col h-full w-full overflow-y-scroll gap-2"
    >
      {links.map((sharedLink, index) => {
        return <CardSharedLg key={index} sharedLink={sharedLink} />;
      })}
    </div>
  );
}
