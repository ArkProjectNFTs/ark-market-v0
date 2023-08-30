"use client";

import React from "react";

import { useCopyToClipboard } from "@/hooks";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

interface ButtonCopyProps {
  copyContent: string;
  children: React.ReactNode;
}

const ButtonCopy: React.FC<ButtonCopyProps> = ({ copyContent, children }) => {
  const [value, copy] = useCopyToClipboard();
  return (
    <Button onClick={() => copy(copyContent)} variant="ghost" size="iconSmall">
      {value ? (
        <CheckIcon className="h-[0.8rem] w-[0.8rem] transition-all" />
      ) : (
        <CopyIcon className="h-[0.8rem] w-[0.8rem] transition-all" />
      )}
      <span className="sr-only">{children}</span>
    </Button>
  );
};

export default ButtonCopy;
