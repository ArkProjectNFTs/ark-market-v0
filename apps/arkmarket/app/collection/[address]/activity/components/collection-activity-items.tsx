import { env } from "@/env.mjs";

import CollectionActivityItemsHeader from "./collection-activity-items-header";
import CollectionActivityItemsList from "./collection-activity-items-list";

interface CollectionActivityItemsProps {
  address: string;
  name: string;
}

const getCollectionActivity = async (address: string) => {
  const res = await fetch(
    `${env.NEXT_PUBLIC_ARK_API_DOMAIN}/v1/collections/${address}/events`,
    {
      headers: {
        "X-API-KEY": "yW0akON1f55mOFwBPXPme4AFfLktbRiQ2GNdT1Mc",
        "Content-Type": "application/json"
      },
      next: { revalidate: 30 }
    }
  );
  return res.json();
};

const CollectionActivityItems: React.FC<CollectionActivityItemsProps> = async ({
  address,
  name
}) => {
  const collectionActivityItems = await getCollectionActivity(address);
  return (
    <>
      <CollectionActivityItemsHeader />
      <CollectionActivityItemsList
        address={address}
        name={name}
        items={collectionActivityItems.result}
      />
    </>
  );
};

export default CollectionActivityItems;
