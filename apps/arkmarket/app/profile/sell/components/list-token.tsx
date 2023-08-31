import { useState } from "react";

import { useBurner } from "@/hooks/useBurner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAccount } from "@starknet-react/core";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ListTokenProps {
  contractAddress: string;
  tokenId: string;
}

const ListToken: React.FC<ListTokenProps> = ({ contractAddress, tokenId }) => {
  const { address } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const { listItem } = useBurner();

  const onItemlist = async () => {
    try {
      setIsSubmitting(true);
      await listItem({
        tokenId: parseInt(tokenId),
        tokenOwnerAddress: address ?? "",
        contractAddress
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
    <button
      onClick={onItemlist}
      className="inline-block animate-background rounded-lg bg-gray-900 from-pink-500 via-red-500 to-yellow-500 bg-[length:_400%_400%] p-0.5 [animation-duration:_6s] hover:bg-gradient-to-r dark:bg-gray-800"
    >
      <div className="rounded-md bg-white px-5 py-3 text-sm font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            <span>Please wait</span>
          </div>
        ) : (
          <>List Item</>
        )}
      </div>
    </button>
  );
};

export default ListToken;
