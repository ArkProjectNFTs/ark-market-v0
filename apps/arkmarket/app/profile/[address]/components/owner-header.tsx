import * as React from "react";
import Link from "next/link";

import {
  DiscordLogoIcon,
  GlobeIcon,
  TwitterLogoIcon
} from "@radix-ui/react-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ButtonCopy from "@/components/ui/button-copy";
import { Separator } from "@/components/ui/separator";

import OwnedHeaderMenu from "./owner-header-menu";

interface OwnedHeaderProps {
  address: string;
}

const OwnedHeader: React.FC<OwnedHeaderProps> = async ({ address }) => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex w-full items-end space-x-2">
          <svg
            className="mr-2 dark:invert"
            width="56"
            height="56"
            viewBox="0 0 32 32"
            fill="#000"
          >
            <rect width="32" height="32" rx="4" />
          </svg>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold tracking-tight">Owner name</h2>
              <ButtonCopy copyContent={"address"}>address</ButtonCopy>
            </div>
            <Badge variant="secondary">
              <span className="max-w-xs overflow-hidden truncate text-ellipsis whitespace-nowrap">
                {address}
              </span>
            </Badge>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href="/">
            <Button variant="ghost" size="iconSmall">
              <TwitterLogoIcon className="h-[0.8rem] w-[0.8rem] transition-all" />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="iconSmall">
              <DiscordLogoIcon className="h-[0.8rem] w-[0.8rem] transition-all" />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="iconSmall">
              <GlobeIcon className="h-[0.8rem] w-[0.8rem] transition-all" />
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <div className="flex items-end justify-between">
          <OwnedHeaderMenu address={address} />
          <div className="flex items-center justify-between space-x-3 py-2 text-sm">
            <div className="flex space-x-2">
              <span className="text-muted-foreground">Floor</span>
              <span className="font-semibold">47.24</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex space-x-2">
              <span className="text-muted-foreground">24h Vol</span>
              <span className="font-semibold">215.50</span>
              <span className="font-semibold text-green-500">+105%</span>
            </div>
          </div>
        </div>
        <Separator />
      </div>
    </div>
  );
};

export default OwnedHeader;
