import React from "react";

interface SingleBtnProps {
  title: string;
  action: () => void;
}

export default function SingleBtn(props: SingleBtnProps): JSX.Element {
  return (
    <div
      className="text-xs select-none w-full max-w-28 h-full hover:bg-gray-300 flex items-center justify-center border border-gray-900 cursor-pointer"
      onClick={props.action}
    >
      {props.title}
    </div>
  );
}
