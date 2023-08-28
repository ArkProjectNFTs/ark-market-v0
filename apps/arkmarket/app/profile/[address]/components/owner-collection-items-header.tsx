"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import { ViewToggle } from "@/components/ui/view-toggle";

interface CollectionItemsHeaderProps {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
}

const CollectionItemsHeader: React.FC<CollectionItemsHeaderProps> = ({
  view,
  setView
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
        <span className="text-sm">0 results</span>
        <ViewToggle view={view} setView={setView} />
      </div>
    </div>
  );
};

export default CollectionItemsHeader;
