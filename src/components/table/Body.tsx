import React, { useEffect, useState } from "react";

export default function Body({
  data,
  columnsToDisplay,
  columnsWidth,
  maxWidth,
}: {
  data: any[];
  columnsToDisplay: string[];
  columnsWidth: { [key: string]: number };
  maxWidth: number;
}) {
  return (
    <div
      // style={{
      //   maxWidth: `${maxWidth}px`,
      //   width: `${maxWidth}px`,
      //   minWidth: `${maxWidth}px`,
      // }}
      className="flex flex-col flex-grow"
    >
      {data.map((row, index) => {
        return (
          <div key={index} className="flex">
            {columnsToDisplay.map((column, index) => {
              return column === "check" ? (
                <div
                  key={index}
                  className="flex justify-center items-center"
                  style={{ width: columnsWidth[column] }}
                >
                  <input key={index} type="checkbox" className="w-6 h-6" />
                </div>
              ) : (
                <div
                  key={index}
                  style={{ width: columnsWidth[column] }}
                  className="flex justify-center items-center overflow-hidden border"
                >
                  {row[column]}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
