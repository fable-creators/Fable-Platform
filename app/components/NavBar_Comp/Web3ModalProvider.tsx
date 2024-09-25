"use client";

import { WagmiConfig } from "wagmi";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "../../../config";

// Create a client
const queryClient = new QueryClient();

interface Web3ModalProviderProps {
  children: React.ReactNode;
}

export default function Web3ModalProvider({
  children,
}: Web3ModalProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {mounted && children}
      </QueryClientProvider>
    </WagmiConfig>
  );
}