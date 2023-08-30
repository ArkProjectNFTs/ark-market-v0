"use client";

import React from "react";

import { Input } from "@/components/ui/input";

const CollectionActivityItemsHeader = () => {
  return (
    <div className="mb-4 flex w-full flex-col space-y-2">
      <div>
        <Input
          type="search"
          placeholder="Search for items"
          className="md:w-[100px] lg:w-[300px]"
        />
      </div>
    </div>
  );
};

export default CollectionActivityItemsHeader;
