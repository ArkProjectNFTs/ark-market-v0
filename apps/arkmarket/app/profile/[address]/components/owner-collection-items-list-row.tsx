"use client";

import React from "react";
import Link from "next/link";

import { env } from "@/env.mjs";
import { CollectionItem } from "@/types";

import { removeLeadingZeros } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "@/components/ui/image";
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
        <div className="align flex w-12 items-center pl-4 ">
          <Checkbox />
        </div>
        <div className="align flex w-64 items-center space-x-3 font-medium">
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
            <Image
              fallbackSrc="/placeholder.png"
              className="h-8 w-8 rounded-sm object-cover object-center"
              src={item?.normalized_metadata.image.replace(
                "ipfs://",
                env.NEXT_PUBLIC_IPFS_PROVIDER
              )}
              alt={item.token_id}
            />
          )}
          <span>{`${name} ${removeLeadingZeros(item.token_id)}`}</span>
        </div>
        <div className="align flex w-24 flex-auto items-center justify-end">
          <span>3234</span>
        </div>
        <div className="align flex w-24 flex-auto items-center justify-end">
          <span>0.3</span>
        </div>
        <div className="align flex w-24 flex-auto items-center justify-end">
          <span>1</span>
        </div>
        <div className="align flex w-24 flex-auto items-center justify-end pr-4">
          <span>10</span>
        </div>
      </div>
      <Separator />
    </Link>
  );
};

export default CollectionRow;
