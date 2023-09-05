"use client";

import React from "react";
import Link from "next/link";

import { env } from "@/env.mjs";
import { CollectionItem } from "@/types";

import { removeLeadingZeros } from "@/lib/utils";
import { convertWeiPriceToEth } from "@/lib/utils/convertPrice";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "@/components/ui/image";
import { Separator } from "@/components/ui/separator";

interface CollectionRowProps {
  item: CollectionItem;
  address: string;
}

const CollectionRow: React.FC<CollectionRowProps> = ({
  item,
  address,
}) => {
  const price = convertWeiPriceToEth(item.listing_price || "0");
  return (
    <Link href={`/collection/${address}/${item.token_id}`}>
      <div className="flex h-12 w-full text-sm hover:bg-accent">
        <div className="align flex w-4 flex-auto items-center pl-4 ">
          <Checkbox />
        </div>
        <div className="align flex w-64 flex-auto items-center space-x-3 font-medium">
          {/* fix when https://github.com/TheArkProjekt/ArkIndexer/issues is done */}
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
          <span>{item?.normalized_metadata?.name}</span>
        </div>
        <div className="align flex w-28 flex-auto items-center justify-end">
          {item.listing_price !== "" ? (
            <span className="float-right">
              {price} ETH
            </span>
          ) : (
            <span className="float-right">
              {" - "}
            </span>
          )}
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
        <div className="align flex w-24 flex-auto items-center justify-end pr-4">
          <span>0</span>
        </div>
      </div>
      <Separator />
    </Link>
  );
};

export default CollectionRow;
