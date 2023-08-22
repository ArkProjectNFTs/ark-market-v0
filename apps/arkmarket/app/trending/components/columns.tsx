"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { labels, priorities, statuses } from "../data/data";
import { Collection } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Collection>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="collection" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[200px] items-center space-x-4">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="5" fill="#D9D9D9" />
        </svg>
        <p>{row.getValue("name")}</p>
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "supply",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="supply" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[80px]">
          <p>{row.getValue("supply")}</p>
        </div>
      );
    },

    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[80px]">
          <p>{row.getValue("type")}</p>
        </div>
      );
    },

    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "symbol",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="symbol" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[80px]">
          <p>{row.getValue("symbol")}</p>
        </div>
      );
    },

    enableSorting: false,
    enableHiding: false
  }
];
