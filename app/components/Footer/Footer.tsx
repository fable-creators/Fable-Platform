"use client";

import { FC } from "react";
import Link from "next/link";
import { SectionDivider } from "../Body/SectionDivider";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: FC<ThemeToggleProps> = ({ isDark, onToggle }) => (
  <div className="flex items-center">
    <span className="mr-2 text-[10px] sm:text-xs md:text-sm text-coffee dark:text-sky">
      Light
    </span>
    <div
      className={`w-8 h-4 sm:w-10 sm:h-5 md:w-12 md:h-6 flex items-center rounded-full p-1 cursor-pointer ${
        isDark ? "bg-grape" : "bg-sand"
      }`}
      onClick={onToggle}
    >
      <div
        className={`bg-sky dark:bg-midnight w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
          isDark
            ? "translate-x-4 sm:translate-x-5 md:translate-x-6"
            : "translate-x-0"
        }`}
      ></div>
    </div>
    <span className="ml-2 text-[10px] sm:text-xs md:text-sm text-coffee dark:text-sky">
      Dark
    </span>
  </div>
);

const Footer: FC = () => {
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => setTheme(isDarkTheme ? "light" : "dark");

  return (
    <footer className="w-full text-coffee dark:text-sky py-4 sm:py-6 md:py-8 relative">
      <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <SectionDivider />
        <div className="flex flex-wrap justify-between mt-4 sm:mt-6 md:mt-8">
          <div className="w-1/2 sm:w-1/4 mb-4 sm:mb-0 pr-2 sm:pr-4">
            <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 md:mb-4 text-midnight dark:text-sky">
              Fable
            </h3>
            <p className="text-[10px] sm:text-xs md:text-sm text-sky dark:text-sky">
              &quot;The best NFT marketplace website in the world and feel your
              experience in selling or buying our work&quot;
            </p>
          </div>
          <div className="w-1/2 sm:w-1/4 mb-4 sm:mb-0 pl-2 sm:pl-4">
            <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 md:mb-4 text-midnight dark:text-sky">
              Our Best
            </h3>
            <ul className="text-[10px] sm:text-xs md:text-sm text-sky dark:text-sky">
              <li className="mb-1 sm:mb-2">Outpost</li>
              <li className="mb-1 sm:mb-2">Forest Bear</li>
              <li className="mb-1 sm:mb-2">Bera Bee Catcher</li>
              <li className="mb-1 sm:mb-2">Gem Hunters</li>
            </ul>
          </div>
          <div className="w-1/2 sm:w-1/4 pl-2 sm:pl-4">
            <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 md:mb-4 text-midnight dark:text-sky">
              Check This
            </h3>
            <ul className="text-[10px] sm:text-xs md:text-sm text-sky dark:text-sky">
              <li className="mb-1 sm:mb-2">
                <Link
                  href="/games"
                  className="hover:text-grape dark:hover:text-sand transition-colors"
                >
                  Games
                </Link>
              </li>
              <li className="mb-1 sm:mb-2">
                <Link
                  href="/library"
                  className="hover:text-grape dark:hover:text-sand transition-colors"
                >
                  Library
                </Link>
              </li>
              <li className="mb-1 sm:mb-2">
                <Link
                  href="/marketplace"
                  className="hover:text-grape dark:hover:text-sand transition-colors"
                >
                  Marketplace
                </Link>
              </li>
              <li className="mb-1 sm:mb-2">GAP</li>
            </ul>
          </div>
          <div className="w-1/2 sm:w-1/4 pr-2 sm:pr-4">
            <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 md:mb-4 text-midnight dark:text-sky">
              Contact Us
            </h3>
            <ul className="text-[10px] sm:text-xs md:text-sm text-sky dark:text-sky">
              <li className="mb-1 sm:mb-2">Go FAQ</li>
              <Link
                href="https://fable-platform.gitbook.io/fable-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-grape dark:hover:text-sand transition-colors"
              >
                <li className="mb-1 sm:mb-2">Gitbook</li>
              </Link>
              <li className="mb-1 sm:mb-2">
                <Link
                  href="https://x.com/Fable_Platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-grape dark:hover:text-sand transition-colors"
                >
                  X Page
                </Link>
              </li>
              <li className="mb-1 sm:mb-2">
                <Link
                  href="https://discord.gg/fablehub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-grape dark:hover:text-sand transition-colors"
                >
                  Discord
                </Link>
              </li>
              <li className="mb-1 sm:mb-2">Email</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4 sm:mt-6 md:mt-8 flex justify-end px-2 sm:px-4 md:px-6 lg:px-8">
        <ThemeToggle isDark={isDarkTheme} onToggle={toggleTheme} />
      </div>
    </footer>
  );
};

export default Footer;
