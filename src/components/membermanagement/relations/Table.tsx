import React, { useRef, useEffect, useState, useContext } from "react";
import { UserProfileType } from "../../../lib/interfaces";
import TableComponent from "../../table/TableComponent";
import Table2 from "../../table/Table2";
import { RiArrowUpSFill } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";
import { LuCircleDashed } from "react-icons/lu";
import { RelationsContext } from "../../../context/RelationsProvider";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

interface TableProps {
  people: UserProfileType[];
}

export default function Table({ people }: TableProps) {
  const { showFilter } = useContext(RelationsContext);
  const [maxWidth, setMaxWidth] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === ref.current) {
          setMaxWidth(entry.contentRect.width);
        }
      }
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-grow overflow-hidden">
      <div className=" flex-grow overflow-hidden" ref={ref}>
        <Table2
          columns={createColumns()}
          data={people}
          showFilter={showFilter}
        />
      </div>
    </div>
  );
}

function createColumns() {
  interface ExpandedSharedLinkType extends UserProfileType {
    select: boolean;
    status: boolean;
  }
  const columnHelper = createColumnHelper<ExpandedSharedLinkType>();

  let tableColumns = [
    columnHelper.accessor("select", {
      header: ({ table }) => (
        <input
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
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
    }),
    columnHelper.accessor("profile_picture", {
      header: "",
      cell: (info) => (
        <img
          className="rounded-lg h-16 aspect-video mx-auto"
          src={info.getValue()}
          alt="thumbnail"
        />
      ),
    }),
    columnHelper.accessor("first_name", {
      header: "Full Name",
      cell: (info) => {
        const { first_name, last_name } = info.row.original;
        return `${first_name} ${last_name}`;
      },
    }),
    columnHelper.accessor("subscribers", {
      header: "Subscribers",
      cell: (info) => info.getValue()?.length || 0,
    }),

    columnHelper.accessor("rankCount", {
      header: "Rank",
      cell: (info) => info.getValue() || 0,
    }),
    columnHelper.accessor("suggestionsCount", {
      header: "Suggested",
      cell: (info) => info.getValue() || 0,
    }),
    columnHelper.accessor("relationStatus", {
      header: "Relation Status",
      cell: (info) => info.getValue() || "No Relation",
    }),
    columnHelper.accessor("connection_date", {
      header: "Connection Date",
      cell: (info) => info.getValue() || "No Connection",
    }),
    columnHelper.accessor("linkApproval", {
      header: "Link Approval",
      cell: (info) => {
        const {
          approved = [],
          pending = [],
          rejected = [],
        } = info.getValue() || {};

        return (
          <div className="flex gap-2 items-center justify-center">
            <span className="text-green-500">
              <RiArrowUpSFill />
              {approved.length}
            </span>
            <span className="text-yellow-500">
              <LuCircleDashed />
              {pending.length}
            </span>
            <span className="text-red-500">
              <RiArrowDownSFill />
              {rejected.length}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor("address", {
      header: "Country",
      cell: (info) => info.getValue()?.country || "No Country",
    }),
  ];
  return tableColumns;
}
