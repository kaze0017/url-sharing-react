"use client";
import React from "react";
import SharedLinkCard from "../../cards/SharedLinkCard";
import { getSharedLinks } from "../../../lib/actions";
import { useState } from "react";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { FiList } from "react-icons/fi";
import { SlMagnifier } from "react-icons/sl";
import { FiVideo } from "react-icons/fi";
import { FiImage } from "react-icons/fi";
import { GrDocumentConfig } from "react-icons/gr";
import Shared from "./feed/Shared";
import Wall from "./feed/Wall";
import Trend from "./feed/Trend";

interface feedProps {
  mode: string;
}

export default function Feed(props: feedProps) {
  const mainWrapperClass = `flex gap-1 panel-light overflow-auto grow`;

  return (
    <div className={mainWrapperClass}>
      {props.mode === "shared" ? <Shared /> : null}
      {props.mode === "wall" ? <Wall /> : null}
      {props.mode === "trend" ? <Trend /> : null}
    </div>
  );
}
//   const sharedLinks = getSharedLinks();
//   const [linksToDisplay, setLinksToDisplay] = useState(sharedLinks);
//   const [displayStyle, setDisplayStyle] = useState<"grid" | "list">("grid");
//   const [activeType, setActiveType] = useState("all");

//   function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
//     const searchValue = event.target.value;
//     const filteredLinks = sharedLinks.filter((sharedLink) =>
//       sharedLink.title.toLowerCase().includes(searchValue.toLowerCase())
//     );
//     setLinksToDisplay(filteredLinks);
//   }

//   function handleType(type: string) {
//     if (type === "all") {
//       setLinksToDisplay(sharedLinks);
//       return;
//     }
//     const filteredLinks = sharedLinks.filter((sharedLink) =>
//       sharedLink.type.includes(type)
//     );
//     setLinksToDisplay(filteredLinks);
//   }

//   const feedWrapperClass = `flex flex-col gap-1 panel-light overflow-hidden`;
//   const postsWrapperClass = `flex flex-wrap gap-1 justify-center overflow-y-auto`;

//   return (
//     <div className={feedWrapperClass}>
//       {/* Controller */}
//       <div className="controller border-b-2 p-2 border-gray-500 flex items-center justify-center text-gray-900 gap-10">
//         {/* Display */}
//         <div className="">
//           <button
//             className="text-ms text-gray-900"
//             onClick={() => setDisplayStyle("grid")}
//           >
//             <TfiLayoutGrid3 />
//           </button>
//           <button
//             className="text-ms text-gray-900"
//             onClick={() => setDisplayStyle("list")}
//           >
//             <FiList />
//           </button>
//         </div>
//         {/* Category */}
//         <div className="flex gap-2">
//           <ControlsBtn
//             onClick={() => handleType("all")}
//             icon={<GrDocumentConfig />}
//             value="all"
//             activeType={activeType}
//             setActiveType={setActiveType}
//           />
//           <ControlsBtn
//             onClick={() => handleType("video")}
//             icon={<FiVideo />}
//             value="video"
//             activeType={activeType}
//             setActiveType={setActiveType}
//           />
//           <ControlsBtn
//             onClick={() => handleType("image")}
//             icon={<FiImage />}
//             value="image"
//             activeType={activeType}
//             setActiveType={setActiveType}
//           />
//         </div>
//         {/* Flex Grow */}
//         <div className="flex grow"></div>
//         {/* Search */}
//         <div className="flex gap-2 items-center justify-center">
//           <div className="flex text-lg items-center justify-center h-full">
//             <SlMagnifier />
//           </div>
//           <input
//             type="text"
//             placeholder="Search"
//             className="rounded-md panel-light p-1 focus:outline-none text-sm"
//             onChange={handleSearch}
//           />
//         </div>
//       </div>
//       <div className={postsWrapperClass}>
//         {linksToDisplay.map((sharedLink, index) => (
//           <SharedLinkCard
//             key={index}
//             // width="w-1/3"
//             variant={displayStyle}
//             size="medium"
//             sharedLink={sharedLink}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // ControlBtns Interface
// interface ControlBtnsProps {
//   onClick: () => void;
//   icon: React.ReactNode;
//   value: string;
//   setActiveType: (type: string) => void;
//   activeType: string;
// }

// function ControlsBtn({
//   onClick,
//   icon,
//   activeType,
//   setActiveType,
//   value,
// }: ControlBtnsProps) {
//   return (
//     <div
//       className={`flex p-1 text-ms text-gray-900 ${
//         activeType === value ? "bg-gray-500" : ""
//       }`}
//       onClick={() => {
//         onClick();
//         setActiveType(value);
//       }}
//     >
//       {icon}
//     </div>
//   );
// }
