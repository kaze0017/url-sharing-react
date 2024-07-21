import { useState } from "react";

type Option = {
  label: string;
  action: () => void;
};

interface DropDownProps {
  title: string;
  options: Option[];
}
export default function DropDownBtn(props: DropDownProps): JSX.Element {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="w-20 h-8 flex items-center justify-center relative text-xs uppercase">
      <div
        className="text-lg select-none w-full h-full hover:bg-gray-300 flex items-center justify-center border border-gray-900 cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        {props.title}
      </div>
      <div
        className={`absolute top-full right-0 w-20 flex flex-col items-center bg-white border border-gray-900 mt-1 transition-all-300 ${
          collapsed ? "hidden" : "block"
        }`}
      >
        {props.options.map((option) => (
          <div
            key={option.label}
            className="select-none w-full text-center cursor-pointer hover:bg-slate-300"
            onClick={option.action}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
