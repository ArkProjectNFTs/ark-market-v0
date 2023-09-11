import React, { useEffect } from "react";

import { env } from "@/env.mjs";
import { useToast } from "@/hooks/use-toast";
import { useBurner } from "@/hooks/useBurner";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  useAccount,
  useContractRead,
  useContractWrite
} from "@starknet-react/core";
import { cairo, validateAndParseAddress } from "starknet";
import { parseEther } from "viem";

import { convertWeiPriceToEth } from "@/lib/utils/convertPrice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EthIcon } from "@/components/ui/icons";

interface TokenPublicActionsProps {
  token: any;
}

const TokenPublicActions: React.FC<TokenPublicActionsProps> = ({ token }) => {
  const { address } = useAccount();
  const { toast } = useToast();
  const { buyItem } = useBurner();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const price = convertWeiPriceToEth(token.listing_price || "0");
  const bigNumberPrice = parseEther(price);

  const u256Price = cairo.uint256(token.listing_price);
  const { write } = useContractWrite({
    calls: [
      {
        contractAddress: env.NEXT_PUBLIC_ETH_CONTRACT_ADDRESS,
        entrypoint: "approve",
        calldata: [
          env.NEXT_PUBLIC_OPERATOR_ADDRESS,
          u256Price.low,
          u256Price.high
        ]
      }
    ]
  });

  const { data } = useContractRead({
    abi: [
      {
        type: "function",
        name: "allowance",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress"
          },
          {
            name: "spender",
            type: "core::starknet::contract_address::ContractAddress"
          }
        ],
        outputs: [
          {
            type: "core::uint256"
          }
        ],
        state_mutability: "view"
      }
    ],
    address: env.NEXT_PUBLIC_ETH_CONTRACT_ADDRESS,
    functionName: "allowance",
    args: [address, env.NEXT_PUBLIC_OPERATOR_ADDRESS],
    watch: true
  });

  const amount = data as bigint | undefined;
  const isAllowed = amount && amount >= bigNumberPrice;
  const onItemBuy = async () => {
    if (!isAllowed) {
      await write();
    }
    setIsSubmitting(true);
  };

  useEffect(() => {
    const buyItemAsync = async () => {
      try {
        if (!address) throw new Error("Please connect your wallet first.");
        await buyItem({
          order_hash: token.listing_order_hash,
          address: validateAndParseAddress(address)
        });
        toast({
          title: "Item bought",
          description: "You have successfully bought this item."
        });
        setIsSubmitting(false);
      } catch (error: any) {
        setIsSubmitting(false);
        toast({
          title: "Error",
          description: error.message
        });
      }
    };
    if (amount !== undefined && isSubmitting) {
      buyItemAsync();
    }
  }, [amount, isSubmitting, address, buyItem, toast, token]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center">
            <span>Listed for {price ? price : "N/A"}</span>
            <EthIcon />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div className="flex space-x-6">
            <Button className="w-64 shrink" onClick={() => onItemBuy()}>
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  <span>Please wait</span>
                </div>
              ) : (
                <>Buy now</>
              )}
            </Button>
            <Button className="w-64 shrink" variant="outline">
              Make an offer
            </Button>
            <Button className="w-64 shrink" variant="outline">
              Add to cart
            </Button>
          </div>
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex w-32 flex-col">
              <span className="text-xs text-muted-foreground">Expiration</span>
              <span className="font-semibold">3 days</span>
            </div>
            <div className="flex w-32 flex-col">
              <span className="text-xs text-muted-foreground">Listed</span>
              <span className="font-semibold">5h ago</span>
            </div>
            <div className="flex w-32 flex-col">
              <span className="text-xs text-muted-foreground">Created by</span>
              <span className="font-semibold">Team BAYC</span>
            </div>
            <div className="flex w-32 flex-col">
              <span className="text-xs text-muted-foreground">
                Floor Difference
              </span>
              <span className="font-semibold">+0%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenPublicActions;
