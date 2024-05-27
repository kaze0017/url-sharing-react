import React, { useRef, useEffect, useState } from "react";

interface HeaderProps {
  columns: string[];
  columnsWidth: { [key: string]: number };
  setColumnsWidth: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  maxWidth: number;
}

export default function Header({
  columns,
  columnsWidth,
  setColumnsWidth,
  maxWidth,
}: HeaderProps) {
  const [rendering, setRendering] = useState<boolean>(false);
  const [wrapperClass, setWrapperClass] = useState<string>("");
  const columnRefs = useRef<Array<HTMLDivElement | null>>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const cellWrapperClass = `flex justify-center items-center overflow-hidden border flex-grow`;




  useEffect(() => {
    // Update column widths when columnsWidth prop changes

    columnRefs.current.forEach((ref, index) => {
      ref?.style.setProperty("width", "0px");
      ref?.style.removeProperty("width");
      setColumnsWidth((prev) => {
        return {
          ...prev,
          [columns[index]]: ref?.getBoundingClientRect().width || 0,
        };
      });
    });
  }, [columns, wrapperRef.current]);

  return (
    <div
      className="flex  flex-grow"

    >
      {columns.map((column, index) => {
        return (
          <div
            key={index}
            ref={(el) => (columnRefs.current[index] = el)}
            className={cellWrapperClass}
          >
            {column}
          </div>
        );
      })}
    </div>
  );
}
