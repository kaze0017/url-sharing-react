import React from "react";

interface Props {
  title: string;
}

export default function SubmenuTitle({ title }: Props) {
  return (
    <div className="border-b-2 border-indigo-800 p-2 mb-2">
      <h3 className="text-md">{title}</h3>
    </div>
  );
}
