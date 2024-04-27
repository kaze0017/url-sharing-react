import { useEffect, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

interface SliderFlexWrapperProps {
  thumbnails: Array<{
    url: string;
    tags: string[];
  }>;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Slider({
  thumbnails,
  setSelectedImage,
}: SliderFlexWrapperProps) {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  let scrollTimeout: NodeJS.Timeout | null = null;
  let lastScrollTop = 0; // Track last scroll position
  let lastDirection: "up" | "down" | null = null; // Track last scroll direction

  const handleScroll = () => {
    if (ref.current) {
      const scrollTop = ref.current.scrollTop;
      const scrollHeight = ref.current.scrollHeight;
      const clientHeight = ref.current.clientHeight;

      if (scrollTop === 0) {
        console.log("Reached the top of the container");
        handleScrollEnd("up");
      } else if (scrollTop + clientHeight === scrollHeight) {
        console.log("Reached the bottom of the container");
        handleScrollEnd("down");
      } else {
        clearTimeout(scrollTimeout as NodeJS.Timeout);
        lastScrollTop = scrollTop; // Update last scroll position
      }
    }
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
        // setIsLoading(true);
      }
    }, 1000);
  };

  useEffect(() => {
    // Clear timeout when component unmounts
    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  useEffect(() => {
    // Add event listener for wheel event
    const handleWheel = () => {
      clearTimeout(scrollTimeout as NodeJS.Timeout);
    };
    if (ref.current) {
      ref.current.addEventListener("wheel", handleWheel);
    }
    // Remove event listener when component unmounts
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, [scrollTimeout]);

  const width = 200;

  const wrapperClass = `flex w-full border gradientBorder p-4  gap-2 overflow-y-hidden overflow-x-scroll scrollbar-hide items-center mx-auto`;

  return (
    <div
      ref={ref}
      className={wrapperClass}
      style={{ width: "100%" }}
      {...events}
      onScroll={handleScroll}
    >
      {thumbnails.map((thumbnail, index) => (
        <img
          src={thumbnail.url}
          alt=""
          width={width}
          className="aspect-video"
          onClick={() => setSelectedImage(thumbnail.url)}
          key={index}
        />
      ))}
    </div>
  );
}
