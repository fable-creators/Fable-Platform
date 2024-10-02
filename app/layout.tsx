"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Web3ModalProvider from "./components/NavBar_Comp/Web3ModalProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Web3ModalProvider>
            <div className="container mx-auto px-4 py-8"/>
          </Web3ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
