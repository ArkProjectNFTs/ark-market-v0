import * as React from "react";

import { env } from "@/env.mjs";

import Activity from "./components/activity";
import Header from "./components/header";
import TokenActions from "./components/token-actions";
import TokenSidebar from "./components/token-sidebar";

interface PageProps {
  params: { address: string; token_id: string };
}

const getToken = async (address: string, token_id: string) => {
  const res = await fetch(
    `${env.NEXT_PUBLIC_ARK_API_DOMAIN}/v1/nfts/${address}/${token_id}`,
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
  const token = await getToken(params.address, params.token_id);

  return (
    <div className="flex flex-1 space-x-8 p-8">
      <div className="flex-1">
        <div className="hidden h-full flex-1 flex-col space-y-4 md:flex">
          <Header token={token} />
          <TokenActions token={token} contractAddress={params.address} />
          <Activity />
        </div>
      </div>
      <div className="w-[330px]">
        <TokenSidebar metadata={token.normalized_metadata} />
      </div>
    </div>
  );
};

export default Page;
