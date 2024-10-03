"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Web3ModalProvider from "./components/NavBar_Comp/Web3ModalProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/NavBar_Comp/Navbar";
import Footer from "./components/Footer/Footer";
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
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Web3ModalProvider>
            <Navbar isVisible={isNavbarVisible} />
            <main className="flex-grow w-full">{children}</main>
            <Footer />
          </Web3ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
