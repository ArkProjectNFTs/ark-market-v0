import React from "react";

import Collection from "./collection";

interface CollectionItemsProps {
  address: string;
  name: string;
}

const fetchNfts = async (address: string) => {
  const res = await fetch(`https://api.arkproject.dev/v1/nfts/${address}`, {
    next: { revalidate: 30 },
    headers: {
      "X-API-KEY": "yW0akON1f55mOFwBPXPme4AFfLktbRiQ2GNdT1Mc",
      "Content-Type": "application/json"
    }
  });

  if (res.status === 200) {
    return res.json();
  }
  return { result: [] };
};

const CollectionItems: React.FC<CollectionItemsProps> = async ({
  address,
  name
}) => {
  const collectionItems = await fetchNfts(address);
  return (
    <Collection
      collectionItems={collectionItems}
      address={address}
      name={name}
    />
  );
};

export default CollectionItems;
