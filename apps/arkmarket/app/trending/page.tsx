import { Metadata } from "next";

import CollectionsList from "./components/collection-list";

export const metadata: Metadata = {
  title: "Trending | Ark Market",
  description: "Trending | Ark Market"
};

export default async function DashboardPage() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <CollectionsList />
    </div>
  );
}
