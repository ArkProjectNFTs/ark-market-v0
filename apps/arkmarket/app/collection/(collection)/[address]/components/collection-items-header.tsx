"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { ViewToggle } from "@/components/ui/view-toggle";

interface CollectionItemsHeaderProps {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
  itemsCount: number;
}

const CollectionItemsHeader: React.FC<CollectionItemsHeaderProps> = ({
  view,
  setView,
  itemsCount = 0
}) => {
  return (
    <div className="mb-4 flex w-full flex-col space-y-2">
      <div>
        <Input
          type="search"
          placeholder="Search for items or traits..."
          className="md:w-[100px] lg:w-[300px]"
        />
        {/* Sort Search Status Price Rarity Market Traits */}
      </div>
      <div className="flex w-full items-center justify-between">
        <span className="text-sm">{`${itemsCount} result${
          itemsCount > 1 ? "s" : ""
        }`}</span>
        <ViewToggle view={view} setView={setView} />
      </div>
    </div>
  );
};

export default CollectionItemsHeader;
