"use client";

import React from "react";

import { useBurner } from "@/hooks/useBurner";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

export const formatAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

const CreateAccount = () => {
  const {
    account,
    isDeploying: isBurnerDeploying,
    create: createBurner
  } = useBurner();
  return (
    <div>
      <div>
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
      </div>
    </div>
  );
};

export default CreateAccount;
