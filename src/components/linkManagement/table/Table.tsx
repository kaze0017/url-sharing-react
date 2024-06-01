import React, { useEffect, useState, useReducer } from "react";
import { SharedLinkType } from "../../../lib/interfaces";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

interface TableProps {
  columns: any;
  setSelectedLinks: React.Dispatch<SharedLinkType[]>;
  selectedLinks: SharedLinkType[];
  sharedLinks: SharedLinkType[];
  showFilter?: boolean;
}

interface ExpandedSharedLinkType extends SharedLinkType {
  select: boolean;
}

// const columnHelper = createColumnHelper<ExpandedSharedLinkType>();

// const columns: any = [
//   columnHelper.accessor("select", {
//     header: ({ table }) => (
//       <input
//         checked={table.getIsAllRowsSelected()}
//         onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
//         type="checkbox"
//       />
//     ),
//     cell: ({ row }) => (
//       <input
//         checked={row.getIsSelected()}
//         disabled={!row.getCanSelect()}
//         onChange={row.getToggleSelectedHandler()}
//         type="checkbox"
//       />
//     ),
//     // footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("thumbnail", {
//     header: "Thumbnail",
//     cell: (info) => (
//       <img
//         className="rounded-lg h-16 aspect-video mx-auto"
//         src={info.getValue()}
//         alt="thumbnail"
//       />
//     ),
//   }),
//   columnHelper.accessor("title", {
//     header: "Title",
//     cell: (info) => info.renderValue(),
//   }),
//   columnHelper.accessor("description", { header: "Description" }),
// ];

export default function Table({
  sharedLinks,
  setSelectedLinks,
  columns,
  showFilter,
}: TableProps) {
  const [data, _setData] = useState([...sharedLinks]);

  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data: sharedLinks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
      rowSelection,
    },
    onColumnVisibilityChange: setColumnVisibility,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    columnResizeMode: "onChange",
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    setSelectedLinks(selectedRows.map((row) => row.original));
  }, [rowSelection]);
  return (
    <div className="p-2 text-xs uppercase h-full overflow-y-auto">
      {showFilter && (
        <div className="inline-block border border-gray-300 shadow rounded">
          <div className="px-1 border-b border-gray-300 p-2">
            <label>
              <input
                {...{
                  type: "checkbox",
                  checked: table.getIsAllColumnsVisible(),
                  onChange: table.getToggleAllColumnsVisibilityHandler(),
                }}
              />{" "}
              Toggle All
            </label>
          </div>
          <div className="flex w-full flex-wrap gap-2 p-2">
            {table.getAllLeafColumns().map((column) => {
              return (
                <div
                  key={column.id}
                  className="px-1 flex w-[150px] items-center"
                >
                  <label>
                    <input
                      {...{
                        type: "checkbox",
                        checked: column.getIsVisible(),
                        onChange: column.getToggleVisibilityHandler(),
                      }}
                    />{" "}
                    {column.id}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <table className="w-full ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div className="p1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const isSelected = row.getIsSelected();
            return (
              <tr
                key={row.id}
                className={
                  "text-center border-b-2" +
                  (isSelected ? " bg-green-100 bg-opacity-60" : "")
                }
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="py-1 text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
