import React from "react";

import { CollectionItem } from "@/types";

import CollectionItemsGridItem from "./collection-items-grid-item";

interface CollectionItemsGridProps {
  items: CollectionItem[];
  address: string;
}

const CollectionItemsGrid: React.FC<CollectionItemsGridProps> = ({
  items,
  address
}) => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-5 lg:grid-cols-7 ">
      {items.map((item: any) => (
        <CollectionItemsGridItem key={item.token_id} item={item} address={address} />
      ))}
    </div>
  );
};

export default CollectionItemsGrid;
