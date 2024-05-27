import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useEffect, useReducer, useState } from "react";

type Person = {
  select: boolean;
  photo: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    select: false,
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    select: false,
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
    photo: "https://randomuser.me/api/portraits/men/77.jpg",
  },
  {
    select: false,
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
    photo: "https://randomuser.me/api/portraits/men/78.jpg",
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("select", {
    header: ({ table }) => (
      <input
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
        type="checkbox"
      />
    ),
    cell: ({ row }) => (
      <input
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
        type="checkbox"
      />
    ),
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("photo", {
    header: () => "Photo",
    cell: (info) => (
      <img
        className="rounded-lg h-16 aspect-video mx-auto"
        src={info.getValue()}
        alt="person"
      />
    ),

    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    header: () => <span>First Name</span>,
    // footer: (info) => info.column.id,
  }),

  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
    // footer: (info) => info.column.id,
  }),
];

export default function Table2({columns, data, showFilter} : {columns: any[], data: any[], showFilter: boolean}) {
  // const [data, _setData] = useState(() => [...defaultData]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});


  const table = useReactTable({
    data,
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



  return (
    <div className="p-2 text-xs uppercase flex w-full flex-col gap-2">
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
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan} className="px-1">
                    {header.isPlaceholder ? null : (
                      <div>
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
