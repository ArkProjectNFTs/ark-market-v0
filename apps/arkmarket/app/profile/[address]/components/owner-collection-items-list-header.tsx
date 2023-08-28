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
      <div className="align flex w-12 items-center pl-4 ">
        <Checkbox />
      </div>
      <div className="align flex w-64 items-center">Item</div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>Rarity</span>
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>List Price</span>
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end">
        <span>Cost</span>
      </div>
      <div className="align flex w-24 flex-auto items-center justify-end pr-4">
        <span>Offer</span>
      </div>
    </div>
  );
};

export default CollectionListHeader;
