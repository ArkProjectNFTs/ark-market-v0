"use client";

import React from "react";

import CollectionItemsGrid from "./collection-items-grid";
import CollectionItemsHeader from "./collection-items-header";
import CollectionItemsList from "./collection-items-list";

interface CollectionProps {
  collectionItems: any[];
  address: string;
}

const Collection: React.FC<CollectionProps> = ({
  collectionItems,
  address,
}) => {
  const [view, setView] = React.useState<"grid" | "list">("grid");
  return (
    <div>
      <CollectionItemsHeader
        itemsCount={collectionItems.length}
        view={view}
        setView={setView}
      />
      {view === "grid" ? (
        <CollectionItemsGrid
          address={address}
          items={collectionItems}
        />
      ) : (
        <CollectionItemsList
          address={address}
          items={collectionItems}
        />
      )}
    </div>
  );
};

export default Collection;
