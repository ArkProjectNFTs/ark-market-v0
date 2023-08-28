"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

interface OwnedHeaderMenuProps {
  address: string;
}

const OwnedHeaderMenu: React.FC<OwnedHeaderMenuProps> = ({ address }) => {
  const currentRoute = usePathname();
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href={`/profile/${address}`} legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={currentRoute === `/profile/${address}`}
              >
                Items
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={`/profile/${address}/portfolio`}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={currentRoute === `/profile/${address}/portfolio`}
              >
                Portfolio
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={`/profile/${address}/listing`} legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={currentRoute === `/profile/${address}/listing`}
              >
                Listing
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={`/profile/${address}/offers`} legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={currentRoute === `/profile/${address}/offers`}
              >
                Offers
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={`/profile/${address}/activity`} legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={currentRoute === `/profile/${address}/activity`}
              >
                Activity
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default OwnedHeaderMenu;
