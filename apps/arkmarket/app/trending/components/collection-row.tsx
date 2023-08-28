import React from "react";
import Link from "next/link";

import { Collection } from "@/types";

import { Separator } from "@/components/ui/separator";

interface CollectionRowProps {
  collection: Collection;
}

const CollectionRow: React.FC<CollectionRowProps> = ({ collection }) => {
  return (
    <Link href={`/collection/${collection.address}`}>
      <div className="flex h-12 w-full justify-between text-sm hover:bg-accent">
        <div className="align flex w-64 flex-auto items-center font-medium">
          <svg
            className="mr-2 dark:invert"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="#000"
          >
            <rect width="32" height="32" rx="4" />
          </svg>
          {collection.name}
        </div>
        <div className="align flex w-24 flex-auto items-center justify-end">
          <span>0.34</span>
        </div>
        <div className="align flex w-24 flex-auto items-center justify-end">
          <span>0.3</span>
        </div>
        <div className="align flex w-24 flex-auto items-center justify-end">
          <span>-20%</span>
        </div>
        <div className="align flex w-24 flex-auto items-center justify-end">
          <span>23</span>
        </div>
        <div className="align flex w-24 flex-auto items-center justify-end">
          <span>1,1200</span>
        </div>
        <div className="align flex w-24 flex-auto items-center justify-end">
          <span>0</span>
        </div>
        <div className="align flex w-24 flex-auto items-center justify-end">
          <span>0/{collection.supply} (0%)</span>
        </div>
        <div className="align flex w-24 flex-auto items-center justify-end pr-4">
          <span>{collection.supply}</span>
        </div>
      </div>
      <Separator />
    </Link>
  );
};

export default CollectionRow;
