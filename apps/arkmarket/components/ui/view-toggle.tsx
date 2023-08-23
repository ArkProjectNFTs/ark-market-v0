"use client";

import * as React from "react";

import { GridIcon, ListBulletIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface ViewToggleProps {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {view === "grid" ? (
            <GridIcon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <ListBulletIcon className="absolute h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle view</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setView("list")}>
          List
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setView("grid")}>
          Grid
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
