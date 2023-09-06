import * as React from "react";

import CollectionItems from "./components/collection-items";

interface PageProps {
  params: { address: string };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  return <CollectionItems address={params.address} />;
};

export default Page;
