import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { SharedLinkType } from "../lib/interfaces";

interface GrabScrollProps {
  sharedLinks: SharedLinkType[];
  Component: React.FC<{ sharedLink: SharedLinkType; width: number }>;
  width: number;
}

export default function GrabScroll({
  sharedLinks,
  Component,
  width,
}: GrabScrollProps) {
  const mainWrapperClass =
    "relative p-2 max-h-full row flex flex-wrap gap-x-2 gap-y-2 overflow-x-scroll overflow-y-scroll scrollbar-hide min-w-full";

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  return (
    <div className={mainWrapperClass} {...events} ref={ref}>
      {sharedLinks.map((item, index) => (
        <Component key={index} sharedLink={item} width={width} />
      ))}
    </div>
  );
}
