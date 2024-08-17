import { useEffect, useState, useReducer } from "react";
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
import { RiShareForwardLine } from "react-icons/ri";
import { PiChartLineUp } from "react-icons/pi";
import { TfiTag } from "react-icons/tfi";
import Type from "./body/Type";
import PublicationDate from "./body/PublicationDate";
import ExpirationDate from "./body/ExpirationDate";
import Count from "./body/Count";
import QrCode from "./body/QrCode";
import ShortLink from "./body/ShortLink";
import ClassIcon from "./body/ClassIcon";
import ProfilePicture from "../../profilePictures/ProfilePicture";
import { SharedLinkType, UserProfileType } from "../../../lib/interfaces";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../state/store";
import {
  setSelectedContents,
  setSelectedContentsLinksCategories,
  setShowFilter,
} from "../../../state/linkManagement/linkManagementSlice";
import Backdrop from "@mui/material/Backdrop";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { text } from "d3";
import { Button, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

interface TableProps {
  selectedContents?: ContentType[];
  // setSelectedContents: React.Dispatch<ContentType[]>;
  columns?: any;
  showFilter?: boolean;
}

interface ExpandedSharedLinkType extends SharedLinkType {
  select: boolean;
}

export default function Table({
  columns = createColumns(),
  showFilter,
}: TableProps) {
  const contentsToDisplay = useSelector(
    (state: RootState) => state.linkManagement.contentsToDisplay
  );
  const [data, _setData] = useState([...contentsToDisplay]);
  const dispatch = useDispatch<AppDispatch>();

  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const rerender = useReducer(() => ({}), {})[1];
  // const links = contentsToDisplay.map((content) => {
  //   return content.link;
  // });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
    dispatch(
      setSelectedContentsLinksCategories(
        selectedRows.map((row) => {
          return row.original;
        })
      )
    );
  }, [rowSelection]);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    dispatch(setShowFilter(false));
  };

  return (
    <div className="p-2 text-xs uppercase h-full overflow-y-auto">
      <Drawer open={showFilter} onClose={() => handleClose()} anchor="top">
        <div className="inline-block border border-gray-300 shadow rounded">
          <div className="px-4 border-b border-gray-300 p-2 flex justify-between ">
            <FormControlLabel
              control={
                <Checkbox
                  checked={table.getIsAllColumnsVisible()}
                  onChange={table.getToggleAllColumnsVisibilityHandler()}
                />
              }
              label="Select All"
            />
            <Button onClick={handleClose}>Close</Button>
          </div>
          <div className="flex w-full flex-wrap gap-2 p-2">
            <div className="scontainer">
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1} sx={{ textAlign: "left" }}>
                  {table.getAllLeafColumns().map((column) => {
                    return (
                      <Grid sm={6} md={3} key={column.id} xs={12}>
                        <Item>
                          <Typography align="left" variant="h6">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={column.getIsVisible()}
                                  onChange={column.getToggleVisibilityHandler()}
                                />
                              }
                              label={column.id}
                            />
                          </Typography>
                        </Item>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      </Drawer>
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

function createColumns() {
  // const navigate = useNavigate();
  function handelClickOnThumbnail(id: any, contentClass: "link" | "category") {
    console.log("id: ", id);

    // navigate(`/editLink/${id}`);
  }
  interface ExpandedContentType extends ContentType {
    select: boolean;
    status: boolean;
  }
  const columnHelper = createColumnHelper<ExpandedContentType>();

  let tableColumns = [
    columnHelper.accessor("select", {
      header: ({ table }) => (
        <div className="p-1">
          <input
            name="select-all"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            type="checkbox"
          />
        </div>
      ),
      enableColumnFilter: false,

      cell: ({ row }) => (
        <div className="p-1">
          <input
            name="select-row"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            type="checkbox"
          />
        </div>
      ),
    }),
    columnHelper.accessor("contentClass", {
      header: "Class",
      cell: (info) => <ClassIcon className={info.getValue()} />,
      enableColumnFilter: false,
    }),
    columnHelper.accessor("thumbnail", {
      header: "Thumbnail",
      cell: (info) =>
        info.row.original.contentClass === "category" ? (
          <Link to={`/linkmanagement/category/${info.row.original.id}`}>
            <img
              className="rounded-lg h-16 aspect-video mx-auto"
              src={info.getValue()}
              alt="thumbnail"
              onClick={() => console.log(info.row.original)}
            />
          </Link>
        ) : (
          <Link to={`/sharedLink/${info.row.original.id}`}>
            <img
              className="rounded-lg h-16 aspect-video mx-auto"
              src={info.getValue()}
              alt="thumbnail"
              // onClick={() => handleClickOnThumbnail(info.row.original.id, info.row.original.contentClass)}
            />
          </Link>
        ),
      enableColumnFilter: false,
    }),

    columnHelper.accessor("title", {
      header: "Title",
      enableColumnFilter: false,
      cell: (info) => (
        <Link to={`/sharedLink/${info.row.original.id}`}>
          <p className="p-1 text-xs">{info.getValue()}</p>
        </Link>
      ),

      // cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      enableColumnFilter: false,
      cell: (info) => (
        <p className="p-1 text-3xs">{info.getValue() || "---"}</p>
      ),
    }),

    columnHelper.accessor("owner", {
      header: "Owner",
      enableColumnFilter: false,

      cell: (info) => (
        <>
          <div className="flex flex-col items-center justify-center">
            <ProfilePicture
              user={info.getValue()}
              size="small"
              clickable={false}
              hoverAnimation={false}
            />
            <p className="text-3xs">{info.getValue()?.first_name}</p>
            <p className="text-3xs">{info.getValue()?.last_name}</p>
          </div>
        </>
      ),
    }),
    columnHelper.accessor("suggestedBy", {
      header: "Suggested By",
      enableColumnFilter: false,

      cell: (info) => (
        <>
          {info.getValue() !== (null || undefined) ? (
            <div className="flex flex-col items-center justify-center">
              <ProfilePicture
                user={info.getValue()}
                size="small"
                clickable={false}
                hoverAnimation={false}
              />
              <p className="text-3xs">{info.getValue()?.first_name}</p>
              <p className="text-3xs">{info.getValue()?.last_name}</p>
            </div>
          ) : (
            <p>NA</p>
          )}
        </>
      ),
    }),
    columnHelper.accessor("sharedBy", {
      header: "Shared By",
      enableColumnFilter: false,

      cell: (info) => (
        <>
          {info.getValue() !== (null || undefined) ? (
            <div className="flex flex-col items-center justify-center">
              <ProfilePicture
                user={info.getValue()}
                size="small"
                clickable={false}
                hoverAnimation={false}
              />
              <p className="text-3xs">{info.getValue()?.first_name}</p>
              <p className="text-3xs">{info.getValue()?.last_name}</p>
            </div>
          ) : (
            <p>NA</p>
          )}
        </>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      enableColumnFilter: false,

      cell: (info) => (
        <p className="text-3xs">
          {info.getValue() === true ? "Active" : "Inactive"}
        </p>
      ),
    }),
    columnHelper.accessor("audience", {
      header: "Audience",
      enableColumnFilter: false,

      cell: (info) => (
        <p className="text-3xs">
          {info.getValue() === true ? "Public" : "Private"}
        </p>
      ),
    }),
    columnHelper.accessor("type", {
      header: "Type",
      enableColumnFilter: false,

      cell: (info) => <Type type={info.getValue()} />,
    }),
    columnHelper.accessor("publicationDate", {
      header: "Publication Date",
      enableColumnFilter: false,

      cell: (info) => (
        <PublicationDate publicationDate={info.getValue() || ""} />
      ),
    }),
    columnHelper.accessor("expirationDate", {
      header: "Expiration Date",
      enableColumnFilter: false,

      cell: (info) => <ExpirationDate expirationDate={info.getValue() || ""} />,
    }),
    columnHelper.accessor("rankCount", {
      header: () => <PiChartLineUp />,
      enableColumnFilter: false,

      cell: (info) => <Count count={info.getValue() || 0} />,
    }),
    columnHelper.accessor("sharedCount", {
      header: () => <RiShareForwardLine />,
      enableColumnFilter: false,
      cell: (info) => <Count count={info.getValue() || 0} />,
    }),
    columnHelper.accessor("savedCount", {
      header: () => <TfiTag />,
      enableColumnFilter: false,
      cell: (info) => <Count count={info.getValue() || 0} />,
    }),
    columnHelper.accessor("qr_code", {
      header: "QR Code",
      enableColumnFilter: false,
      cell: (info) => <QrCode />,
    }),
    columnHelper.accessor("short_url", {
      header: "Short Link",
      enableColumnFilter: false,

      cell: (info) => <ShortLink />,
    }),
  ];
  return tableColumns;
}
