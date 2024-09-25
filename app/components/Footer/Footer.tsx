"use client";

import { FC } from "react";
import { SectionDivider } from "../Body/SectionDivider";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: FC<ThemeToggleProps> = ({ isDark, onToggle }) => (
  <div className="flex items-center">
    <span className="mr-2 text-xs sm:text-sm md:text-base text-coffee dark:text-sky">
      Light
    </span>
    <div
      className={`w-10 h-5 sm:w-12 sm:h-6 md:w-14 md:h-7 flex items-center rounded-full p-1 cursor-pointer ${
        isDark ? "bg-grape" : "bg-sand"
      }`}
      onClick={onToggle}
    >
      <div
        className={`bg-sky dark:bg-midnight w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
          isDark
            ? "translate-x-5 sm:translate-x-6 md:translate-x-7"
            : "translate-x-0"
        }`}
      ></div>
    </div>
    <span className="ml-2 text-xs sm:text-sm md:text-base text-coffee dark:text-sky">
      Dark
    </span>
  </div>
);

const Footer: FC = () => {
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => setTheme(isDarkTheme ? "light" : "dark");

  return (
    <footer className="text-coffee dark:text-sky py-8 relative">
      <div className="container mx-auto px-4">
        <SectionDivider />
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-midnight dark:text-sky">
              Fable
            </h3>
            <p className="text-sm text-sky dark:text-sky">
              &quot;The best NFT marketplace website in the world and feel your
              experience in selling or buying our work&quot;
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-midnight dark:text-sky">
              Our Best
            </h3>
            <ul className="text-sm text-sky dark:text-sky">
              <li className="mb-2">Outpost</li>
              <li className="mb-2">Forest Bear</li>
              <li className="mb-2">Bera Bee Catcher</li>
              <li className="mb-2">Gem Hunters</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-midnight dark:text-sky">
              Check This
            </h3>
            <ul className="text-sm text-sky dark:text-sky">
              <li className="mb-2">Games</li>
              <li className="mb-2">Library</li>
              <li className="mb-2">Marketplace</li>
              <li className="mb-2">GAP</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-midnight dark:text-sky">
              Contact Us
            </h3>
            <ul className="text-sm text-sky dark:text-sky">
              <li className="mb-2">Go FAQ</li>
              <li className="mb-2">Gitbook</li>
              <li className="mb-2">X Page</li>
              <li className="mb-2">Discord</li>
              <li className="mb-2">Email</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 transform scale-90 sm:scale-100 md:scale-110 origin-bottom-right">
        <ThemeToggle isDark={isDarkTheme} onToggle={toggleTheme} />
      </div>
    </footer>
  );
};

export default Footer;
