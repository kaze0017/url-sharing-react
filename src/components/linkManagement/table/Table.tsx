
import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import Body from "./Body";
import { useDraggable } from "react-use-draggable-scroll";
import { SharedLinkType } from "../../../lib/interfaces";

interface TableProps {
  columns: Array<{
    id: string;
    title: string;
    icon?: React.ReactNode;
    display: boolean;
    width: number;
    grow: number;
  }>;
  setSelectedLinks: React.Dispatch<SharedLinkType[]>;
  selectedLinks: SharedLinkType[];
  sharedLinks: SharedLinkType[];
}

const Table: React.FC<TableProps> = ({
  columns,
  selectedLinks,
  setSelectedLinks,
  sharedLinks,
}) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const [columnsWidth, setColumnsWidth] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    function getAllColumnsWidth() {
      const newColumnsWidth: { [key: string]: number } = {};
      columns.forEach((column) => {
        const colElement = document.getElementById(`th-${column.id}`);
        if (colElement) {
          newColumnsWidth[column.id] =
            colElement.getBoundingClientRect().width <= 4
              ? 0
              : colElement.getBoundingClientRect().width;
        }
      });
      setColumnsWidth(newColumnsWidth);
    }

    getAllColumnsWidth();

    const resizeObserver = new ResizeObserver(getAllColumnsWidth);
    columns.forEach((column) => {
      const colElement = document.getElementById(`th-${column.id}`);
      if (colElement) {
        resizeObserver.observe(colElement);
      }
    });

    const tableElement = document.getElementById("table-1");
    tableElement?.addEventListener("resize", getAllColumnsWidth);

    return () => {
      resizeObserver.disconnect();
      tableElement?.removeEventListener("resize", getAllColumnsWidth);
    };
  }, [columns]);

  return (
    <div className="flex flex-col h-full gap-2 p-1 px-4" id="table-1">
      <div
        className="h-full relative flex flex-col overflow-x-scroll overflow-y-scroll scrollbar-hide min-w-full"
        {...events}
        ref={ref}
      >
        <Header columns={columns} columnsWidth={columnsWidth} />
        <Body
          columns={columns}
          columnsWidth={columnsWidth}
          sharedLinks={sharedLinks}
          selectedLinks={selectedLinks}
          setSelectedLinks={setSelectedLinks}
        />
      </div>
    </div>
  );
};

export default Table;
