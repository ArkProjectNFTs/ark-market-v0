import * as React from "react";

import { env } from "@/env.mjs";
import { Collection } from "@/types";

import CollectionActivityItems from "./components/collection-activity-items";

interface PageProps {
  params: { address: string };
}

const getCollection = async (address: string) => {
  const res = await fetch(
    `${env.NEXT_PUBLIC_ARK_API_DOMAIN}/v1/collections/${address}`,
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

const Page: React.FC<PageProps> = async ({ params }) => {
  const collection = (await getCollection(params.address)) as Collection;

  return (
    <CollectionActivityItems address={params.address} name={collection.name} />
  );
};

export default Page;
