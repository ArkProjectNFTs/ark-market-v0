"use client";

import React from "react";

import { useBurner } from "@/hooks/useBurner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const TokenOwnerActions = () => {
  const { registerBroker, listItem, account } = useBurner();
  return (
    <Card>
      <div className="flex items-center justify-between p-6">
        <div className="text-lg font-bold">Item not listed</div>
        <button
          onClick={() => listItem()}
          className="inline-block animate-background rounded-lg bg-gray-900 from-pink-500 via-red-500 to-yellow-500 bg-[length:_400%_400%] p-0.5 [animation-duration:_6s] hover:bg-gradient-to-r dark:bg-gray-800"
        >
          <span className="block rounded-md bg-white px-5 py-3 text-sm font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
            List Item
          </span>
        </button>
      </div>
    </Card>
  );
};

export default TokenOwnerActions;
