"use client";

import { ArkKitProvider } from "@ark-project/ark-modal";

import { ThemeProvider } from "@/components/theme-provider";

import { ArkProvider } from "./ark-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ArkProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ArkKitProvider> {children}</ArkKitProvider>
      </ThemeProvider>
    </ArkProvider>
  );
};

export { Providers };
