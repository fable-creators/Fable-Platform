import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h2 className="text-4xl font-bold mb-4 text-coffee dark:text-sky">
        404 - Not Found
      </h2>
      <p className="mb-4 text-grape dark:text-sand">
        Could not find the requested resource
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Return Home
      </Link>
    </div>
  );
}
