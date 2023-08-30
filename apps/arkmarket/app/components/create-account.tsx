"use client";

import React from "react";

import { useBurner } from "@/hooks/useBurner";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import MintButton from "./mint-button";

export const formatAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

const CreateAccount = () => {
  const {
    account,
    isDeploying: isBurnerDeploying,
    create: createBurner,
    registerBroker
  } = useBurner();

  return (
    <div>
      <div className="flex flex-col space-y-6">
        {account && (
          <button
            onClick={() => registerBroker()}
            className="inline-block animate-background rounded-lg bg-gray-900 from-pink-500 via-red-500 to-yellow-500 bg-[length:_400%_400%] p-0.5 [animation-duration:_6s] hover:bg-gradient-to-r dark:bg-gray-800"
          >
            <span className="block rounded-md bg-white px-5 py-3 text-sm font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
              Register broker
            </span>
          </button>
        )}
        <Button disabled={!!account} onClick={() => createBurner()}>
          {isBurnerDeploying ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>{account ? formatAddress(account.address) : "Create Burner"}</>
          )}
        </Button>

        <MintButton />
      </div>
    </div>
  );
};

export default CreateAccount;
