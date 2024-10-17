"use client";

import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Web3ModalProvider from "./components/NavBar_Comp/Web3ModalProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/NavBar_Comp/Navbar";
import Footer from "./components/Footer/Footer";
import { useState, Suspense } from "react";
import Loading from "./components/loading";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const customFont = localFont({
  src: [
    {
      path: "../public/font/cinzel-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-custom",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${customFont.variable} ${inter.variable}`}
    >
      <body
        className={`${customFont.className} ${inter.className} min-h-screen flex flex-col font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Web3ModalProvider>
            <div className="flex flex-col min-h-screen relative">
              <Navbar isVisible={isNavbarVisible} />
              <main className="flex-grow w-full">
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </main>
              <Footer />
            </div>
          </Web3ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
