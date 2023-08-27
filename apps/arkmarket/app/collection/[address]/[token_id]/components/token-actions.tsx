import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const TokenActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Listed for 4.245 $7.0K</CardTitle>
        <CardDescription>Expires in 3d</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div className="flex space-x-6">
            <Button className="w-64 shrink">Buy Now</Button>
            <Button className="w-64 shrink" variant="outline">
              Make an offer
            </Button>
            <Button className="w-64 shrink" variant="outline">
              Add to cart
            </Button>
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
              <span className="font-semibold">Team BAYC</span>
            </div>
            <div className="flex w-32 flex-col">
              <span className="text-xs text-muted-foreground">
                Floor Difference
              </span>
              <span className="font-semibold">+0%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenActions;
