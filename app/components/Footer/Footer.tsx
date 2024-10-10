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
  <label
    className="switch"
    style={{
      fontSize: "12px",
      position: "relative",
      display: "inline-block",
      width: "3em",
      height: "1.5em",
    }}
  >
    <input
      type="checkbox"
      checked={isDark}
      onChange={onToggle}
      style={{
        opacity: 0,
        width: 0,
        height: 0,
      }}
    />
    <span
      className="slider"
      style={{
        position: "absolute",
        cursor: "pointer",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isDark ? "#522ba7" : "#28096b",
        transition: ".5s",
        borderRadius: "30px",
      }}
    >
      <span
        style={{
          position: "absolute",
          content: '""',
          height: "1.2em",
          width: "1.2em",
          borderRadius: "50%",
          left: isDark ? "8%" : "calc(100% - 1.4em)",
          bottom: "8%",
          boxShadow: isDark
            ? "inset -6px -2px 0px 0px #fff000"
            : "inset 12px -3px 0px 12px #fff000",
          backgroundColor: isDark ? "#522ba7" : "#28096b",
          transition: ".5s",
        }}
      ></span>
    </span>
  </label>
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
      <div className="mt-4 sm:mt-6 md:mt-8 flex justify-end items-center px-2 sm:px-4 md:px-6 lg:px-8">
        <span className="mr-2 text-[10px] sm:text-xs md:text-sm text-midnight dark:text-sky">
          Dark
        </span>
        <ThemeToggle isDark={isDarkTheme} onToggle={toggleTheme} />
        <span className="ml-2 text-[10px] sm:text-xs md:text-sm text-midnight dark:text-sky">
          Light
        </span>
      </div>
    </footer>
  );
};

export default Footer;
