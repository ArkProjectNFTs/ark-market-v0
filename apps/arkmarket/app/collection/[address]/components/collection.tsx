"use client";

import React from "react";
import Link from "next/link";

import { removeLeadingZeros } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import CollectionItemsHeader from "./collection-items-header";
import CollectionItemsList from "./collection-items-list";

interface CollectionProps {
  collectionItems: any;
  address: string;
  name: string;
}

const Collection: React.FC<CollectionProps> = ({
  collectionItems,
  address,
  name
}) => {
  const [view, setView] = React.useState<"grid" | "list">("grid");
  return (
    <div>
      <CollectionItemsHeader view={view} setView={setView} />
      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-5 lg:grid-cols-7 ">
          {collectionItems.result.map((item: any) => (
            <Link href={`/collection/${address}/${item.token_id}`}>
              <Card key={item.id} className="rounded hover:border-foreground">
                <CardHeader className="px-2 pb-1 pt-2">
                  <CardTitle className="text-xs text-muted-foreground">
                    Rarity: N/A
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative px-1 pb-0">
                  <img
                    className="h-full w-full rounded-sm object-cover object-center"
                    src={item?.normalized_metadata.image.replace(
                      "ipfs://",
                      "https://ipfs.io/ipfs/"
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
          ))}
        </div>
      ) : (
        <CollectionItemsList
          name={name}
          address={address}
          items={collectionItems.result}
        />
      )}
    </div>
  );
};

export default Collection;
