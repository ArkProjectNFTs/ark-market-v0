"use client";

import { PropsWithChildren, useEffect, useState } from "react";

import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { useLocalStorage } from "@uidotdev/usehooks";

import { Button } from "@/components/ui/button";

interface ButtonFavoriteProps {
  contractAddress: string;
}

const ButtonFavorite: React.FC<PropsWithChildren<ButtonFavoriteProps>> = ({
  children,
  contractAddress
}) => {
  const [watchlistContracts, setWatchlistContracts] = useLocalStorage<
    Array<string>
  >("watchlist", []);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(watchlistContracts.includes(contractAddress));
  }, [isFavorite, watchlistContracts, contractAddress]);

  const toggleFavorite = () => {
    if (isFavorite) {
      setWatchlistContracts(
        [...watchlistContracts].filter((watchlistContract) => {
          watchlistContract !== contractAddress;
        })
      );
      return;
    }
    setWatchlistContracts([...watchlistContracts, contractAddress]);
  };

  return (
    <Button onClick={toggleFavorite} variant="ghost" size="iconSmall">
      {watchlistContracts.includes(contractAddress) ? (
        <StarFilledIcon className="h-4 w-4 transition-all" />
      ) : (
        <StarIcon className="h-4 w-4 transition-all" />
      )}
      <span className="sr-only">{children}</span>
    </Button>
  );
};

export default ButtonFavorite;
