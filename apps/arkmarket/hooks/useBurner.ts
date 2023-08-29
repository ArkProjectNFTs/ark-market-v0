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
  stark,
  TransactionStatus
} from "starknet";

import Storage from "@/lib/utils/storage";

// const ETH_CONTRACT_ADDRESS = "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

// const PREFUND_AMOUNT = "0x8AC7230489E80000"; // 10ETH

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
    await executeRegisterBroker(account);
  }, [account]);

  const listItem = useCallback(async () => {
    if (!account) {
      return;
    }
    await executeListItem(account);
  }, [account]);

  const list = useCallback(() => {
    let storage = Storage.get("burners") || {};
    return Object.keys(storage).map((address) => {
      return {
        address,
        active: storage[address].active
      };
    });
  }, []);

  const select = useCallback((address: string) => {
    let storage = Storage.get("burners") || {};
    if (!storage[address]) {
      throw new Error("burner not found");
    }

    for (let addr in storage) {
      storage[addr].active = false;
    }
    storage[address].active = true;

    Storage.set("burners", storage);
    const burner = new Account(provider, address, storage[address].privateKey);
    setAccount(burner);
  }, []);

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

    // await prefundAccount(address, admin);

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
    list,
    select,
    create,
    account,
    listItem,
    registerBroker,
    isDeploying
  };
};

const executeListItem = async (account: Account) => {
  const result = await account.execute({
    contractAddress: env.NEXT_PUBLIC_ARK_CONTRACT_ADDRESS,
    entrypoint: "add_order_listing",
    calldata: CallData.compile({
      seller:
        "0x00E4769a4d2F7F69C70951A003eBA5c32707Cef3CdfB6B27cA63567f51cdd078",
      collection:
        "0x07feff50d156cc0a44098a74d9747c35ff12e0a3b2b3fd248f37c676112ac1fb",
      token_id: cairo.uint256(499),
      price: cairo.uint256(1000000),
      end_date: "0",
      broker_name: "1797578978957957227892",
      broker_sig_r: "0",
      broker_sig_s: "0"
    })
  });
  await provider.waitForTransaction(result.transaction_hash);
};

const executeRegisterBroker = async (account: Account) => {
  const { transaction_hash } = await account.execute({
    contractAddress: env.NEXT_PUBLIC_ARK_CONTRACT_ADDRESS,
    entrypoint: "register_broker",
    calldata: CallData.compile({
      name: "1797578978957957227892",
      public_key: "0x0",
      chain_id: "153465502409845803223769806078508688756"
    })
  });
  return await provider.waitForTransaction(transaction_hash);
};

// const prefundAccount = async (address: string, account: Account) => {
//   const { transaction_hash } = await account.execute({
//     contractAddress: ETH_CONTRACT_ADDRESS,
//     entrypoint: "transfer",
//     calldata: CallData.compile([address, PREFUND_AMOUNT])
//   });

//   return await account.waitForTransaction(transaction_hash, {
//     retryInterval: 1000,
//     successStates: [TransactionStatus.ACCEPTED_ON_L2]
//   });
// };
