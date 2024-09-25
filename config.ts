import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { mainnet, arbitrum, polygon } from "viem/chains";

// 1. Get projectId at https://cloud.walletconnect.com
export const projectId = "3b3f7c6bff40079cf6eee02f65a992e3";

// 2. Create wagmiConfig
const metadata = {
  name: "Fable Platform",
  description: "Fable Platform Web3 Integration",
  url: "https://fableplatform.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, polygon, arbitrum] as const;

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId });
