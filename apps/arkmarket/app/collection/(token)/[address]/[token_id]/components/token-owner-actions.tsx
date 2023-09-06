"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useLocalStorage } from "usehooks-ts";

import { convertWeiPriceToEth } from "@/lib/utils/convertPrice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EthIcon } from "@/components/ui/icons";

interface TokenOwnerActionsProps {
  token: any;
  contractAddress: string;
}

interface Listing {
  contractAddress: string | null;
  tokenId: string | null;
}

const TokenOwnerActions: React.FC<TokenOwnerActionsProps> = ({
  token,
  contractAddress
}) => {
  
  const [listing, setListing] = useLocalStorage<Listing>("listing", {
    contractAddress: null,
    tokenId: null
  });

  const router = useRouter();

  const triggerListing = () => {
    // if (listing.contractAddress === contractAddress) {
    //   setListing((prevValue: Listing) => ({ ...prevValue, tokenId: token.tokenId }))
    // } else {
    setListing({ contractAddress: contractAddress, tokenId: token.token_id });
    // }
    router.push("/profile/sell");
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
              <Button onClick={() => triggerListing()}>List Item</Button>
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
