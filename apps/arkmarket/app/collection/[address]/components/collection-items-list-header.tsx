import React from "react";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon
} from "@radix-ui/react-icons";

import { Checkbox } from "@/components/ui/checkbox";

const CollectionListHeader = () => {
  const getIsSorted = null;
  return (
    <div className="flex h-8 w-full justify-between text-xs">
      <div className="align flex w-4 flex-auto items-center pl-4 ">
        <Checkbox />
      </div>
      <div className="align flex w-64 flex-auto items-center ">Item</div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>Price</span>
        {getIsSorted === "desc" ? (
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        ) : getIsSorted === "asc" ? (
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <CaretSortIcon className="ml-2 h-4 w-4" />
        )}
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>Rarity</span>
        {getIsSorted === "desc" ? (
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        ) : getIsSorted === "asc" ? (
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <CaretSortIcon className="ml-2 h-4 w-4" />
        )}
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>Last</span>
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>Owner</span>
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>Held</span>
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end pr-4">
        <span>Date</span>
      </div>
    </div>
  );
};

export default CollectionListHeader;
