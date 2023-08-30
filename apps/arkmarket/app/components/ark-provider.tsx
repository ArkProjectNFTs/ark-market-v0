"use client";

import { createContext, ReactNode, useState } from "react";

import { useBurner } from "@/hooks/useBurner";
import { Account } from "starknet";

interface ArkInterface {
  account?: Account;
  isBurnerDeploying: boolean;
  createBurner: () => Promise<string>;
  listItem: ({
    contractAddress,
    tokenId,
    tokenOwnerAddress
  }: {
    tokenId: number;
    contractAddress: string;
    tokenOwnerAddress: string;
  }) => Promise<any>;
  registerBroker: () => void;
}

const ArkContext = createContext<ArkInterface>(null!);

export function ArkProvider({
  children
}: {
  children?: ReactNode;
}): JSX.Element {
  const {
    account,
    create: createBurner,
    isDeploying: isBurnerDeploying,
    listItem,
    registerBroker
  } = useBurner();

  return (
    <ArkContext.Provider
      value={{
        account,
        isBurnerDeploying,
        createBurner,
        listItem,
        registerBroker
      }}
    >
      {children}
    </ArkContext.Provider>
  );
}
