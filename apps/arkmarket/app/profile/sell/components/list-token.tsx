import { format } from "path";
import { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { useBurner } from "@/hooks/useBurner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";
import dayjs from "dayjs";
import { parseEther } from "viem";

import { Button } from "@/components/ui/button";

interface ListTokenProps {
  contractAddress: string;
  tokenId: string;
  orderData: {
    price: string;
    endDate: number;
  };
}

const ListToken: React.FC<ListTokenProps> = ({
  orderData,
  contractAddress,
  tokenId
}) => {
  const { address } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const { listItem } = useBurner();
  const endDate = dayjs().add(30, "day").unix();
  const price = parseEther(orderData.price);
  const onItemlist = async () => {
    if (orderData.price === undefined) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a price"
      });
      return;
    }
    try {
      setIsSubmitting(true);
      await listItem({
        tokenId: parseInt(tokenId),
        tokenOwnerAddress: address ?? "",
        contractAddress,
        endDate,
        price
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

  return (
    <Button onClick={onItemlist}>
      {isSubmitting ? (
        <div className="flex items-center justify-center">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          <span>Please wait</span>
        </div>
      ) : (
        <>List Item</>
      )}
    </Button>
  );
};

export default ListToken;
