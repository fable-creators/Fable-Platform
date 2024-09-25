"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Web3ModalProvider from "./components/NavBar_Comp/Web3ModalProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/NavBar_Comp/Navbar";
import { useState, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const navbarRef = useRef<HTMLDivElement>(null);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Web3ModalProvider>
            <main className="flex flex-col min-h-screen">
              <Navbar isVisible={isNavbarVisible} />
              {children}
            </main>
          </Web3ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
