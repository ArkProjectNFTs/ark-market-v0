import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const activities = [
  {
    event: "Transfer",
    price: "-",
    from: "0x42",
    to: "0x72",
    time: "3d ago"
  },
  {
    event: "Transfer",
    price: "-",
    from: "0x42",
    to: "0x72",
    time: "3d ago"
  },
  {
    event: "Transfer",
    price: "-",
    from: "0x42",
    to: "0x72",
    time: "3d ago"
  },
  {
    event: "Transfer",
    price: "-",
    from: "0x42",
    to: "0x72",
    time: "3d ago"
  },
  {
    event: "Transfer",
    price: "-",
    from: "0x42",
    to: "0x72",
    time: "3d ago"
  }
];

const activity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Action</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.event}>
                <TableCell className="font-medium">{activity.event}</TableCell>
                <TableCell>{activity.price}</TableCell>
                <TableCell>{activity.from}</TableCell>
                <TableCell>{activity.to}</TableCell>
                <TableCell className="text-right">{activity.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default activity;
