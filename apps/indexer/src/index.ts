import { Prisma, PrismaClient } from "database";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const allListing = await prisma.listing.findMany();
  res.json(allListing);
});

app.listen(3001, () =>
  console.log(`🚀 Server ready at: http://localhost:3001`)
);
