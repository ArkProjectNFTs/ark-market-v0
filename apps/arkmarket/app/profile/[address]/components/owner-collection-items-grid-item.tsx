"use client";

import React from "react";
import Link from "next/link";

import { env } from "@/env.mjs";
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
    <Link href={`/collection/${item.token_address}/${item.token_id}`}>
      <Card className="rounded hover:border-foreground">
        <CardHeader className="px-2 pb-1 pt-2">
          <CardTitle className="text-xs text-muted-foreground">
            Rarity: N/A
          </CardTitle>
        </CardHeader>
        <CardContent className="relative px-1 pb-0">
          
            <Image
              fallbackSrc="/placeholder.png"
              className="h-full w-full rounded-sm object-cover object-center"
              // todo: replace with real data when https://github.com/TheArkProjekt/ArkIndexer/issues/76 is done
              src={item?.owner?.replace(
                "ipfs://",
                env.NEXT_PUBLIC_IPFS_PROVIDER
              )}
              alt={item.token_id}
            />
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
