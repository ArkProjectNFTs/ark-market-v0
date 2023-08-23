"use client";

import React from "react";
import Link from "next/link";

import { CollectionItem } from "@/types";

import { removeLeadingZeros } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Image from "@/components/ui/image";
import { Skeleton } from "@/components/ui/skeleton";

interface CollectionItemsGridItemProps {
  item: CollectionItem;
  address: string;
  name: string;
}

const CollectionItemsGridItem: React.FC<CollectionItemsGridItemProps> = ({
  item,
  address,
  name
}) => {
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
            <Image
              fallbackSrc="/placeholder.png"
              className="h-full w-full rounded-sm object-cover object-center"
              src={item?.normalized_metadata.image.replace(
                "ipfs://",
                "http://ipfs.io/ipfs/"
              )}
              alt={item.token_id}
            />
          )}
        </CardContent>
        <CardFooter className="px-2 pb-2 pt-2">
          <span className="text-xs font-semibold">{`${name} #${removeLeadingZeros(
            item.token_id
          )}`}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CollectionItemsGridItem;
