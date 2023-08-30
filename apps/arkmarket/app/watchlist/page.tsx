import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watchlist | Ark Market",
  description: "Watchlist | Ark Market"
};

export default async function DashboardPage() {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Watchlist</h2>
        <p className="text-muted-foreground">
          Performance of NFT collections you are following.
        </p>
      </div>
    </div>
  );
}
