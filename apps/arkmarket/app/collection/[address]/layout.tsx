import { PropsWithChildren } from "react";

import { env } from "@/env.mjs";
import { Collection } from "@/types";

import CollectionHeader from "./components/collection-header";

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

interface ProfileLayoutProps {
  params: { address: string };
}

const ProfileLayout: React.FC<PropsWithChildren<ProfileLayoutProps>> = async ({
  params,
  children
}) => {
  const collection = (await getCollection(params.address)) as Collection;

  return (
    <div className="hidden h-full flex-1 flex-col space-y-4 p-8 md:flex">
      <CollectionHeader collection={collection} />
      {children}
    </div>
  );
};

export default ProfileLayout;
