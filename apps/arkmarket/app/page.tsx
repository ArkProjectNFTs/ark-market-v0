import { Suspense } from "react";
import Image from "next/image";

import CreateAccount from "./components/create-account";
import MintButton from "./components/mint-button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between space-y-8 p-24">
      <div className="before:bg-gradient-radial after:bg-gradient-conic relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/arkmarket.svg"
          alt="arkmarket Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <CreateAccount />

      {/* <MintButton /> */}
    </main>
  );
}
