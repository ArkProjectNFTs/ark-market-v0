"use client";

import { createContext, ReactNode, useState } from "react";

import { useBurner } from "@/hooks/useBurner";
import { Account } from "starknet";

interface ArkInterface {
  account?: Account;
  isBurnerDeploying: boolean;
  createBurner: () => Promise<string>;
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
    isDeploying: isBurnerDeploying
  } = useBurner();

  return (
    <ArkContext.Provider
      value={{
        account,
        isBurnerDeploying,
        createBurner
      }}
    >
      {children}
    </ArkContext.Provider>
  );
}
