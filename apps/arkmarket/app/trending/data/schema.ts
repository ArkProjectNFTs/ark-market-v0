import { z } from "zod";

export const collectionSchema = z.object({
  address: z.string(),
  type: z.string(),
  symbol: z.string(),
  name: z.string(),
  latest_mint: z.string(),
  supply: z.number()
});

export type Collection = z.infer<typeof collectionSchema>;
