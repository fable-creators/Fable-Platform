import Link from "next/link";

export function DesktopNav() {
  return (
    <nav className="hidden xl:flex items-center space-x-6">
      <Link href="/" className="text-coffee dark:text-sky hover:text-plum dark:hover:text-sand transition-colors">
        Home
      </Link>
      <Link href="/games" className="text-coffee dark:text-sky hover:text-plum dark:hover:text-sand transition-colors">
        Games
      </Link>
      <Link href="/marketplace" className="text-coffee dark:text-sky hover:text-plum dark:hover:text-sand transition-colors">
        Marketplace
      </Link>
      <Link href="/library" className="text-coffee dark:text-sky hover:text-plum dark:hover:text-sand transition-colors">
        Library
      </Link>
    </nav>
  );
}