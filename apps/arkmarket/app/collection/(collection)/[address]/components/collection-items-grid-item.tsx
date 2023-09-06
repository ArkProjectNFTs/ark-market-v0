"use client";

import React from "react";
import Link from "next/link";

import { env } from "@/env.mjs";
import { CollectionItem } from "@/types";

import { removeLeadingZeros } from "@/lib/utils";
import { convertWeiPriceToEth } from "@/lib/utils/convertPrice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Image from "@/components/ui/image";

interface CollectionItemsGridItemProps {
  item: CollectionItem;
  address: string;
}

const CollectionItemsGridItem: React.FC<CollectionItemsGridItemProps> = ({
  item,
  address,
}) => {
  const price = convertWeiPriceToEth(item.listing_price || "0");
  return (
    <Link href={`/collection/${address}/${item.token_id}`}>
      <Card className="rounded hover:border-foreground">
        <CardHeader className="px-2 pb-1 pt-2">
          <CardTitle className="text-xs text-muted-foreground">
            Rarity: N/A
          </CardTitle>
        </CardHeader>
        <CardContent className="relative px-1 pb-0">
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
            <>
              {item.normalized_metadata.image.includes("mp4") ? (
                <video
                  muted
                  loop
                  autoPlay
                  poster="/placeholder.png"
                  src={item.normalized_metadata.image.replace(
                    "ipfs://",
                    env.NEXT_PUBLIC_IPFS_PROVIDER
                  )}
                />
              ) : (
                <Image
                  fallbackSrc="/placeholder.png"
                  className="h-full w-full rounded-sm object-cover object-center"
                  src={item?.normalized_metadata.image.replace(
                    "ipfs://",
                    env.NEXT_PUBLIC_IPFS_PROVIDER
                  )}
                  alt={item.token_id}
                />
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="px-2 pb-2 pt-2 flex flex-col items-start">
          <span className="text-xs font-semibold">{item?.normalized_metadata?.name}</span>
          {item.listing_price !== "" ? (
            <span className="float-right text-xs text-muted-foreground">
              {price} ETH
            </span>
          ) :(<span className="float-right text-xs text-muted-foreground">{" - "}</span>)}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CollectionItemsGridItem;
