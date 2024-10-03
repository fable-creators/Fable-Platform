"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { SearchBar } from "./SearchBar";
import { SocialIcons } from "./SocialIcons";
import { navbarStyles } from "./styles/navbar-styles";

interface NavbarProps {
  isVisible: boolean;
}

export default function Navbar({ isVisible }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280);
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
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="bg-sand/80 dark:bg-grape/80 text-coffee dark:text-sky p-2 rounded-full flex justify-between items-center w-full max-w-7xl">
          <Link
            href="/"
            className="logo flex items-center hover:opacity-80 transition-opacity"
          >
            <div className="logo-container">
              <div className="logo-animation">
                <div className="logo-glow"></div>
                <Image
                  src="/NavItems/Logo.png"
                  alt="Fable Logo"
                  width={42}
                  height={42}
                />
              </div>
            </div>
          </Link>

          <DesktopNav />

          <div className="hidden xl:flex items-center space-x-4">
            <div className="w3m-button-container">
              <w3m-button />
            </div>
            {!isMobile && <SearchBar />}
            <SocialIcons />
          </div>

          <MobileNav
            isMenuOpen={isMenuOpen}
            isSearchOpen={isSearchOpen}
            toggleMenu={toggleMenu}
            toggleSearch={toggleSearch}
          />
        </div>
      </header>

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
