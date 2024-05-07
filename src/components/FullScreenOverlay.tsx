import React from "react";

interface FullScreenOverlayProps {
  children: React.ReactNode;
  display?: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FullScreenOverlay({
  children,
  display = false,
  setDisplay,
}: FullScreenOverlayProps) {
  const wrapperClass = display
    ? "fixed top-0 left-0 inset-0 bg-black bg-opacity-50 flex justify-center items-center w-full h-full z-50"
    : "hidden";
  return (
    <div className={wrapperClass}>
      <div className="relative w-full h-full flex items-center">
        <button
          onClick={() => setDisplay(false)}
          className="absolute bg-black bg-opacity-50 top-0 right-0 w-16 h-16 text-white"
        >
          Close
        </button>
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
}
