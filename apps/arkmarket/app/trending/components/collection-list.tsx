import React from "react";

import { Collection } from "@/types";

import { Separator } from "@/components/ui/separator";

import CollectionListHeader from "./collection-list-header";
import CollectionRow from "./collection-row";

const getCollections = async () => {
  const res = await fetch("https://api.arkproject.dev/v1/collections", {
    headers: {
      "X-API-KEY": "yW0akON1f55mOFwBPXPme4AFfLktbRiQ2GNdT1Mc",
      "Content-Type": "application/json"
    },
    next: { revalidate: 30 }
  });
  const data = await res.json();
  return data;
};

const CollectionsList = async () => {
  const data = await getCollections();
  console.log(data)
  return (
    <div className="hidden h-full flex-1 flex-col space-y-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Trending Collections
          </h2>
          <p className="text-muted-foreground">
            Aggregated from over 0 starknet marketplaces.
          </p>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col">
        <CollectionListHeader />
        {data.result.map((collection: Collection) => (
          <CollectionRow key={collection.address} collection={collection} />
        ))}
      </div>
    </div>
  );
};

export default CollectionsList;
