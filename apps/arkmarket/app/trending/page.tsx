import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";

import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { taskSchema } from "./data/schema";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components."
};

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/trending/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function DashboardPage() {
  const tasks = await getTasks();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
