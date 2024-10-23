import Link from "next/link";
import { useState } from "react";

export function DesktopNav() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/games", label: "Games" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/library", label: "Library" },
  ];

  return (
    <nav className="flex items-center justify-center w-full max-w-5xl mx-auto">
      {navItems.map((item) => (
        <div key={item.label} className="relative px-6">
          <Link
            href={item.href}
            className="px-4 py-4 text-2xl font-medium text-coffee dark:text-sky hover:text-plum dark:hover:text-sand transition-colors"
            onMouseEnter={() => setHoveredItem(item.label)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item.label}
          </Link>
          {hoveredItem === item.label && (
            <>
              <div
                className="jewel absolute top-1/2 -translate-y-1/2 left-0 w-6 h-6"
                aria-hidden="true"
              />
              <div
                className="jewel absolute top-1/2 -translate-y-1/2 right-0 w-6 h-6"
                aria-hidden="true"
              />
            </>
          )}
        </div>
      ))}
    </nav>
  );
}
