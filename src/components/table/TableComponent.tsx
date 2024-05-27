import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import Body from "./Body";

const columns: string[] = [
  "title",
  "owner",
  "category",
  "tags",
  "seen",
  "saved",
  "sharedCount",
  "savedCount",
  "rankCount",
];
const data = [
  {
    title: "apple",
    owner: "John Doe",
    category: "Fruit",
    tags: ["red", "green"],
    seen: 10,
    saved: 5,
    sharedCount: 3,
    savedCount: 10,
    rankCount: 1,
  },
  {
    title: "banana",
    owner: "Jane Doe",
    category: "Fruit",
    tags: ["yellow"],
    seen: 5,
    saved: 2,
    sharedCount: 1,
    savedCount: 5,
    rankCount: 2,
  },
  {
    title: "carrot",
    owner: "Jack Doe",
    category: "Vegetable",
    tags: ["orange"],
    seen: 3,
    saved: 1,
    sharedCount: 0,
    savedCount: 3,
    rankCount: 3,
  },
];

interface TableProps {
  maxWidth: number;
}

export default function TableComponent({ maxWidth }: TableProps) {
  const [columnsToDisplay, setColumnsToDisplay] = useState<string[]>([
    "check",
    ...columns,
  ]);
  const [columnsWidth, setColumnsWidth] = useState<{ [key: string]: number }>(
    {}
  );
  const [style, setWrapperStyle] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setWrapperStyle({ width: `${maxWidth}px` });
  }, [maxWidth]);
  console.log(maxWidth);
  return (
    <div className="flex flex-col" style={style}>
      <div className="flex">
        {columns.map((column, index) => {
          return (
            <input
              key={index}
              type="checkbox"
              checked={columnsToDisplay.includes(column)}
              onChange={(e) => {
                if (e.target.checked) {
                  setColumnsToDisplay([...columnsToDisplay, column]);
                } else {
                  setColumnsToDisplay(
                    columnsToDisplay.filter((col) => col !== column)
                  );
                }
              }}
            />
          );
        })}
      </div>

      <Header
        columns={columnsToDisplay}
        columnsWidth={columnsWidth}
        setColumnsWidth={setColumnsWidth}
        maxWidth={maxWidth}
      />
      <Body
        data={data}
        columnsToDisplay={columnsToDisplay}
        columnsWidth={columnsWidth}
        maxWidth={maxWidth}
      />
    </div>
  );
}
