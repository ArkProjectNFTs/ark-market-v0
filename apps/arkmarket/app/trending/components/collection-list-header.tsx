import React from "react";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon
} from "@radix-ui/react-icons";

const CollectionListHeader = () => {
  const getIsSorted = null;
  return (
    <div className="flex h-8 w-full justify-between text-xs">
      <div className="align flex w-64 flex-auto items-center pl-14">
        Collection
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>Floor Price</span>
        {getIsSorted === "desc" ? (
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        ) : getIsSorted === "asc" ? (
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <CaretSortIcon className="ml-2 h-4 w-4" />
        )}
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>Top Offer</span>
        {getIsSorted === "desc" ? (
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        ) : getIsSorted === "asc" ? (
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <CaretSortIcon className="ml-2 h-4 w-4" />
        )}
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>7d change</span>
        {getIsSorted === "desc" ? (
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        ) : getIsSorted === "asc" ? (
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <CaretSortIcon className="ml-2 h-4 w-4" />
        )}
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>7d Volume</span>
        {getIsSorted === "desc" ? (
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        ) : getIsSorted === "asc" ? (
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <CaretSortIcon className="ml-2 h-4 w-4" />
        )}
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>All time Volume</span>
        {getIsSorted === "desc" ? (
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        ) : getIsSorted === "asc" ? (
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <CaretSortIcon className="ml-2 h-4 w-4" />
        )}
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>Owners</span>
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>% Listed</span>
        {getIsSorted === "desc" ? (
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        ) : getIsSorted === "asc" ? (
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <CaretSortIcon className="ml-2 h-4 w-4" />
        )}
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>Supply</span>
        {getIsSorted === "desc" ? (
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        ) : getIsSorted === "asc" ? (
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <CaretSortIcon className="ml-2 h-4 w-4" />
        )}
      </div>
    </div>
  );
};

export default CollectionListHeader;
