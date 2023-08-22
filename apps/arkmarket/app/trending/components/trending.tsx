"use client";

import type { Collections } from "@/types";
import { useQuery } from "react-query";

import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";
import { DataTable } from "./data-table";

const Trending = () => {
  const getCollections = async () => {
    const res = await fetch("https://api.arkproject.dev/v1/collections", {
      headers: {
        "X-API-KEY": "yW0akON1f55mOFwBPXPme4AFfLktbRiQ2GNdT1Mc",
        "Content-Type": "application/json"
      },
      next: { revalidate: 30 }
    });
    const data = await res.json();
    return data;
  };

  const { data, error, isLoading } = useQuery("getCollections", getCollections);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Something went wrong</div>;
  console.log(data);
  return (
    <div className="hidden h-full flex-1 flex-col space-y-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Trending Collections
          </h2>
          <p className="text-muted-foreground">
            Aggregated from over 5 marketplaces.
          </p>
        </div>
      </div>
      <Separator />
      <DataTable data={data.result} columns={columns} />
    </div>
  );
};

export default Trending;
