import React from "react";
import { CategoryType } from "../../../lib/interfaces/categoryType";
interface TitleProps {
  categoryToDisplay: CategoryType;
}

export default function Title({ categoryToDisplay }: TitleProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="">
        <h1 className="text-2xl font-semibold">
          Category: {categoryToDisplay?.title}
        </h1>
        <p className="text-sm text-gray-500">
          {categoryToDisplay.links.length}
          {categoryToDisplay.links.length === 1 ? "link" : "links"}
        </p>
      </div>
      <div className="">
        <h2>Description</h2>
        <p>{categoryToDisplay?.contentDescription}</p>
      </div>
    </div>
  );
}
