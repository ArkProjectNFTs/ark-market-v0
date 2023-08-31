"use client";

import { env } from "@/env.mjs";
import { useAccount, useContractRead } from "@starknet-react/core";
import { useLocalStorage } from "@uidotdev/usehooks";

import ApproveToken from "./approve-token";
import ListToken from "./list-token";

const SellActions = () => {
  const { address } = useAccount();
  const [{ contractAddress, tokenId }, setListing] = useLocalStorage<{
    contractAddress: string | null;
    tokenId: string;
  }>("listing", {
    contractAddress: null,
    tokenId: []
  });
  const { data: isApprovedForAll } = useContractRead({
    abi: [
      {
        type: "function",
        name: "is_approved_for_all",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::bool"
          }
        ],
        state_mutability: "view"
      }
    ],
    address: contractAddress,
    functionName: "is_approved_for_all",
    args: [address, env.NEXT_PUBLIC_OPERATOR_ADDRESS],
    watch: true
  });

  return (
    <>
      {isApprovedForAll ? (
        <ListToken contractAddress={contractAddress} tokenId={tokenId} />
      ) : (
        <ApproveToken contractAddress={contractAddress} />
      )}
    </>
  );
};
export default SellActions;
