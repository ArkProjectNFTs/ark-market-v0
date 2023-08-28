"use client";

import React from "react";

import CollectionListHeader from "./owner-collection-items-list-header";
import CollectionItemsListRow from "./owner-collection-items-list-row";

interface item {
  token_address: string;
  token_id: string;
  owner?: string;
  normalized_metadata?: {
    name: string;
    description: string;
    image: string;
    attributes: unknown[];
    external_url: string;
  };
}

interface CollectionItemsListProps {
  items: item[];
  address: string;
  name: string;
}

const CollectionsList: React.FC<CollectionItemsListProps> = ({
  items,
  address,
  name
}) => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-4 md:flex">
      <div className="flex flex-col">
        <CollectionListHeader />
        {items.map((item: item) => (
          <CollectionItemsListRow
            key={item.token_id}
            address={address}
            item={item}
            name={name}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionsList;
