import CollectionActivityItemsList from "./collection-activity-items-list";

interface CollectionActivityItemsProps {
  address: string;
  name: string;
}

const getCollectionActivity = async (address: string) => {
  const res = await fetch(
    // `https://api.arkproject.dev/v1/collections/${address}/activity`,
    `https://api-testnet.arkproject.dev/v1/collections/0x0199a48b1850f5905a209a1f5616fa205cfe5747eb4cfe034d95543d91168ea9/events`,
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
  console.log(collectionActivityItems);
  return (
    <>
      <CollectionActivityItemsList
        address={address}
        name={name}
        items={collectionActivityItems.result}
      />
    </>
  );
};

export default CollectionActivityItems;
