"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "@/components/ui/image";
import { Input } from "@/components/ui/input";

import { DatePicker } from "./date-picker";

interface SellContentProps {
  contractAddress: string;
  tokenId: string;
  setOrderData: (data: { price: string; endDate: number }) => void;
  orderData: {
    price: string;
    endDate: number;
  };
}

const SellContent: React.FC<SellContentProps> = ({
  contractAddress,
  tokenId,
  orderData,
  setOrderData
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-5">
          <Image
            src="/placeholder.png"
            alt="placeholder"
            className="w-9 rounded-sm"
          />
          <div className="w-100 truncate">{contractAddress}</div>
          <div className="w-24 truncate">{tokenId}</div>
          <Input
            type="number"
            placeholder="Price"
            onChange={(e) => {
              setOrderData({
                price: e.target.value,
                endDate: orderData.endDate
              });
            }}
          />
          <div className="w-100">
            <DatePicker setOrderData={setOrderData} orderData={orderData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SellContent;
