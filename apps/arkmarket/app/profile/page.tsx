"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

import { useAccount } from "@starknet-react/core";

import { Button } from "@/components/ui/button";

import ConnectWallet from "./components/connect-wallet";

/**
 * Redirect to /profile/[:address] if connected user
 * else, show connect button etc
 */
export default function ProfilePage() {
  const { address } = useAccount();

  useEffect(() => {
    if (address !== undefined) {
      redirect(`/profile/${address}`);
    }
  }, [address]);

  return <ConnectWallet />;
}
