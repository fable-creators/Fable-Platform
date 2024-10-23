"use client";

import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { SearchBar } from "./SearchBar";
import { SocialIcons } from "./SocialIcons";
import { navbarStyles } from "./styles/navbar-styles";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  isVisible: boolean;
}

export default function Navbar({ isVisible }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isTrayIconVisible, setIsTrayIconVisible] = useState(true);
  const navbarRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
    if (!isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const toggleTray = useCallback(() => {
    setIsTrayOpen((prev) => !prev);
    if (!isTrayOpen) {
      setIsTrayIconVisible(false);
    } else {
      setTimeout(() => setIsTrayIconVisible(true), 300); // Delay to match the tray's transition duration
    }
  }, [isTrayOpen]);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 1280;
      setIsMobile(isMobileView);
      const logoElement = document.querySelector(
        ".nav-fable-logo",
      ) as HTMLElement;
      if (logoElement) {
        if (isMobileView) {
          logoElement.style.width = "52px";
          logoElement.style.height = "52px";
          logoElement.classList.remove("logo-desktop");
          logoElement.classList.add("logo-mobile");
        } else {
          logoElement.style.width = "105px";
          logoElement.style.height = "128px";
          logoElement.classList.remove("logo-mobile");
          logoElement.classList.add("logo-desktop");
        }
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <>
      <style jsx global>
        {navbarStyles}
      </style>
      <header
        ref={navbarRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="text-coffee dark:text-sky flex justify-between items-center w-full px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-4 lg:py-6">
          <Link
            href="/"
            className="logo flex items-center hover:opacity-80 transition-opacity"
          >
            <div className="logo-animation">
              <div
                className="nav-fable-logo"
                style={{
                  width: isMobile ? "52px" : "105px",
                  height: isMobile ? "52px" : "128px",
                }}
              />
            </div>
          </Link>

          <div className="hidden xl:flex items-center justify-center flex-1 px-4">
            <DesktopNav />
          </div>

          <div className="hidden xl:flex items-center">
            {isTrayIconVisible && (
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTray}
                aria-label="Toggle tray"
                className="mr-2 bg-plum hover:bg-plum/90 text-white transition-opacity duration-300"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            )}
          </div>

          <MobileNav
            isMenuOpen={isMenuOpen}
            isSearchOpen={isSearchOpen}
            toggleMenu={toggleMenu}
            toggleSearch={toggleSearch}
          />
        </div>
      </header>

      {/* Desktop Sliding Tray */}
      <div
        className={`fixed top-0 right-0 h-screen bg-background shadow-lg transform transition-transform duration-300 ease-in-out z-[60] ${
          isTrayOpen ? "translate-x-0" : "translate-x-full"
        } hidden xl:flex flex-col`}
        style={{ width: "300px" }}
      >
        <div className="p-6 flex flex-col items-start">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTray}
            aria-label="Close tray"
            className="self-end mb-6"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="w-full space-y-6 mt-4">
            <div className="w3m-button-container w-full">
              <w3m-button />
            </div>

            <div className="w-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSearch}
                aria-label="Toggle search"
                className="w-full justify-start"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
              {isSearchOpen && (
                <Input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search..."
                  className="mt-2 w-full"
                />
              )}
            </div>

            <div className="w-full flex justify-center">
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div
        className={`fixed top-16 left-0 right-0 bg-sand/80 dark:bg-grape/80 p-4 transform ${
          isSearchOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 ease-in-out xl:hidden z-40 ${
          isSearchOpen ? "block" : "hidden"
        }`}
      >
        <SearchBar />
      </div>
    </>
  );
}
