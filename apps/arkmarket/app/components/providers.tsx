"use client";

import { ArkKitProvider } from "@ark-project/ark-modal";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "@/components/theme-provider";

import { ArkProvider } from "./ark-provider";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ArkProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ArkKitProvider> {children}</ArkKitProvider>
        </ThemeProvider>
      </ArkProvider>
    </QueryClientProvider>
  );
};

export { Providers };
