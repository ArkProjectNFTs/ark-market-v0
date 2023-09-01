import React from "react";

import { cairo } from "starknet";
import { useBurner } from "@/hooks/useBurner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount, useContractWrite } from "@starknet-react/core";
import { validateAndParseAddress } from "starknet";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const TokenPublicActions = () => {
  const { address } = useAccount();
  const { toast } = useToast();
  const { buyItem } = useBurner();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const { write } = useContractWrite({
    calls: [
      {
        contractAddress:
          "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        entrypoint: "approve",
        calldata: [
          "0x06495ae175214d51ce8cff05ce3ea0c75aa50c7fdcd7531eee358f2065bf524b",
          cairo.uint256(100)
        ]
      }
    ]
  });

  const onItemBuy = async () => {
    await write();
    // try {
    //   setIsSubmitting(true);
    //   if (!address) throw new Error("Please connect your wallet first.");
    //   await buyItem({
    //     address: validateAndParseAddress(address)
    //   });
    //   toast({
    //     title: "Item bought",
    //     description: "You have successfully bought this item."
    //   });
    //   setIsSubmitting(false);
    // } catch (error: any) {
    //   setIsSubmitting(false);
    //   toast({
    //     title: "Error",
    //     description: error.message
    //   });
    // }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Listed for 4.245 $7.0K</CardTitle>
        <CardDescription>Expires in 3d</CardDescription>
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
