"use client";

import { useCallback, useEffect, useState } from "react";

import { env } from "@/env.mjs";
import {
  Account,
  cairo,
  CallData,
  ec,
  hash,
  RpcProvider,
  shortString,
  stark
} from "starknet";

import Storage from "@/lib/utils/storage";

const provider = new RpcProvider({
  nodeUrl: env.NEXT_PUBLIC_RPC_ENDPOINT
});

const admin = new Account(
  provider,
  env.NEXT_PUBLIC_ADMIN_ADDRESS,
  env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY
);

type BurnerStorage = {
  [address: string]: {
    privateKey: string;
    publicKey: string;
    deployTx: string;
    active: boolean;
  };
};

export const useBurner = () => {
  const [account, setAccount] = useState<Account>();
  const [isDeploying, setIsDeploying] = useState(false);
  // init
  useEffect(() => {
    const storage: BurnerStorage = Storage.get("burners");
    if (storage) {
      // check one to see if exists, perhaps appchain restarted
      const firstAddr = Object.keys(storage)[0];
      admin.getTransactionReceipt(storage[firstAddr].deployTx).catch(() => {
        setAccount(undefined);
        Storage.remove("burners");
        throw new Error("burners not deployed, chain may have restarted");
      });

      // set active account
      for (let address in storage) {
        if (storage[address].active) {
          const burner = new Account(
            provider,
            address,
            storage[address].privateKey
          );
          setAccount(burner);
          return;
        }
      }
    }
  }, []);

  const registerBroker = useCallback(async () => {
    if (!account) {
      return;
    }
    const { transaction_hash } = await account.execute({
      contractAddress: env.NEXT_PUBLIC_ARK_CONTRACT_ADDRESS,
      entrypoint: "register_broker",
      calldata: CallData.compile({
        name: shortString.encodeShortString(env.NEXT_PUBLIC_BROKER_NAME),
        // replace with future broker public key
        public_key: "0x0",
        chain_id: shortString.encodeShortString(env.NEXT_PUBLIC_ARK_CHAIN_ID)
      })
    });
    return await provider.waitForTransaction(transaction_hash);
  }, [account]);

  const listItem = useCallback(
    async ({
      tokenId,
      tokenOwnerAddress
    }: {
      tokenId: number;
      tokenOwnerAddress: string;
    }) => {
      if (!account) {
        return;
      }
      const result = await account.execute({
        contractAddress: env.NEXT_PUBLIC_ARK_CONTRACT_ADDRESS,
        entrypoint: "add_order_listing",
        calldata: CallData.compile({
          // todo put connected wallet address
          seller:
            "0x00E4769a4d2F7F69C70951A003eBA5c32707Cef3CdfB6B27cA63567f51cdd078",
          collection: tokenOwnerAddress,
          token_id: cairo.uint256(tokenId),
          price: cairo.uint256(1000),
          end_date: "0",
          // Change broker name for current env broker
          broker_name: shortString.encodeShortString(
            env.NEXT_PUBLIC_BROKER_NAME
          ),
          broker_sig_r: "0",
          broker_sig_s: "0"
        })
      });
      return await provider.waitForTransaction(result.transaction_hash);
    },
    [account]
  );

  const create = useCallback(async () => {
    setIsDeploying(true);
    const privateKey = stark.randomAddress();
    const publicKey = ec.starkCurve.getStarkKey(privateKey);
    const address = hash.calculateContractAddressFromHash(
      publicKey,
      env.NEXT_PUBLIC_ACCOUNT_CLASS_HASH,
      CallData.compile({ publicKey }),
      0
    );

    // deploy burner
    const burner = new Account(provider, address, privateKey);
    const { transaction_hash: deployTx } = await burner.deployAccount(
      {
        classHash: env.NEXT_PUBLIC_ACCOUNT_CLASS_HASH,
        constructorCalldata: CallData.compile({ publicKey }),
        addressSalt: publicKey
      },
      {
        maxFee: "0x0"
      }
    );

    // save burner
    let storage = Storage.get("burners") || {};
    for (let address in storage) {
      storage[address].active = false;
    }
    storage[address] = {
      privateKey,
      publicKey,
      deployTx,
      active: true
    };

    setAccount(burner);
    setIsDeploying(false);
    Storage.set("burners", storage);
    console.log("burner created: ", address);

    return address;
  }, []);

  return {
    create,
    account,
    listItem,
    registerBroker,
    isDeploying
  };
};
