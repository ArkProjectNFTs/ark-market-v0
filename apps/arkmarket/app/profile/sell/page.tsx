"use client";

import React from "react";

import { useBurner } from "@/hooks/useBurner";
import { useLocalStorage } from "@uidotdev/usehooks";

import { useToast } from "@/components/ui/use-toast";

import SellActions from "./components/sell-actions";

const SellPage = () => {
  const { toast } = useToast();
  const { listItem } = useBurner();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [listing, setListing] = useLocalStorage<{
    contractAddress: string | null;
    tokenIds: Array<string>;
  }>("listing", {
    contractAddress: null,
    tokenIds: []
  });

  //   const onItemlist = async () => {
  //     try {
  //       setIsSubmitting(true);
  //       await listItem({
  //         tokenId: parseInt(tokenId),
  //         tokenOwnerAddress,
  //         contractAddress
  //       });
  //       toast({
  //         title: "Order placed",
  //         description: "Your order has been submitted"
  //       });
  //       setIsSubmitting(false);
  //     } catch (error: any) {
  //       setIsSubmitting(false);
  //       toast({
  //         title: "Error",
  //         description: error.message
  //       });
  //     }
  //   };

  return (
    <div>
      <SellActions contractAddress={listing.contractAddress} />
    </div>
  );
};

export default SellPage;
