"use client";

import React from "react";

import { useAccount } from "@starknet-react/core";
import { useReadLocalStorage } from "usehooks-ts";

import SellContent from "./sell-content";
import SellSidebar from "./sell-sidebar";
import dayjs from "dayjs";

interface ListTokenProps {
  contractAddress: string;
  tokenId: string;
}

const Sell = () => {
  const listing = useReadLocalStorage<ListTokenProps>("listing");
  const contractAddress = listing?.contractAddress ?? null;
  const tokenId = listing?.tokenId ?? null;
  const { address } = useAccount();
  const [orderData, setOrderData] = React.useState<{
    price: string;
    endDate: number;
  }>({
    price: "0.1",
    endDate: dayjs().add(30, "day").unix()
  });

  if (!contractAddress || !tokenId || !address)
    return (
      <div>
        <h1 className="text-2xl font-bold">Sell</h1>
        <p className="text-gray-500">Select a token to sell</p>
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:col-span-2">
        <SellContent
          contractAddress={contractAddress}
          setOrderData={setOrderData}
          orderData={orderData}
          tokenId={tokenId}
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <SellSidebar
          orderData={orderData}
          contractAddress={contractAddress}
          tokenId={tokenId}
          address={address}
        />
      </div>
    </>
  );
};

export default Sell;
