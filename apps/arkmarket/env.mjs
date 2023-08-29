// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    IPFS_PROVIDER: z.string().url()
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_IPFS_PROVIDER: z.string().url(),
    NEXT_PUBLIC_RPC_ENDPOINT: z.string().url(),
    NEXT_PUBLIC_ADMIN_ADDRESS: z.string(),
    NEXT_PUBLIC_ADMIN_PRIVATE_KEY: z.string(),
    NEXT_PUBLIC_ACCOUNT_CLASS_HASH: z.string()
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    IPFS_PROVIDER: process.env.IPFS_PROVIDER,
    NEXT_PUBLIC_IPFS_PROVIDER: process.env.NEXT_PUBLIC_IPFS_PROVIDER,
    NEXT_PUBLIC_RPC_ENDPOINT: process.env.NEXT_PUBLIC_RPC_ENDPOINT,
    NEXT_PUBLIC_ADMIN_ADDRESS: process.env.NEXT_PUBLIC_ADMIN_ADDRESS,
    NEXT_PUBLIC_ADMIN_PRIVATE_KEY: process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY,
    NEXT_PUBLIC_ACCOUNT_CLASS_HASH: process.env.NEXT_PUBLIC_ACCOUNT_CLASS_HASH
  }
});
