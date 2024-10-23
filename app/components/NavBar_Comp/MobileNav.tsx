import Link from "next/link";
import Image from "next/image";
import { SocialIcons } from "./SocialIcons";

interface MobileNavProps {
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  toggleMenu: () => void;
  toggleSearch: () => void;
}

export function MobileNav({
  isMenuOpen,
  isSearchOpen,
  toggleMenu,
  toggleSearch,
}: MobileNavProps) {
  return (
    <div className="xl:hidden">
      <div className="flex items-center space-x-2">
        {/* Search Icon */}
        <button
          className="text-white p-2"
          onClick={toggleSearch}
          aria-label="Toggle search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        {/* Menu Icon */}
        <button
          className="text-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Image
            src="/NavItems/Hamburger_icon.svg"
            alt="Menu"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-30 w-1/2 bg-plum transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4">
          <Link
            href="/"
            className="logo flex items-center hover:opacity-80 transition-opacity"
            onClick={toggleMenu}
          >
            <div className="logo-animation">
              <div
                className="nav-fable-logo"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            </div>
          </Link>

          {/* Close Menu Icon */}
          <button
            className="text-white"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="mt-8">
          <ul className="flex flex-col space-y-4 px-4">
            <li>
              <Link
                href="/"
                className="text-white hover:text-sky transition-colors duration-300 text-lg"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/games"
                className="text-white hover:text-sky transition-colors duration-300 text-lg"
                onClick={toggleMenu}
              >
                Games
              </Link>
            </li>
            <li>
              <Link
                href="/marketplace"
                className="text-white hover:text-sky transition-colors duration-300 text-lg"
                onClick={toggleMenu}
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link
                href="/library"
                className="text-white hover:text-sky transition-colors duration-300 text-lg"
                onClick={toggleMenu}
              >
                Library
              </Link>
            </li>
            <li className="mt-4">
              <w3m-button />
            </li>
            <li className="mt-4">
              <div className="flex space-x-4 px-6">
                <SocialIcons />
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
