"use client";

import React from "react";

import CollectionItemsGrid from "./owner-collection-items-grid";
import CollectionItemsHeader from "./owner-collection-items-header";
import CollectionItemsList from "./owner-collection-items-list";

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
        <CollectionItemsGrid
          name={name}
          address={address}
          items={collectionItems.result}
        />
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
