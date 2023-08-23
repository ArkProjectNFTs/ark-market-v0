"use client";

import React from "react";
import Link from "next/link";

import { CollectionItem } from "@/types";

import { removeLeadingZeros } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface CollectionRowProps {
  item: CollectionItem;
  address: string;
  name: string;
}

const CollectionRow: React.FC<CollectionRowProps> = ({
  item,
  address,
  name
}) => {
  return (
    <Link href={`/collection/${address}/${item.token_id}`}>
      <div className="flex h-12 w-full text-sm hover:bg-accent">
        <div className="align flex w-4 flex-auto items-center pl-4 ">
          <Checkbox />
        </div>
        <div className="align flex w-64 flex-auto items-center space-x-3 font-medium">
          {!item.normalized_metadata ? (
            <svg
              className="mr-2 dark:invert"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="#000"
            >
              <rect width="32" height="32" rx="4" />
            </svg>
          ) : (
            <img
              className="h-8 w-8 rounded-sm object-cover object-center"
              src={item?.normalized_metadata.image.replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
              )}
              alt={item.token_id}
            />
          )}
          <span>{`${name} ${removeLeadingZeros(item.token_id)}`}</span>
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
      </div>
      <Separator />
    </Link>
  );
};

export default CollectionRow;
