import React from "react";
import SubmenuTitle from "./SubmenuTitle";

interface Props {
  children: React.ReactNode;
  title: string;
}

export default function SubSettingContainer({ children, title }: Props) {
  return (
    <div className="w-full h-full flex flex-col gap-1 p-2">
      <SubmenuTitle title={title} />
      {children}
    </div>
  );
}
