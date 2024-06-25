import { useEffect, useRef } from "react";
import { SharedLinkType } from "../../lib/interfaces";
import { useDraggable } from "react-use-draggable-scroll";

import CardSharedMd from "../cards/CardSharedMd";
import CardSharedSm from "../cards/CardSharedSm";
import CardSharedXs from "../cards/CardSharedXs";
import LazyLoad from "react-lazyload";

interface SliderFlexWrapperProps {
  CardComponent: React.ComponentType<any>;
  sharedLinks: SharedLinkType[];
  setIsLoading: React.Dispatch<React.SetStateAction<true | false>>;
  multi?: boolean;
}

export default function SliderFlexWrapper({
  sharedLinks,
  CardComponent,
  setIsLoading,
  multi,
}: SliderFlexWrapperProps) {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  let scrollTimeout: NodeJS.Timeout | null = null;
  let lastScrollTop = 0; // Track last scroll position
  let lastDirection: "up" | "down" | null = null; // Track last scroll direction

  const handleScroll = () => {
    // if (ref.current) {
    //   const scrollTop = ref.current.scrollTop;
    //   const scrollHeight = ref.current.scrollHeight;
    //   const clientHeight = ref.current.clientHeight;

    //   if (scrollTop === 0) {
    //     handleScrollEnd("up");
    //   } else if (scrollTop + clientHeight === scrollHeight) {
    //     handleScrollEnd("down");
    //   } else {
    //     clearTimeout(scrollTimeout as NodeJS.Timeout);
    //     lastScrollTop = scrollTop; // Update last scroll position
    //   }
    // }
  };

  const handleScrollEnd = (direction: "up" | "down") => {
    // If scrolling continues in the same direction, log a message after 1 second
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    lastDirection = direction; // Update last direction
    scrollTimeout = setTimeout(() => {
      if (lastDirection === direction) {
        console.log(`Continued scrolling ${direction} for 1 second`);
        setIsLoading(true);
      }
    }, 1000);
  };

  useEffect(() => {
    // Clear timeout when component unmounts
    // return () => {
    //   if (scrollTimeout) {
    //     clearTimeout(scrollTimeout);
    //   }
    // };
  }, []);

  useEffect(() => {
    // Add event listener for wheel event
    // const handleWheel = () => {
    //   clearTimeout(scrollTimeout as NodeJS.Timeout);
    // };
    // if (ref.current) {
    //   ref.current.addEventListener("wheel", handleWheel);
    // }
    // // Remove event listener when component unmounts
    // return () => {
    //   if (ref.current) {
    //     ref.current.removeEventListener("wheel", handleWheel);
    //   }
    // };
  }, [scrollTimeout]);

  const gridItems = [];

  for (let i = 0; i < sharedLinks.length; i += 8) {
    const currentGroup = sharedLinks.slice(i, i + 8);
    gridItems.push(
      // <div key={i} className="flex flex-wrap gap-2">
      <>
        <CardSharedMd sharedLink={currentGroup[0]} />
        <div className="flex flex-col gap-1 justify-between">
          <div className="flex justify-between w-full">
            <CardSharedXs sharedLink={currentGroup[1]} />
            <CardSharedXs sharedLink={currentGroup[2]} />
          </div>
          <CardSharedSm sharedLink={currentGroup[3]} />
          <div className="flex justify-between w-full">
            <CardSharedXs sharedLink={currentGroup[4]} />
            <CardSharedXs sharedLink={currentGroup[5]} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <CardSharedSm sharedLink={currentGroup[6]} />
          <CardSharedSm sharedLink={currentGroup[7]} />
        </div>
      </>
      // </div>
    );
  }

  const wrapperClass = `p-2 h-full  flex flex-wrap gap-2 overflow-x-hidden overflow-y-scroll scrollbar-hide items-center mx-auto justify-center`;
  if (multi === true) {
    return (
      <div
        ref={ref}
        className={wrapperClass}
        {...events}
        onScroll={handleScroll}
      >
        {gridItems}
      </div>
    );
  } else {
    return (
      <div
        ref={ref}
        className={wrapperClass}
        style={{ width: "100%" }}
        {...events}
        onScroll={handleScroll}
      >
        {sharedLinks.map((sharedLink, index) => (
          <CardComponent key={index} sharedLink={sharedLink} />
        ))}
      </div>
    );
  }
}
