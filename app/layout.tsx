"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Web3ModalProvider from "./components/NavBar_Comp/Web3ModalProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import DraggableWidget from "./components/RadialMenuWidget/DraggableWidget";
import Navbar from "./components/NavBar_Comp/Navbar";
import { useState, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [widgetPosition, setWidgetPosition] = useState({ x: 20, y: 20 });
  const navbarRef = useRef<HTMLDivElement>(null);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Web3ModalProvider>
            <main className="flex flex-col min-h-screen">
              <Navbar
                isVisible={isNavbarVisible}
                setIsVisible={setIsNavbarVisible}
                navbarRef={navbarRef}
                widgetPosition={widgetPosition}
              />
              {children}
              <DraggableWidget
                isVisible={!isNavbarVisible}
                position={widgetPosition}
                setPosition={setWidgetPosition}
              />
            </main>
          </Web3ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}