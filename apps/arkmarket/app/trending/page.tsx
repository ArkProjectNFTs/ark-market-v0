import { Suspense } from "react";
import { Metadata } from "next";

import Trending from "./components/trending";

export const metadata: Metadata = {
  title: "Trending | Ark Market",
  description: "Trending | Ark Market",
};

export default async function DashboardPage() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <Suspense
        fallback={
          <div className="flex flex-col space-y-4">
            <div className="h-4 w-1/4 animate-pulse rounded bg-gray-400"></div>
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-400"></div>
            <div className="h-4 w-1/4 animate-pulse rounded bg-gray-400"></div>
          </div>
        }
      >
        <Trending />
      </Suspense>
    </div>
  );
}
