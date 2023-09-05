"use client";

import React from "react";

import { useToast } from "@/hooks/use-toast";
import { useBurner } from "@/hooks/useBurner";
import { ReloadIcon } from "@radix-ui/react-icons";

import { convertWeiPriceToEth } from "@/lib/utils/convertPrice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EthIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";

interface TokenOwnerActionsProps {
  token: any;
  contractAddress: string;
}

const TokenOwnerActions: React.FC<TokenOwnerActionsProps> = ({
  token,
  contractAddress
}) => {
  const { toast } = useToast();
  const { listItem } = useBurner();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const onItemlist = async () => {
    try {
      setIsSubmitting(true);
      await listItem({
        tokenId: parseInt(token.token_id),
        tokenOwnerAddress: token.owner,
        contractAddress: token.token_address
      });
      toast({
        title: "Order placed",
        description: "Your order has been submitted"
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
  const price = convertWeiPriceToEth(token.listing_price || "0");
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {token.listing_status === "listed" ? (
            <div className="flex items-center">
              <span>Listed for {price ? price : "N/A"}</span>
              <EthIcon />
            </div>
          ) : (
            "Item not listed"
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div className="flex space-x-6">
            {token.listing_status === "listed" ? (
              <>
                <Button className="w-64 shrink">Instant sell</Button>
                <Button className="w-64 shrink" variant="outline">
                  Cancel listing
                </Button>
                <Button className="w-64 shrink" variant="outline">
                  Edit listing
                </Button>
              </>
            ) : (
              <Button onClick={() => onItemlist()}>
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    <span>Please wait</span>
                  </div>
                ) : (
                  <>List Item</>
                )}
              </Button>
            )}
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
              <span className="font-semibold">Team Everai</span>
            </div>
            <div className="flex w-32 flex-col">
              <span className="text-xs text-muted-foreground">
                Floor Difference
              </span>
              <span className="font-semibold">+1%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenOwnerActions;
