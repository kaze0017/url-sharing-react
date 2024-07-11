import React, { useEffect, useState, useReducer } from "react";
import { SharedLinkType } from "../../../lib/interfaces";
import { ContentType } from "../../../lib/interfaces/contentType";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getFilteredRowModel,
  getPaginationRowModel,
  Column,
  PaginationState,
  getSortedRowModel,
  ColumnFiltersState,
  RowData,
} from "@tanstack/react-table";
import Filter from "../../trash/Filter";
declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

interface TableProps {
  contentsToDisplay: ContentType[];
  selectedContents: ContentType[];
  setSelectedContents: React.Dispatch<ContentType[]>;
  columns: any;
  showFilter?: boolean;
}

interface ExpandedSharedLinkType extends SharedLinkType {
  select: boolean;
}

export default function Table({
  contentsToDisplay,
  setSelectedContents,
  columns,
  showFilter,
}: TableProps) {
  console.log("Table -> contentsToDisplay", contentsToDisplay);
  const [data, _setData] = useState([...contentsToDisplay]);

  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data: contentsToDisplay,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
      rowSelection,
      pagination,
      columnFilters,
    },
    onColumnVisibilityChange: setColumnVisibility,
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
    columnResizeMode: "onChange",
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  useEffect(() => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    setSelectedContents(selectedRows.map((row) => row.original));
  }, [rowSelection]);
  return (
    <div className="p-2 text-xs uppercase h-full overflow-y-auto">
      {showFilter && (
        <div className="inline-block border border-gray-300 shadow rounded">
          <div className="px-1 border-b border-gray-300 p-2">
            <label>
              <input
                name="columnVisibility"
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
                      name="columnVisibility"
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
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className=" items-center text-center p-1 text-2xs"
                  >
                    {header.isPlaceholder ? null : (
                      <div className=" flex w-full items-center text-center justify-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter column={header.column} />
                      </div>
                    ) : null}
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
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            name="pageIndex"
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          name="pageSize"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="text-xs"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
