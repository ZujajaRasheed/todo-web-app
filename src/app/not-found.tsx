"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      {/* Big error number */}
      <h1 className="text-9xl font-bold text-red-500">404</h1>

      {/* Message */}
      <p className="mt-4 text-2xl font-semibold">Page Not Found</p>
      <p className="mt-2 text-gray-400 text-center max-w-md">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-lg font-medium transition duration-300 ease-in-out"
      >
        Go Back Home
      </Link>

      {/* Optional animation */}
      <div className="mt-10 animate-bounce text-gray-500 text-sm">
        <span>¯\_(ツ)_/¯</span>
      </div>
    </div>
  );
}
